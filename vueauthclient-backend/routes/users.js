import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
import { configuredPassport } from "../index.js";
import users from "../assets/user.json";
const router = Router();
router.post("/api/login", (req, res, next) => {
  configuredPassport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log({ err });
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }
    req.logIn(user, (err) => {
      res.send(user);
    });
  })(req, res, next);
});

router.get("/api/logout", (req, res) => {
  req.logOut();

  return res.send();
});
router.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find((user) => {
    return user.id === req.session.passport.user;
  });

  res.send(user);
});
router.get("/api/users", async (req, res) => {
  const users = await getAllUsers();

  res.send(users);
});
export default router;
