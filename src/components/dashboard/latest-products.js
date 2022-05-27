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

export const LatestProducts = ({ props, products }) => {
  return (
    <Card {...props}>
      <CardHeader subtitle={`${products.length} in total`} title="Сүүлийн зарууд" />
      <Divider />
      {products && (
        <List>
          {products.map((product, i) => (
            <ListItem divider={i < products.length - 1} key={product.id}>
              <ListItemAvatar>
                <img
                  alt={product.title}
                  src={product.postImages[0].image}
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={product.title} secondary={`Үнэ: ${product.price}`} />
              <IconButton edge="end" size="small"></IconButton>
            </ListItem>
          ))}
        </List>
      )}

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
};
