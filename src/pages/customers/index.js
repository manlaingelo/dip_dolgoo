import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../../components/customer/customer-list-results";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { AdminLayout } from "../../components/admin-layout";
import { customers } from "../../__mocks__/customers";
import { useEffect } from "react";

const Customers = () => {
  // const getCustomer = () => {};


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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Customers;
