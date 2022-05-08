import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";

export const PostCard = ({ post, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      height: "100%",
      maxHeight: "250px",
    }}
    {...rest}
  >
    <CardMedia
      component="img"
      height="250"
      sx={{ width: 250, minWidth: 250 }}
      image={post.media}
      alt={`listing ${post.title}`}
    />
    <Grid>
      <NextLink href={`/posts/${post.id}`} passHref>
        <a style={{ textDecoration: "none" }}>
          <CardContent>
            <Typography gutterBottom component="h5" color="text.primary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
              {post.title.substring(0, 35)}
              {post.title.length > 35 && "..."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description.substring(0, 50)}
              {post.description.length > 150 && "..."}
            </Typography>
          </CardContent>
        </a>
      </NextLink>

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
              {post.createdAt}
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
              {post.price} ₮
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>

    <Divider />
  </Card>
  // </NextLink>
);

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
