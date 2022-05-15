import * as AdminController from "../controllers/admin.js";
import { Router } from "express";
const router = Router();
router.get("/api/admin/appointments", AdminController.getAdminNewAppointments);
router.post("/api/admin/validate/", AdminController.acceptNewAppointment);
router.post("/api/admin/decline/", AdminController.declineNewAppointment);
router.get(
  "/api/admin/appointments-update",
  AdminController.getAdminUpdateAppointments
);
router.post(
  "/api/admin/validate-update/",
  AdminController.acceptUpdateAppointment
);
router.post(
  "/api/admin/decline-update/",
  AdminController.declineUpdateAppointment
);
router.get(
  "/api/admin/single-update/:id",
  AdminController.getAdminUpdateSingleAppointment
);
export default router;
