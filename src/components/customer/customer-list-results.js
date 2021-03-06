import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  CardContent,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { Search as SearchIcon } from "../../icons/search";

const ROWS_PER_PAGE = 5;

export const CustomerListResults = ({ setSelectedCustomerId, refresh, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [limit, setLimit] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  // getters

  const getCustomers = () => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const setterData = {
      page,
      searchValue,
      size: ROWS_PER_PAGE,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/customers/get", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { users } = data;
        setCustomers(users.content);
        setTotalElements(users.totalElements);
        users;
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCustomers();
  }, [page, refresh]);

  // handlers

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    setSelectedCustomerId(newSelectedCustomerIds[0]);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    getCustomers();
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ display: "flex" }}>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="????????"
                variant="outlined"
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
              />
            </Box>
            <Button onClick={handleSearch} sx={{ ml: 3 }} variant="contained">
              Search
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === customers?.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < customers?.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>????????</TableCell>
                  <TableCell>??????</TableCell>
                  <TableCell>?????????? ????????????</TableCell>
                  <TableCell>???????????? ????????????</TableCell>
                  <TableCell>??????????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.slice(0, limit).map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.lastname || "No value"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {customer.firstname || "No value"}
                      </Typography>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone || "No value"}</TableCell>
                    <TableCell>{customer.active ? "active" : "disabled"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={totalElements}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[ROWS_PER_PAGE]}
        />
      </Card>
    </>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
