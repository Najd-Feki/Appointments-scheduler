<template>
  <div class="card">
    <img
      :src="
        '../' +
          this.appointment.image
            .split('\\')
            .slice(2)
            .join('/')
      "
      class="card__image"
      alt=""
    />
    <img
      v-if="appointment.iswaiting"
      src="../assets/clock.png"
      class="clock"
      alt=""
    />

    <div :class="getColor('card__overlay')">
      <div :class="getColor('card__header')">
        <svg :class="getColor('card__arc')" xmlns="http://www.w3.org/2000/svg">
          <path />
        </svg>
        <div class="card__header-text">
          <h3 class="card__title">{{ appointment.name }}</h3>

          <span class="card__status" style="color: black;">{{
            new Date(appointment.date).toLocaleDateString()
          }}</span>
        </div>
      </div>
      <p
        v-if="appointment.declinemessage"
        class="card__description"
        style="color: red;"
      >
        {{ appointment.declinemessage }}
      </p>
      <p v-else class="card__description" style="color: black;">
        {{ appointment.notes }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppointmentCard",
  props: ["appointment"],
  methods: {
    getColor: function(initialClass) {
      const appointment = this.$props.appointment;

      if (appointment.declinemessage) {
        console.log(initialClass + "__danger");
        return initialClass + "__danger";
      }
      if (appointment.isvalid) {
        console.log(initialClass + "__success");
        return initialClass + "__success";
      }
      return initialClass;
    }
  }
};
</script>
<style>
:root {
  --surface-color: #fff;
  --surface-color-danger: rgb(243, 147, 147);
  --surface-color-success: rgb(182, 243, 147);
  --curve: 40;
}

* {
  box-sizing: border-box;
}
.clock {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(121, 10, 53);
  border-radius: 50%;
}
.declined {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(121, 10, 53);
  border-radius: 50%;
  width: 30%;
  height: 15%;
}
.checked {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(121, 10, 53);
  border-radius: 50%;
  width: 15%;
  height: 15%;
}
body {
  font-family: "Noto Sans JP", sans-serif;
  background-color: #fef8f8;
}

.cards {
  display: flex;

  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
}

.card {
  margin: 15px;
  position: relative;
  display: block;
  width: 15rem;
  height: 20rem;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 100%;
  height: auto;
  margin-bottom: 3rem;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}
.card__overlay__danger {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color-danger);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}
.card__overlay__success {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color-success);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}
.card:hover .card__overlay__success {
  transform: translateY(0);
}
.card:hover .card__overlay__danger {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}
.card__header__danger {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color-danger);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}
.card__header__success {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color-success);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}
.card__arc__danger {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}
.card__arc__success {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}
.card__arc__danger path {
  fill: var(--surface-color-danger);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}
.card__arc__success path {
  fill: var(--surface-color-success);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
  transform: translateY(0);
}
.card:hover .card__header__success {
  transform: translateY(0);
}
.card:hover .card__header__danger {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card__title {
  font-size: 1em;
  margin: 0 0 0.3em;
  color: #6a515e;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";
  font-size: 0.8em;
  color: #d7bdca;
}

.card__status {
  font-size: 0.8em;
  color: #d7bdca;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  font-family: "MockFlowFont";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
