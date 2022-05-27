import axios from "axios";

const registerUsers = async (params) => {
  return await axios.post("http://localhost:8081/api/users", params);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await registerUsers(body);
    res.status(result.status).json({});

    return;
  }
  res.status(200).json({});
}
