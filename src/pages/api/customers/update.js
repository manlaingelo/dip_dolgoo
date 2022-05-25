import axios from "axios";

const updatePost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  console.log(body, auth);
  const updateRequest = {
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
  };
  console.log(updateRequest);

  return await axios.put(`http://localhost:8081/api/users/${body.id}`, body, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await updatePost({ body, auth: req.headers.authorization });

    console.log(result);
    res.status(result.status).json({});
    return;
  }
  res.status(200).json({});
}
