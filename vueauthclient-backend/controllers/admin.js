import * as AdminService from "../services/admin.js";
export const getAdminNewAppointments = async (req, res) => {
  try {
    const appointments = await AdminService.getAdminNewAppointments();
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const getAdminUpdateAppointments = async (req, res) => {
  try {
    const appointments = await AdminService.getAdminUpdateAppointments();
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const getAdminSingleAppointment = async (req, res) => {
  try {
    const appointments = await AdminService.getAdminSingleAppointment();
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const acceptNewAppointment = async (req, res) => {
  try {
    const { id: appointmentId } = req.body;
    const appointments = await AdminService.acceptNewAppointment(appointmentId);
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const declineNewAppointment = async (req, res) => {
  try {
    const { id: appointmentId, declineMessage } = req.body;
    const appointments = await AdminService.declineNewAppointment(
      appointmentId,
      declineMessage
    );
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const getAdminUpdateSingleAppointment = async (req, res) => {
  try {
    const { id: appointmentId } = req.params;
    const appointments = await AdminService.getAdminUpdateSingleAppointment(
      appointmentId
    );
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const acceptUpdateAppointment = async (req, res) => {
  try {
    const { oldAppointmentId, newAppointmentId } = req.body;
    const appointments = await AdminService.acceptUpdateAppointment(
      oldAppointmentId,
      newAppointmentId
    );
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
export const declineUpdateAppointment = async (req, res) => {
  try {
    const { newAppointmentId, declineMessage } = req.body;
    const appointments = await AdminService.declineUpdateAppointment(
      newAppointmentId,
      declineMessage
    );
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
