import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const listings = [
  {
    id: uuid(),
    address: {
      country: "Монгол",
      state: "Баянзүрх",
      city: "Улаанбаатар",
      street: "7 хороо",
    },
    avatarUrl: "/static/images/avatars/avatar_3.png",
    createdAt: 1555016400000,
    email: "Bat@mail.com",
    name: "Бат",
    phone: "304-428-3097",
  },
  {
    id: uuid(),
    address: {
      country: "Монгол",
      state: "Баянгол",
      city: "Улаанбаатар",
      street: "7 хороо",
    },
    avatarUrl: "/static/images/avatars/avatar_4.png",
    createdAt: 1555016400000,
    email: "Hongor@mail.com",
    name: "Хонгор",
    phone: "712-351-5711",
  },
  {
    id: uuid(),
    address: {
      country: "Монгол",
      state: "Баянзүрх",
      city: "Улаанбаатар",
      street: "7 хороо",
    },
    avatarUrl: "/static/images/avatars/avatar_2.png",
    createdAt: 1555016400000,
    email: "Ankhaa@mail.com",
    name: "Анхаа",
    phone: "770-635-2682",
  },
  {
    id: uuid(),
    address: {
      country: "Монгол",
      state: "Хан-уул",
      city: "Улаанбаатар",
      street: "7 хороо",
    },
    avatarUrl: "/static/images/avatars/avatar_5.png",
    createdAt: 1554930000000,
    email: "Saikhnaa@mail.com",
    name: "Сайхнаа",
    phone: "908-691-3242",
  },
  {
    id: uuid(),
    address: {
      country: "Монгол",
      state: "Хан-уул",
      city: "Улаанбаатар",
      street: "7 хороо",
    },
    avatarUrl: "/static/images/avatars/avatar_6.png",
    createdAt: 1554757200000,
    email: "Dulguun@mail.com",
    name: "Дөлгөөн",
    phone: "972-333-4106",
  },
];

export const LatestListings = (props) => (
  <Card {...props}>
    <CardHeader title="Сүүлд бүртгүүлсэн хэрэглэгчид" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Нэр</TableCell>
              <TableCell>Цахим шуудан</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Хаяг
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Утасны дугаар</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <TableRow hover key={listing.id}>
                <TableCell>{listing.name}</TableCell>
                <TableCell>{listing.email}</TableCell>
                <TableCell>
                  {`${listing.address.city}`}
                </TableCell>
                <TableCell>
                  {listing.phone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
        href="/products"
      >
        Бүгдийг харах
      </Button>
    </Box>
  </Card>
);
