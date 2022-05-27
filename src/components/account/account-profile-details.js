import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const MOCK_USER = {
  firstname: "",
  lastName: "",
  phone: "",
  email: "",
};

export const AccountProfileDetails = (props) => {
  const { user } = props;

  const setterData = user;
  const [values, setValues] = useState(setterData);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updateUser = (event) => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const setterData = {
      ...values,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // (post);
    fetch("/api/customers/update", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { user } = data;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setValues(user);
  }, [user]);

  useEffect(() => {
  }, []);

  return (
    <form autoComplete="off" noValidate {...props}>
      {user && (
        <Card>
          <CardHeader subheader="Өөрийн бүртгэлээ шинэчлэх" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Овог"
                  name="firstname"
                  value={values.firstname || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Нэр"
                  name="lastname"
                  value={values.lastname || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Цахим шуудан"
                  name="email"
                  value={values.email || ""}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Утасны дугаар"
                  name="phone"
                  value={values.phone || ""}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button onClick={updateUser} color="primary" variant="contained">
              Хадгалах
            </Button>
          </Box>
        </Card>
      )}
    </form>
  );
};
