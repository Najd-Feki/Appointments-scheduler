import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import AdminAppointments from "@/components/AdminAppointments";
import ClientAppointments from "@/components/ClientAppointments";
import DoctorAppointments from "@/components/DoctorAppointments";
import AdminUpdatedAppointments from "@/components/AdminUpdatedAppointments";
import AdminAppointmentCompare from "@/components/AdminAppointmentCompare";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/admin-appointments",
      name: "AdminAppointments",
      component: AdminAppointments
    },
    {
      path: "/client-appointments",
      name: "ClientAppointments",
      component: ClientAppointments
    },
    {
      path: "/doctor-appointments",
      name: "DoctorAppointments",
      component: DoctorAppointments
    },
    {
      path: "/update-appointments",
      name: "AdminUpdatedAppointments",
      component: AdminUpdatedAppointments
    },
    {
      path: "/compare-appointments/:id",
      name: "AdminAppointmentCompare",
      component: AdminAppointmentCompare
    }
  ]
});
