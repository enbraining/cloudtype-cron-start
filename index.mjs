import axios from "axios";
import { configDotenv } from "dotenv";

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
  const name = process.env.ACCOUNT_NAME;
  const project = process.env.PROJECT_NAME;
  const service = process.env.SERVICE_NAME;

  await axios.put(
    `https://api.cloudtype.io/project/${name}/${project}/stage/main/deployment/${service}/start`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const handler = async (event) => {
  configDotenv();
  const token = await getToken();
  await startInstance(token);
};
