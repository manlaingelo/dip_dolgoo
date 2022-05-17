import axios from "axios";

const getUsers = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  const { page, searchValue, size } = body;
  console.log(page, searchValue, size);
  return await axios.get(
    `http://localhost:8081/api/users?page=${page}&searchPattern=${searchValue}&size=${size}`,
    config
  );
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {

    const result = await getUsers({ body, auth: req.headers.authorization });
    console.log(result);
    const users = result.data;
    res.status(result.status).json({ users });
    return;
  }
  res.status(200).json({});
}
