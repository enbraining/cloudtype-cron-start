import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();

async function getToken() {
  const deviceId = "dev-cloudtypecronstartjs";

  const body = {
    values: {
      deviceid: deviceId,
      loginname: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    },
  };
  const response = await axios.post("https://api.cloudtype.io/auth", body);
  return response.data.token;
}

async function startInstance(token) {
  const organization = process.env.ORGANIZATION_NAME;
  const project = process.env.PROJECT_NAME;
  const instance = process.env.INSTANCE_NAME;

  await axios.put(
    `https://api.cloudtype.io/project/${organization}/${project}/stage/main/deployment/${instance}/start`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const token = await getToken();
await startInstance(token);
