import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const products = [
  {
    id: uuid(),
    title: "Үнэ тохирч яаралтай зарна",
    imageUrl: "/static/images/products/mock_1.jpeg",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    title: "Минималист канад амины орон сууц",
    imageUrl: "/static/images/products/mock_2.jpeg",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    title: "Зам дагуу, нарны халаалттай, бохироо шийдсэн тохилог амины орон сууц",
    imageUrl: "/static/images/products/mock_3.jpeg",
    updatedAt: subHours(Date.now(), 3),
  },
  {
    id: uuid(),
    title: "ХУД Цэлмэг хотхон",
    imageUrl: "/static/images/products/mock_4.jpeg",
    updatedAt: subHours(Date.now(), 5),
  },
  {
    id: uuid(),
    title: "Зуслангийн зам дагуу газар зарна",
    imageUrl: "/static/images/products/mock_5.jpeg",
    updatedAt: subHours(Date.now(), 9),
  },
];

export const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader subtitle={`${products.length} in total`} title="Сүүлийн зарууд" />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemAvatar>
            <img
              alt={product.title}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.title}
            secondary={`Шинэчилсэн: ${formatDistanceToNow(product.updatedAt)}`}
          />
          <IconButton edge="end" size="small"></IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
        href="/products"
      >
        Бүгдийг харах
      </Button>
    </Box>
  </Card>
);
