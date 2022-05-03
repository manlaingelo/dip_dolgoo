import PropTypes from "prop-types";
import NextLink from "next/link";
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

export const PostCard = ({ post, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      height: "100%",
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
            <Typography gutterBottom variant="h5" component="div" color="text.primary">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description.substring(0, 150)}
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
