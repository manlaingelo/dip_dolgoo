import PropTypes from "prop-types";
import { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";

//  icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// ----------------------------------------------------------------------

const MoreMenu = (props) => {
  const { refreshPosts } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(props.product);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const handleDelete = () => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const setterData = {
      id: product.id,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/posts/delete", requestOptions)
      .then((response) => {
        if (response.status === 204) {
          console.log("DELETED!!!");
          setIsOpenDelete(false);
          refreshPosts();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const setterData = {
      ...product,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/posts/update", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("UPDATED");
          setIsOpenUpdate(false);
          refreshPosts();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleClose = () => {
    setIsOpenDelete(false);
    setIsOpenUpdate(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%", backgroundColor: "#f7f7f7" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={() => setIsOpenDelete(true)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Устгах" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>

        <MenuItem
          component={Link}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={() => setIsOpenUpdate(true)}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Засах" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>
      </Menu>

      <Dialog open={isOpenUpdate} onClose={handleClose}>
        <DialogTitle>Зар засах</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="title"
            label="Гарчиг"
            type="text"
            value={product.title}
            onChange={(e) => {
              setProduct({
                ...product,
                title: e.target.value,
              });
            }}
          />
          <TextField
            value={product.description}
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value,
              });
            }}
            margin="dense"
            id="description"
            label="Дэлгэрэнгүй"
            type="text"
            fullWidth
          />
          <TextField
            value={product.price}
            onChange={(e) => {
              setProduct({
                ...product,
                price: e.target.value,
              });
            }}
            margin="dense"
            id="price-edit"
            label="Үнэ"
            type="text"
            fullWidth
          />
          <TextField
            value={product.area}
            onChange={(e) => {
              setProduct({
                ...product,
                area: e.target.value,
              });
            }}
            margin="dense"
            id="area-edit"
            label="Талбай"
            type="text"
            fullWidth
          />
          <TextField
            value={product.address}
            onChange={(e) => {
              setProduct({
                ...product,
                address: e.target.value,
              });
            }}
            margin="dense"
            id="address-edit"
            label="Хаяг"
            type="text"
            fullWidth
          />
          <TextField
            value={product.rooms}
            onChange={(e) => {
              setProduct({
                ...product,
                rooms: e.target.value,
              });
            }}
            margin="dense"
            id="rooms-edit"
            label="Өрөө"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Цуцлах
          </Button>
          <Button onClick={handleUpdate}>Засах</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isOpenDelete} onClose={handleClose}>
        <DialogTitle>Зар устгах</DialogTitle>
        <DialogContent>
          <DialogContentText>Та {product.id} дугаартай бичлэгийг устгах уу ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Цуцлах
          </Button>
          <Button onClick={handleDelete}>Устгах</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};



export const ProductCard = ({ product, refreshPosts, ...rest }) => (
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
      image={product.postImages[0].image}
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
        <MoreMenu product={product} refreshPosts={refreshPosts} />
      </IconButton>
    </CardActions>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
