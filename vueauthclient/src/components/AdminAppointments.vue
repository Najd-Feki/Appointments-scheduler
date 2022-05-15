<template>
  <div class="page-container">
    <h2>Appointments Dashboard</h2>
    <h3 style="margin-top: 2rem;" v-if="!appointments.length">
      There is no new appointments, check again later
    </h3>
    <div class="cards-container">
      <span v-for="appointment in appointments">
        <AppointmentCard :appointment="appointment" />
        <div v-if="showButtons" class="icon-button-container">
          <div v-on:click="acceptAppointment(appointment.id)">
            <img class="icon-button" src="../assets/checked.png" />
          </div>
          <div v-on:click="handleRejection(appointment.id)">
            <img
              class="icon-button"
              style="margin-left: 1rem;"
              src="../assets/x-button.png"
            />
          </div>
        </div>
      </span>
      <transition v-if="showModal.value" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <form v-on:submit="rejectAppointment">
                <div class="decline-message-wrapper">
                  <span> Decline message :</span>
                  <textarea
                    style="width: 15rem;"
                    name="declineMessage"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  v-on:click="showModal = { ...showModal, value: false }"
                  class="modal-submit-button"
                >
                  Submit
                </button>
                <button
                  class="modal-default-button"
                  v-on:click="showModal = { ...showModal, value: false }"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div></transition
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import AppointmentCard from "./AppointmentCard";
export default {
  name: "AdminAppointments",
  components: { AppointmentCard },
  data() {
    return {
      appointments: {},
      showButtons: true,
      showModal: { value: false, selectedId: "" }
    };
  },
  methods: {
    getUserData: function() {
      let self = this;
      axios
        .get("/api/admin/appointments")
        .then(res => {
          self.$set(this, "appointments", res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          router.push("/");
        });
    },
    acceptAppointment: function(id) {
      let self = this;
      axios
        .post("/api/admin/validate/", { id })
        .then(res => {
          self.$set(this, "showButtons", false);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRejection: function(id) {
      let self = this;
      console.log({ id });
      self.$set(this, "showModal", { value: true, selectedId: id });
    },
    rejectAppointment: function(e) {
      e.preventDefault();
      axios
        .post("/api/admin/decline/", {
          id: this.showModal.selectedId,
          declineMessage: e.target.elements.declineMessage.value
        })
        .then(res => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUserData();
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
.icon-button-container {
  display: flex;
  margin-left: 4.5rem;
}
.icon-button {
  width: 3rem;
  height: 3rem;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.4s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-default-button {
  float: right;
  margin-left: 10px;
  border-radius: 20px;
  pointer-events: auto;
}
.modal-submit-button {
  border-radius: 20px;
  float: right;
  margin-left: 10px;
  pointer-events: auto;
  background-color: #0fa03f;
}
.decline-message-wrapper {
  display: flex;
  align-items: center;
}
button {
  border: none;
  background: #f44336;
  color: #fff;
  padding: 10px;
}
.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  min-height: 35px;
  background-color: #c7b3df;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
