<template>
  <div class="page-container">
    <div class="container">
      <div class="compare-card">
        <div class="compare-card-header">
          <img
            :src="
              '../' +
                appointments[0].image
                  .split('\\')
                  .slice(2)
                  .join('/')
            "
            :alt="appointments[0].name"
          />
        </div>
        <div class="compare-card-body">
          <span class="tag tag-teal">Old appointment</span>
          <h4>Name : {{ appointments[0].name }}</h4>
          <h5>
            Date :
            {{ removeTimeFromDate(new Date(appointments[0].date)) }}
          </h5>
          <h5>Notes : {{ appointments[0].notes }}</h5>
        </div>
      </div>
      <div class="compare-card">
        <div class="compare-card-header">
          <img
            :src="
              '../' +
                appointments[1].image
                  .split('\\')
                  .slice(2)
                  .join('/')
            "
            :alt="appointments[1].name"
          />
        </div>
        <div class="compare-card-body">
          <span class="tag tag-pink">New appointment</span>
          <h4>Name : {{ appointments[1].name }}</h4>
          <h5>
            Date :
            {{ removeTimeFromDate(new Date(appointments[1].date)) }}
          </h5>
          <h5>Notes : {{ appointments[1].notes }}</h5>
        </div>
      </div>
      <div class="compare-card">
        <div
          v-if="appointments[1].image !== appointments[0].image"
          class="bg-image"
          style="display:flex; justify-content:center ; align-items:center;"
        >
          <section class="new-picture">
            New Picture
          </section>
          <img
            :src="
              '../' +
                appointments[1].image
                  .split('\\')
                  .slice(2)
                  .join('/')
            "
            :alt="appointments[1].name"
            class="overlay-image"
          />
        </div>
        <div v-else class="compare-card-header">
          <img
            :src="
              '../' +
                appointments[1].image
                  .split('\\')
                  .slice(2)
                  .join('/')
            "
            :alt="appointments[1].name"
          />
        </div>
        <div class="compare-card-body">
          <span class="tag tag-purple">Changes</span>
          <h4 v-if="appointments[1].name === appointments[0].name">
            <span> Name : {{ appointments[1].name }}</span>
          </h4>
          <h4 v-else>
            <span>
              Name :<span style="  text-decoration: line-through;color:red;">
                {{ appointments[0].name }}</span
              ></span
            >
            <span style="color :green;"> {{ appointments[1].name }}</span>
          </h4>
          <h5
            v-if="
              removeTimeFromDate(new Date(appointments[0].date)) ===
                removeTimeFromDate(new Date(appointments[1].date))
            "
          >
            <span>
              Date :
              {{ removeTimeFromDate(new Date(appointments[0].date)) }}</span
            >
          </h5>
          <h5 v-else>
            <span>
              Date :<span style="  text-decoration: line-through;color:red;">
                {{ removeTimeFromDate(new Date(appointments[0].date)) }}</span
              ></span
            >
            <span style="color :green;">
              {{ removeTimeFromDate(new Date(appointments[1].date)) }}</span
            >
          </h5>
          <h5 v-if="appointments[1].notes === appointments[0].notes">
            <span> Notes : {{ appointments[1].notes }}</span>
          </h5>
          <h5 v-else>
            <span>
              Notes :<span style="  text-decoration: line-through;color:red;">
                {{ appointments[0].notes }}</span
              ></span
            >
            <span style="color :green;"> {{ appointments[1].notes }}</span>
          </h5>
        </div>
      </div>
    </div>
    <transition v-if="showModal" name="modal">
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
      </div></transition
    >
    <div class="icon-button-container">
      <div v-on:click="acceptUpdate">
        <img class="icon-button" src="../assets/checked.png" />
      </div>
      <div v-on:click="showModal = true">
        <img
          class="icon-button"
          style="margin-left: 1rem;"
          src="../assets/x-button.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import removeTimeFromDate from "../helpers/removeTimeFromDate.js";
import router from "../router";
export default {
  name: "AdminAppointmentCompare",
  data() {
    return {
      id: this.$route.params.id,
      appointments: [],
      removeTimeFromDate: removeTimeFromDate,
      showModal: false
    };
  },
  methods: {
    getItemsToCompare: function() {
      let self = this;
      axios
        .get(`/api/admin/single-update/${this.id}`)
        .then(res => {
          self.$set(this, "appointments", res.data);
          console.log({ data: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    },
    acceptUpdate: function() {
      let self = this;
      axios
        .post(`/api/admin/validate-update/`, {
          oldAppointmentId: this.appointments[0].id,
          newAppointmentId: this.appointments[1].id
        })
        .then(res => {
          self.$set(this, "appointments", res.data);
          router.push("/update-appointments");
        })
        .catch(err => {
          console.log(err);
        });
      router.push("/admin-appointments");
    },
    rejectAppointment: function(e) {
      e.preventDefault();
      axios
        .post(`/api/admin/decline-update/`, {
          newAppointmentId: this.appointments[1].id,
          declineMessage: e.target.elements.declineMessage.value
        })
        .then(res => {
          router.push("/update-appointments");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getItemsToCompare();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  box-sizing: border-box;
}
.new-picture {
  position: absolute;
  text-align: center;
  color: black;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  font-weight: 900;
}
.icon-button-container {
  display: flex;
  margin-left: 4.5rem;
  justify-content: center;
}
.icon-button {
  width: 5rem;
  height: 5rem;
}
.page-container {
  width: 70%;
  float: right;
}
.bg-image {
  height: 350px;
  background: green;
  overflow: hidden;
}
.overlay-image {
  object-fit: cover;
  opacity: 0.5;
  width: 300px;
  height: 350px;
}
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.compare-card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
}
.compare-card-header img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.compare-card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 200px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.tag-teal {
  background-color: #47bcd4;
}
.tag-purple {
  background-color: #5e76bf;
}
.tag-pink {
  background-color: #cd5b9f;
}

.compare-card-body p {
  font-size: 13px;
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
