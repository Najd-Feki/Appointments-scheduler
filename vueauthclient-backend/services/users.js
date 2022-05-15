import { cassandraClient } from "../index.js";

export const getAllUsers = async () => {
  await cassandraClient.connect();

  const rs = await cassandraClient.execute("SELECT * FROM cass.users");

  await cassandraClient.shutdown();
  return rs.rows;
};
