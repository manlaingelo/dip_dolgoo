import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Хэрэглэгчид
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button onClick={props.handleDelete} color="error" variant="contained">
          Хэрэглэгч устгах
        </Button>
      </Box>
    </Box>
    
  </Box>
);
