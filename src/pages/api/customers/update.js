import axios from "axios";

const updatePost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  const updateRequest = {
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
  };

  return await axios.put(`http://localhost:8081/api/users`, body, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await updatePost({ body, auth: req.headers.authorization });
    const user = {
      ...result.data,
    };
    res.status(result.status).json({ user });
    return;
  }
  res.status(200).json({});
}
