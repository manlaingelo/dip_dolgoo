import axios from "axios";

const loginUsers = async (params) => {
  return await axios.post("http://localhost:8081/api/auth/login", params);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    console.log(body);

    const result = await loginUsers(body);
    const user = {
      ...result.data.user,
      accessToken: result.data.accessToken,
    };
    console.log(user);
    res.status(result.status).json({ user });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
