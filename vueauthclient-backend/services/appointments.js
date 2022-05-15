import { cassandraClient } from "../index.js";
import cassandra from "cassandra-driver";
export const getAllAppointments = async () => {
  await cassandraClient.connect();
  const appointments = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where isvalid = true ALLOW FILTERING"
  );

  return appointments.rows;
};
export const updateAppointment = async (clientId, appointmentData) => {
  const Uuid = cassandra.types.Uuid;
  const appointmentId = Uuid.random();
  await cassandraClient.connect();
  await cassandraClient.execute(
    `update cass.appointments set isValid = false , underupdate = true where id = ?`,
    [appointmentData.id],
    { prepare: true }
  );
  await cassandraClient.execute(
    `Insert into cass.appointments (id,clientid,name,date,image,notes,isValid,isWaiting,isupdate,updateto,declineMessage,underupdate) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      appointmentId,
      clientId,
      appointmentData.name,
      appointmentData.date,
      appointmentData.image,
      appointmentData.notes,
      false,
      true,
      true,
      appointmentData.id,
      "",
      false,
    ],
    { prepare: true }
  );
};

export const addAppointment = async (clientId, appointmentData) => {
  const Uuid = cassandra.types.Uuid;
  const appointmentId = Uuid.random();
  await cassandraClient.connect();
  await cassandraClient.execute(
    `Insert into cass.appointments (id,clientid,name,date,image,notes,isValid,isWaiting,isupdate,updateto,declineMessage,underupdate) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      appointmentId,
      clientId,
      appointmentData.name,
      appointmentData.date,
      appointmentData.image,
      appointmentData.notes,
      false,
      true,
      false,
      null,
      "",
      false,
    ],
    { prepare: true }
  );
  return appointmentId;
};
export const getAppointmentById = async (id) => {
  await cassandraClient.connect();
  const appointment = await cassandraClient.execute(
    `select * from cass.appointments where id = ?`,
    [id],
    { prepare: true }
  );
  return appointment.rows;
};
export const getAppointmentsByClient = async (clientId) => {
  await cassandraClient.connect();
  const appointments = await cassandraClient.execute(
    "SELECT * FROM cass.appointments where clientid = ? and underupdate = false ALLOW FILTERING",
    [clientId],
    { prepare: true }
  );

  return appointments.rows;
};
