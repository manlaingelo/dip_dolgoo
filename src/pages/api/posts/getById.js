import axios from "axios";

const getPosts = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  const { id, page, searchPattern, size } = body;
  return await axios.get(
    `http://localhost:8081/api/users/${id}/posts?page=${page}&searchPattern=${searchPattern}&size=${size}`,
    config
  );
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    const result = await getPosts({ body, auth: req.headers.authorization });
    console.log(result)
    const posts = result.data;
    res.status(result.status).json({ posts });
    return;
  }
  res.status(200).json({});
}
