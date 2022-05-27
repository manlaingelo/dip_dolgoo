/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Card,
  SvgIcon,
  CardContent,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
// import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { Search as SearchIcon } from "../icons/search";
import { Upload as UploadIcon } from "../icons/upload";

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
const Products = ({ data }) => {
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [pageCount, setPageCount] = useState(data.totalPages);
  const [postsCount, setPostsCount] = useState(data.totalElements);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [post, setPost] = useState({});
  const [products, setProducts] = useState(data.content);
  const [message, setMessage] = useState("");
  const [searchPattern, setSearchPattern] = useState("");

  // getters
  const getPosts = (params) => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const data = {
      ...params,
      id,
    };

    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("/api/posts/getById", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { posts } = data;
        setProducts(posts.content);
        setPageCount(posts.totalPages);
        setPostsCount(posts.totalElements);
      })
      .catch((error) => console.log("error", error));
  };

  // handlers
  const handleClose = () => {
    setIsCreateOpen(false);
  };

  const handleSearch = () => {
    const params = {
      searchPattern,
      page: 0,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      size: PAGE_SIZE,
    };
    getPosts(params);
  };

  const handleCreate = () => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const postImages = base64Files.map((file, index) => {
      return {
        ...post,
        image: file,
        poster: index === 0 ? true : false,
      };
    });

    const setterData = {
      ...post,
      postImages,
      postType: 0,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/posts/create", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setMessage("Амжилттай.");
          setIsCreateOpen(false);
          refreshPosts();
        } else {
          setMessage("Амжилтгүй, Ахин оролдоно уу.");
        }
      })
      .catch((error) => console.log("error", error));
  };
  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const handlePostChange = (e) => {
    let formData = post;
    formData[e.target.name] = e.target.value;
    setPost(formData);
  };

  const handleChangePage = (e, value) => {
    const params = {
      searchPattern: "",
      page: value - 1,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      size: PAGE_SIZE,
    };
    getPosts(params);
  };

  const refreshPosts = () => {
    const params = {
      searchPattern: "",
      page: 0,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      size: PAGE_SIZE,
    };
    getPosts(params);
  };

  useEffect(() => {
    const params = {
      searchPattern: "",
      page: 0,
      maxArea: "",
      minArea: "",
      maxPrice: "",
      minPrice: "",
      size: PAGE_SIZE,
    };
    getPosts(params);
  }, []);

  useEffect(() => {
    files.forEach((file) => {
      getBase64(file, (result) => {
        setBase64Files([...base64Files, result]);
      });
    });
  }, [files]);

  return (
    <>
      <Head>
        <title>Зарууд</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar handleOpen={() => setIsCreateOpen(true)} />
          <Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent sx={{ display: "flex" }}>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon fontSize="small" color="action">
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Зар хайх"
                      variant="outlined"
                      value={searchPattern}
                      onChange={(event) => {
                        setSearchPattern(event.target.value), console.log(event.target.value);
                      }}
                    />
                  </Box>

                  <Button onClick={handleSearch} sx={{ ml: 3 }} variant="contained">
                    Хайх
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} refreshPosts={refreshPosts} />
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
        </Container>
      </Box>
      <Dialog open={isCreateOpen} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>Зар нэмэх</DialogTitle>
        <DialogContent>
          <Grid sx={{ py: 3 }} spacing={2} container>
            <Grid xs={12} item>
              <Dropzone files={files} setFiles={(files) => setFiles(files)} />
            </Grid>
            <Grid xs={12} item>
              <TextField
                onChange={handlePostChange}
                name="title"
                label="Гарчиг"
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                onChange={handlePostChange}
                name="description"
                label="Дэлгэрэнгүй"
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField onChange={handlePostChange} name="address" label="Хаяг" fullWidth />
            </Grid>
            <Grid xs={12} item>
              <TextField onChange={handlePostChange} name="area" label="Хэмжээ" fullWidth />
            </Grid>
            {/* <Grid xs={12} item>
              <TextField name="postType" label="төрөл" fullWidth />
            </Grid> */}
            <Grid xs={12} item>
              <TextField onChange={handlePostChange} name="price" label="Үнэ" fullWidth />
            </Grid>
            <Grid xs={12} item>
              <TextField onChange={handlePostChange} name="rooms" label="Өрөөний тоо" fullWidth />
              <Typography align="right">{message}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Цуцлах
          </Button>
          <Button onClick={handleCreate}>Нэмэх</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  border: "1px solid #eaeaea",
  borderRadius: "1rem",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  borderRadius: "0.75rem",
};

function Dropzone(props) {
  const { files, setFiles } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <Card
        sx={{
          p: 2,
          "&:hover": {
            cursor: "pointer",
          },
          border: "2px dashed #94a3b8",
        }}
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Typography variant="body2" textAlign="center" sx={{ color: "#9ca3af" }}>
            Зургаа зөөж оруулах эсвэл энд товчсноор нэмэх боломжтой
          </Typography>
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <SvgIcon fontSize="small" color="action">
              <UploadIcon />
            </SvgIcon>
          </Stack>
        </div>
      </Card>

      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
