import axios from "axios";

const createPost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  console.log(body, auth);
  return await axios.post("http://localhost:8081/api/posts", body, config);
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    console.log(req.headers.authorization);

    const result = await createPost({ body, auth: req.headers.authorization });

    console.log(result);
    res.status(result.status).json({});
    return;
  }
  res.status(200).json({});
}
