<template>
  <div class="page-container">
    <h2>Appointments Dashboard</h2>
    <h3 style="margin-top: 2rem;" v-if="!appointments.length">
      There is no new updated appointments, check again later
    </h3>
    <div class="cards-container">
      <span v-for="appointment in appointments">
        <AppointmentCard :appointment="appointment" />
        <div class="icon-button-container-search">
          <router-link
            :to="{
              name: 'AdminAppointmentCompare',
              params: { id: appointment.id }
            }"
          >
            <img class="icon-button-search" src="../assets/search.png"
          /></router-link>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import AppointmentCard from "./AppointmentCard";
export default {
  name: "AdminUpdatedAppointments",
  components: { AppointmentCard },
  data() {
    return {
      appointments: {}
    };
  },
  methods: {
    getUpdatedAppointments: function() {
      let self = this;
      axios
        .get("/api/admin/appointments-update")
        .then(res => {
          self.$set(this, "appointments", res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          router.push("/");
        });
    }
  },
  mounted() {
    this.getUpdatedAppointments();
  }
};
</script>
<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
}
.page-container {
  width: 70%;
  float: right;
}
.icon-button-container-search {
  margin-left: 7rem;
  background-color: #fff;
  border-radius: 50%;
  width: 20%;
}
.icon-button-search {
  width: 3rem;
  height: 3rem;
}
</style>
