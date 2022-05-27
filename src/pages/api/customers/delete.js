import axios from "axios";

const deleteCustomer = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  return await axios.delete(`http://localhost:8081/api/users/${body.id}`, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await deleteCustomer({ body, auth: req.headers.authorization });

    res.status(result.status).json({});
    return;
  }
  res.status(200).json({});
}
