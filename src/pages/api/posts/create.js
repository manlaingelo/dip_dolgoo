import axios from "axios";

const createPost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  return await axios.post("http://localhost:8081/api/posts", body, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await createPost({ body, auth: req.headers.authorization });
    res.status(result.status).json({});
    return;
  }
  res.status(200).json({});
}
