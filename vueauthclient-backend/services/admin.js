import { cassandraClient } from "../index.js";
export const getAdminNewAppointments = async () => {
  await cassandraClient.connect();
  const appointments = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where iswaiting = true and isupdate = false ALLOW FILTERING"
  );

  return appointments.rows;
};
export const getAdminUpdateAppointments = async () => {
  await cassandraClient.connect();
  const appointments = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where iswaiting = true and isupdate = true ALLOW FILTERING"
  );

  return appointments.rows;
};
export const getAdminUpdateSingleAppointment = async (appointmentId) => {
  await cassandraClient.connect();
  const newAppointment = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where id = ? ALLOW FILTERING",
    [appointmentId]
  );
  const oldAppointmentId = newAppointment.rows[0].updateto;
  const oldAppointment = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where id = ? ALLOW FILTERING",
    [oldAppointmentId]
  );

  return [oldAppointment.rows[0], newAppointment.rows[0]];
};

export const acceptNewAppointment = async (appointmentId) => {
  await cassandraClient.connect();
  await cassandraClient.execute(
    "update cass.appointments set isValid = true,iswaiting=false,declinemessage='',underupdate = false where id = ?",
    [appointmentId],
    { prepare: true }
  );
};
export const declineNewAppointment = async (appointmentId, declineMessage) => {
  await cassandraClient.connect();
  console.log({ declineMessage });
  await cassandraClient.execute(
    "update cass.appointments set declineMessage = ?,iswaiting=false,underupdate = false where id = ?",
    [declineMessage, appointmentId]
  );
};

export const acceptUpdateAppointment = async (
  oldAppointmentId,
  newAppointmentId
) => {
  await cassandraClient.connect();
  await cassandraClient.execute(
    "update cass.appointments set isValid = true,iswaiting=false,isupdate=false,updateto=null,declinemessage='',underupdate = false where id = ?",
    [newAppointmentId],
    { prepare: true }
  );
  await cassandraClient.execute(
    "delete from cass.appointments  where id = ?",
    [oldAppointmentId],
    { prepare: true }
  );
};
export const declineUpdateAppointment = async (
  newAppointmentId,
  declineMessage
) => {
  await cassandraClient.connect();
  await cassandraClient.execute(
    "update cass.appointments set iswaiting=false,underupdate = false ,declinemessage=? where id = ?",
    [declineMessage, newAppointmentId],
    { prepare: true }
  );
};
