import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Typography, Container, Grid, Box, Pagination } from "@mui/material";
import Navbar from "../components/main/navbar";
import { PostCard } from "../components/post/post-card";
import MainSearchBar from "../components/main/main-search-bar";
import { products } from "../__mocks__/products";

import MainFeaturedPost from "../components/main/MainFeaturedPost";
import FeaturedPost from "../components/main/FeaturedPost";
import axios from "axios";
// const PAGE_SIZE = 21

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Бүртгүүлэх",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

export async function getServerSideProps() {
  // Fetch data from external API
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2ZmQ1N2I0Zi1lYTE0LTQ1MWQtOGFmZC02OGI2YWNkNzhhYzAiLCJhdXRoIjoiUk9MRV9BRE1JTiIsImlhdCI6MTY1Mjc5NDU3NSwiZXhwIjoxNjU0MjY1ODA0fQ.EKulCJVV07-fBDg0GJ9cQBs3uAvi0ian2S9rrL52uFc";

  console.log(token);
  const apiURL = `http://localhost:8081/api/posts?maxArea=100&maxPrice=10000000&minArea=0&minPrice=0&page=0&searchPattern=%20&size=20`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

const Landing = ({ data }) => {
  console.log(data);
  const [pageCount, setPageCount] = useState(3);
  const [posts, setPosts] = useState(products);
  const [temp, setTemp] = useState([]);
  const [postsCount, setPostsCount] = useState(32);
  const handleChangePage = (event, value) => {
    console.log(value);
    const nextPagePosts = posts;
    setPosts(nextPagePosts.reverse());
  };

  const handleSearch = (area, price, location, searchValue) => {
    console.log(area, price, location, searchValue);
  };

  useEffect(() => {
    // fetch data form backend
    // const apiEndPoint =
    //   "/api/posts?maxArea=100&maxPrice=10000000&minArea=0&minPrice=0&page=0&searchPattern=%20&size=20";
    // const getPosts = async () => {
    //   const { data: res } = await axios.get(apiEndPoint);
    //   setTemp(res);
    //   console.log(res);
    // };
    // getPosts();
    // console.log(temp);
  }, [posts]);
  return (
    <>
      <Head>
        <title>Үл хөдлөх хөрөнгө зуучлалын веб</title>
      </Head>
      <Navbar />
      <Container maxWidth="lg">
        <main>
          <MainSearchBar getSearchValues={handleSearch} />
          <Typography gutterBottom variant="h5" component="div" mt={3}>
            Олдсон зарууд{" "}
            <span style={{ fontSize: "12px", color: "#65748b" }}>
              (хайлтад {postsCount} тохирсон)
            </span>
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} md={6}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
            {/* <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={6}>
                    {posts.map((post) => (
                      <Grid item key={post.id} xs={12} md={6}>
                        <PostCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  Feature
                </Grid>
              </Grid> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              count={pageCount}
              size="small"
              onChange={handleChangePage}
            />
          </Box>
          <MainFeaturedPost post={posts[1]} />
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ my: 5 }}
          >
            Сүүлд нэмэгдсэн
          </Typography>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ my: 5 }}
          >
            Манай үйлчилгээ
          </Typography>
        </main>
      </Container>
    </>
  );
};

Landing.getLayout = (page) => <>{page}</>;

export default Landing;
