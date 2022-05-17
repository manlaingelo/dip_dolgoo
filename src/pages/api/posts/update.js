import axios from "axios";

const updatePost = async (params) => {
  const { body, auth } = params;
  const config = {
    headers: { Authorization: auth },
  };
  console.log(body, auth);
  const updateRequest = {
    address: body.address,
    area: body.area,
    description: body.description,
    price: body.price,
    rooms: body.rooms,
    title: body.title,
  };
  console.log(updateRequest);

  return await axios.put(`http://localhost:8081/api/posts/${body.id}`, body, config);
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
