import express from "express";
import { Client } from "cassandra-driver";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import users from "./assets/user.json";
import router from "./routes/index.js";
import multer from "multer";
import path from "path";
export const cassandraClient = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-task.zip",
  },
  // put this in the .env
  credentials: {
    username: "token",
    password:
      "AstraCS:iMOrZYWDORrDbOiduSCeNCZr:6008be42ad9c91e5e5fc60f84173bd0e60b284009e344dcffc1334274a1b7dab",
  },
});
const app = express();

const publicRoot = "../vueauthclient/static";
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "mysession",
    keys: ["vueauthrandomkey"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(publicRoot));
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password;
      });

      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect username or password" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id;
  });
  done(null, user);
});

app.use(router);

export const configuredPassport = passport;
app.listen(3000, () => {
  console.log("App running on port  3000");
});

app.get("/", (req, res, next) => {
  res.send("hello");
});
