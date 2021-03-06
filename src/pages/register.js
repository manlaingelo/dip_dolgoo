import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const register = async (values) => {
    var myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
    });
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: values.email,
      password: values.password,
      phone: values.phone,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/register", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setMessage("Амжилттай бүртгэл хийгдлээ.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Зөв цахим шуудан оруулна уу").max(255).required("Заавал оруулах"),
      phone: Yup.number().required("Заавал оруулах"),
      password: Yup.string().max(255).required("Заавал оруулах"),
    }),
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <>
      <Head>
        <title>Бүртгүүлэх хэсэг</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Нүүр хуудас
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Шинээр бүртгэл үүсгэх
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Цахим шуудан болон утасны дугаараа оруулан шинэ хаяг үүсгэнэ үү.
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Цахим шуудан"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Утасны дугаар"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Нууц үг"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              {message ? (
                message
              ) : (
                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Бүртгүүлэх
                </Button>
              )}
            </Box>
            <Typography color="textSecondary" variant="body2">
              Хаягтай юу?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Нэвтрэх
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
