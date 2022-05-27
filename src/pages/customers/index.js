import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../../components/customer/customer-list-results";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { AdminLayout } from "../../components/admin-layout";

const Customers = () => {
  // const getCustomer = () => {};
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const handleDelete = () => {
    console.log("triggered", selectedCustomerId);
    setRefresh(true);
    deleteCustomer(selectedCustomerId);
  };

  const deleteCustomer = (id) => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const setterData = {
      id,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // console.log(post);
    fetch("/api/customers/delete", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          console.log(response.status);
    setRefresh(false);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <Head>
        <title>Хэрэглэгчид</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar handleDelete={handleDelete} />

          <Box sx={{ mt: 3 }}>
            <CustomerListResults
              setSelectedCustomerId={(id) => setSelectedCustomerId(id)}
              refresh={refresh}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Customers;
