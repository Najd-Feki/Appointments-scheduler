import usersRouter from "./users.js";
import appointmentsRouter from "./appointments.js";
import adminRouter from "./admin.js";
import { Router } from "express";

const router = Router();
router.use(usersRouter, appointmentsRouter, adminRouter, (req, res) =>
  res.status(404).send("Route not found")
);
export default router;
