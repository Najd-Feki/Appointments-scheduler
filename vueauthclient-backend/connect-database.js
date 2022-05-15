const { Client } = require("cassandra-driver");
async function run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-task.zip",
    },
    // put this in the .env
    credentials: {
      username: "token",
      password:
        "AstraCS:iMOrZYWDORrDbOiduSCeNCZr:6008be42ad9c91e5e5fc60f84173bd0e60b284009e344dcffc1334274a1b7dab",
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM cass.users");
  console.log(`Your cluster returned ${rs} row(s)`);

  await client.shutdown();
}

// Run the async function
run();
