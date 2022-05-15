<template>
  <div class="page-container">
    <h2>My appointments</h2>
    <div class="cards-container">
      <span v-for="appointment in appointments">
        <AppointmentCard :key="appointment.id" :appointment="appointment"/>
        <div
          v-if="appointment.isvalid || appointment.declinemessage"
          class="icon-button"
        >
          <img
            v-on:click="initialiseUpdate(appointment)"
            src="../assets/edit.png"
          /></div
      ></span>
    </div>
    <button class="add_button " id="show-modal" v-on:click="showModal = true">
      Add appointment
    </button>
    <transition v-if="showModal" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="container">
              <form v-on:submit="submitAppointment">
                <div class="row">
                  <h4>Add Appointment</h4>
                  <div class="input-group  label-input">
                    <span class="label-title"> Name</span>
                    <input
                      type="text"
                      :placeholder="selectedAppointment.name || 'Full Name'"
                      name="name"
                    />
                  </div>
                  <div class=" label-input">
                    <span class="label-title"> Date</span>
                    <input
                      type="date"
                      name="date"
                      class="minified-width"
                      :value="dateFormatter(selectedAppointment.date)"
                    />
                  </div>
                  <div class=" label-input">
                    <span class="label-title"> Notes</span>
                    <textarea
                      type="text"
                      :placeholder="selectedAppointment.notes || 'Notes'"
                      name="notes"
                      class="text-area minified-width"
                    />
                  </div>
                  <div class="label-input">
                    <span class="label-title">File</span>
                    <input
                      type="file"
                      placeholder="Notes"
                      name="image"
                      class="minified-width"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  v-on:click="showModal = false"
                  class="modal-submit-button"
                >
                  Submit
                </button>
                <button
                  class="modal-default-button"
                  v-on:click="showModal = false"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import AppointmentCard from "./AppointmentCard.vue";
