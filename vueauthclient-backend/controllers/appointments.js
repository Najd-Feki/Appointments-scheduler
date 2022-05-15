import * as AppointmentService from "../services/appointments.js";
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const addAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    const image = req.file;
    Object.assign(appointment, { image: image.path });
    const clientId = req.session.passport.user;

    const result = await AppointmentService.addAppointment(
      clientId,
      appointment
    );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
export const updateAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    const image = req.file;
    Object.assign(appointment, { image: image.path });
    const clientId = req.session.passport.user;
    const result = await AppointmentService.updateAppointment(
      clientId,
      appointment
    );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AppointmentService.getAppointmentById(id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
export const getAppointmentByClient = async (req, res) => {
  try {
    const clientId = req.session.passport.user;
    const result = await AppointmentService.getAppointmentsByClient(clientId);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
