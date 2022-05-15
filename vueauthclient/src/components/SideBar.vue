<template>
  <aside class="sidebar">
    <nav class="nav">
      <ul>
        <li v-if="user.role === 'doctor'" class="active">
          <router-link :to="{ name: 'DoctorAppointments' }"
            >My Appointments
          </router-link>
        </li>
        <li v-if="user.role === 'client'" class="active">
          <router-link :to="{ name: 'ClientAppointments' }"
            >My Appointments
          </router-link>
        </li>

        <li v-if="user.role === 'admin'" class="active">
          <router-link :to="{ name: 'AdminAppointments' }"
            >Appointments Requests</router-link
          >
        </li>
        <li v-if="user.role === 'admin'" class="active">
          <router-link :to="{ name: 'AdminUpdatedAppointments' }"
            >Update Requests</router-link
          >
        </li>
        <li v-if="!user.role">
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li><a href="#" v-on:click="logout">Logout</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Sidebar",
  data() {
    return {
      user: {}
    };
  },

  methods: {
    getUserData: function() {
      let self = this;
      axios
        .get("/api/user")
        .then(res => {
          self.$set(this, "user", res.data);
        })
        .catch(err => {
          console.log(err);
          router.push("/");
        });
    },
    logout: e => {
      axios.get("/api/logout").then(() => {
        router.push("/");
        window.location.reload();
      });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: linear-gradient(90deg, #c7c5f4, #776bcc);
}
.sidebar {
  position: fixed;
  width: 25%;
  height: 100vh;
  background: #312450;
  font-size: 0.65em;
}
.nav {
  position: relative;
  margin: 0 15%;
  text-align: right;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
}
.nav ul {
  list-style: none;
}
.nav ul li {
  position: relative;
  margin: 3.2em 0;
}
.nav ul li a {
  line-height: 5em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.35);
  display: block;
  transition: all ease-out 300ms;
}
.nav ul li.active a {
  color: white;
}
.nav ul li:not(.active)::after {
  opacity: 0.2;
}
.nav ul li:not(.active):hover a {
  color: rgba(255, 255, 255, 0.75);
}
.nav ul li::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0.2em;
  background: black;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(to right, #5e42a6, #b74e91);
}
</style>