import { getFormData } from "../helpers/getFormData.js";
export default {
  name: "ClientAppointments",
  components: { AppointmentCard },
  data() {
    return {
      appointments: [],
      showModal: false,
      isUpdate: false,
      selectedAppointment: {}
    };
  },
  methods: {
    dateFormatter: function(dateInput) {
      const date = new Date(dateInput) || new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      console.log(year + "-" + month + "-" + day);
      return year + "-" + month + "-" + day;
    },
    submitAppointmentUpdate: async function(e) {
      const formData = new FormData();
      const data = {
        ...this.selectedAppointment,
        name: e.target.elements.name.value,
        date: e.target.elements.date.value,
        notes: e.target.elements.notes.value,
        image: e.target.elements.image.files[0]
      };
      getFormData(formData, data);

      try {
        await axios({
          url: "/api/appointment",
          method: "PATCH",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    },
    initialiseUpdate: function(selectedAppointment) {
      this.showModal = true;
      this.isUpdate = true;
      this.selectedAppointment = selectedAppointment;
    },
    submitAppointment: async function(e) {
      e.preventDefault();
      if (this.isUpdate) {
        this.isUpdate = false;
        console.log("updateeee");
        return this.submitAppointmentUpdate(e);
      }
      const formData = new FormData();
      const data = {
        name: e.target.elements.name.value,
        date: e.target.elements.date.value,
        notes: e.target.elements.notes.value,
        image: e.target.elements.image.files[0]
      };
      this.appointments.push(formData);
      getFormData(formData, data);

      try {
        await axios({
          url: "/api/appointment",
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        });
      } catch (err) {
        console.error(err);
      }
      window.location.reload();
    },
    getAppointments: function() {
      let self = this;
      axios
        .get("/api/appointments")
        .then(res => {
          self.$set(this, "appointments", res.data);
        })
        .catch(err => {
          console.log(err);
          router.push("/");
        });
    }
  },
  mounted() {
    this.getAppointments();
  }
};
Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
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
.icon-button {
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 50%;
  margin-left: 7rem;
}
button {
  border: none;
  background: #f44336;
  color: #fff;
  padding: 10px;
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
.add_button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(
    rgba(179, 132, 201, 0.84),
    rgba(57, 31, 91, 0.84) 50%
  );
  border-radius: 42px;
  border-width: 0;
  box-shadow: rgba(57, 31, 91, 0.24) 0 2px 2px,
    rgba(179, 132, 201, 0.4) 0 8px 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: Quicksand, sans-serif;
  font-size: 18px;
  font-weight: 700;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin: 0;
  padding: 18px 18px;
  text-align: center;
  text-decoration: none;
  text-shadow: rgba(255, 255, 255, 0.4) 0 0 4px,
    rgba(255, 255, 255, 0.2) 0 0 12px, rgba(57, 31, 91, 0.6) 1px 1px 4px,
    rgba(57, 31, 91, 0.32) 4px 4px 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  z-index: 10;
}

.add_button:hover {
  background-image: linear-gradient(#b384c9, #391f5b 50%);
}

@media (min-width: 768px) {
  .add_button {
    font-size: 21px;
    padding: 18px 34px;
  }
} /* 64ac15 */
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  padding: 1em;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #b9b9b9;
  background-color: #e3e3e3;
}
h4 {
  color: #3c1361;
}
input,
input[type="radio"] + label,
input[type="checkbox"] + label:before,
select option,
select {
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
input:focus {
  outline: 0;
  border-color: #bd8200;
}
input:focus + .input-icon i {
  color: #3c1361;
}
input:focus + .input-icon:after {
  border-right-color: #3c1361;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + label,
select {
  width: 50%;
  text-align: center;
  float: left;
  border-radius: 0;
}
input[type="radio"] + label:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
input[type="radio"] + label:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
input[type="radio"] + label i {
  padding-right: 0.4em;
}

input[type="radio"]:checked + label,
input:checked + label:before,
select:focus,
select:active {
  background-color: #3c1361;
  color: #fff;
  border-color: #bd8200;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  position: relative;
  display: block;
  padding-left: 1.6em;
}
input[type="checkbox"] + label:before {
  position: absolute;
  top: 0.2em;
  left: 0;
  display: block;
  width: 1em;
  height: 1em;
  padding: 0;
  content: "";
}
input[type="checkbox"] + label:after {
  position: absolute;
  top: 0.45em;
  left: 0.2em;
  font-size: 0.8em;
  color: #fff;
  opacity: 0;
  font-family: FontAwesome;
  content: "\f00c";
}
input:checked + label:after {
  opacity: 1;
}
select {
  height: 3.4em;
  line-height: 2;
}
select:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
select:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
select:focus,
select:active {
  outline: 0;
}
select option {
  background-color: #3c1361;
  color: #fff;
}
.text-area {
  width: 100%;
}
.input-group {
  margin-bottom: 1em;
  zoom: 1;
}
.input-group:before,
.input-group:after {
  content: "";
  display: table;
}
.input-group:after {
  clear: both;
}
.input-group-icon {
  position: relative;
}
.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.label-input {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}
.minified-width {
  width: 85%;
}
.label-title {
  margin: 0.5rem;
}
.container {
  max-width: 38em;
  padding: 1em 3em 2em 3em;
  margin: 0em auto;
  background-color: #c7b3df;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.row {
  zoom: 1;
}
.row:before,
.row:after {
  content: "";
  display: table;
}
.row:after {
  clear: both;
}
.col-half {
  padding-right: 10px;
  float: left;
  width: 50%;
}
.col-half:last-of-type {
  padding-right: 0;
}
.col-third {
  padding-right: 10px;
  float: left;
  width: 33.33333333%;
}
.col-third:last-of-type {
  padding-right: 0;
}
@media only screen and (max-width: 540px) {
  .col-half {
    width: 100%;
    padding-right: 0;
  }
}
</style>
