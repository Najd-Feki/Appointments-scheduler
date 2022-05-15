import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
import * as AppointmentController from "../controllers/appointments.js";
import upload from "../helpers/multerConfig.js";
const router = Router();
router.get(
  "/api/doctor/appointments",
  AppointmentController.getAllAppointments
);
router.get("/api/appointment/:id", AppointmentController.getAppointmentById);
router.get("/api/appointments", AppointmentController.getAppointmentByClient);

router.post(
  "/api/appointment",
  upload.single("image"),
  AppointmentController.addAppointment
);
router.patch(
  "/api/appointment",
  upload.single("image"),
  AppointmentController.updateAppointment
);
export default router;
