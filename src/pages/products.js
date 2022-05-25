import Head from "next/head";
import { useEffect, useState } from "react";
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
} from "@mui/material";
// import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { Search as SearchIcon } from "../icons/search";

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
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}
const Products = ({ data }) => {
  const [pageCount, setPageCount] = useState(data.totalPages);
  const [postsCount, setPostsCount] = useState(data.totalElements);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [post, setPost] = useState({});
  const [products, setProducts] = useState(data.content);
  const [message, setMessage] = useState("");
  const [searchPattern, setSearchPattern] = useState("");

  // getters
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
        console.log(data);
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

    const setterData = {
      ...post,
      postImages: [
        {
          id: 0,
          image: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>`,
          post: {
            address: post.address,
            area: post.area,
            createdDate: "2022-05-17T15:56:55.260Z",
            description: post.description,
            id: "string",
            modifiedDate: "2022-05-17T15:56:55.260Z",
            postImages: [null],
            postTypes: ["POST_PLACE"],
            price: post.price,
            rooms: post.price,
            title: post.title,
          },
          poster: true,
        },
      ],
      postType: 1,
    };
    const raw = JSON.stringify(setterData);

    console.log("creating", raw, post);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // console.log(post);
    fetch("/api/posts/create", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          setMessage("Амжилттай.");
        } else {
          setMessage("Амжилтгүй, Ахин оролдоно уу.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handlePostChange = (e) => {
    let formData = post;
    formData[e.target.name] = e.target.value;
    console.log(formData);
    setPost(formData);
  };

  const handleChangePage = (e, value) => {
    console.log(value);
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
    console.log('refreshing')
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
