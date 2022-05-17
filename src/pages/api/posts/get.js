import axios from "axios";

const getPosts = async (params) => {
  const { maxArea, maxPrice, minArea, minPrice, page, searchPattern, size } = params;
  console.log(params);
  return await axios.get(
    `http://localhost:8081/api/posts?maxArea=${maxArea}&maxPrice=${maxPrice}&minArea=${minArea}&minPrice=${minPrice}&page=${page}&searchPattern=${searchPattern}&size=${size}`
  );
};

export default async function handler(req, res) {
  const body = req.body;
  if (body) {
    console.log(body);
    const result = await getPosts(body);
    const posts = result.data;
    res.status(result.status).json({ posts });
    return;
  }
  res.status(200).json({});
}
