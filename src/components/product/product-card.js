import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardMedia
      component="img"
      height="140"
      image={product.media}
      alt={`listing ${product.title}`}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ClockIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {product.createdAt}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {product.price} ₮
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider />

    <CardActions>
      <IconButton aria-label="actions" sx={{ marginLeft: "auto" }}>
        <MoreVertIcon />
      </IconButton>
    </CardActions>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
