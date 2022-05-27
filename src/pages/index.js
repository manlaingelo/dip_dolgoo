import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Typography, Container, Grid, Box, Pagination } from "@mui/material";
import Navbar from "../components/main/navbar";
import { PostCard } from "../components/post/post-card";
import MainSearchBar from "../components/main/main-search-bar";

import MainFeaturedPost from "../components/main/MainFeaturedPost";
import FeaturedPost from "../components/main/FeaturedPost";
const PAGE_SIZE = 6;

export async function getServerSideProps() {
  // Fetch data from external API
  const apiURL = `http://localhost:8081/api/posts?maxArea=&maxPrice=&minArea=&minPrice=&page=0&searchPattern=%20&size=${PAGE_SIZE}`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const Landing = ({ data }) => {
  const [pageCount, setPageCount] = useState(data.totalPages);
  const [postsCount, setPostsCount] = useState(data.totalElements);
  const [posts, setPosts] = useState(data.content);
  const [featuredPosts, setFeaturedPosts] = useState(data.content.slice(0, 6));

  const handleChangePage = (event, value) => {
    const params = {
      page: value - 1,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      searchPattern: "",
      size: PAGE_SIZE,
    };

    getPosts(params);
  };

  const handleSearch = (area, price, location, searchValue) => {
    // const params = {
    //   maxArea: area[1],
    //   minArea: area[0],
    //   maxPrice: price[1] * 1000000,
    //   minPrice: price[0],
    //   page: 0,
    //   searchPattern: "",
    //   size: PAGE_SIZE,
    // };
    const params = {
      page: 0,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      searchPattern: searchValue,
      size: PAGE_SIZE,
    };

    getPosts(params);
  };

  const getPosts = (params) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/posts/get", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { posts } = data;
        setPosts(posts.content);
        setPageCount(posts.totalPages);
        setPostsCount(posts.totalElements);
        setFeaturedPosts(data.content.slice(0, 6));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {}, [posts]);
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
              {posts?.map((post) => (
                <Grid item key={`posts-${post.id}`} xs={12} md={6}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
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
          {posts.length > 0 && <MainFeaturedPost post={posts[0]} />}
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
            {featuredPosts?.map((post) => (
              <FeaturedPost key={`featured-${post.id}`} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </>
  );
};

Landing.getLayout = (page) => <>{page}</>;

export default Landing;
