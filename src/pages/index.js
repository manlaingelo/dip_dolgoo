import React, { useState } from "react";
import Head from "next/head";
import { Typography, Container, Grid } from "@mui/material";
import Navbar from "../components/main/navbar";

import MainFeaturedPost from "../components/main/MainFeaturedPost";
import FeaturedPost from "../components/main/FeaturedPost";

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

const Landing = () => {
  return (
    <>
      <Head>
        <title>Үл хөдлөх хөрөнгө зуучлалын веб</title>
      </Head>
      <Navbar />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
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
