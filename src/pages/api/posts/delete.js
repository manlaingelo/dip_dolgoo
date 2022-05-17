import axios from "axios";

const deletePost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  console.log(params)
  return await axios.delete(`http://localhost:8081/api/posts/${body.id}`, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await deletePost({ body, auth: req.headers.authorization });

    console.log(result);
    res.status(result.status).json({});
    return;
  }
  res.status(200).json({});
}
