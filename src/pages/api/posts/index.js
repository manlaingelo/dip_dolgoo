// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2ZmQ1N2I0Zi1lYTE0LTQ1MWQtOGFmZC02OGI2YWNkNzhhYzAiLCJhdXRoIjoiUk9MRV9BRE1JTiIsImlhdCI6MTY1Mjc5NDU3NSwiZXhwIjoxNjU0MjY1ODA0fQ.EKulCJVV07-fBDg0GJ9cQBs3uAvi0ian2S9rrL52uFc";

console.log(token);
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export default function handler (req, res) {
  // const result =  axios.get("http://localhost:8081/api/users?page=0&searchPattern=%20&size=10", {}, config);
  res.status(200).json({ res: result });
}
