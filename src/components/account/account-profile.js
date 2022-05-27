import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// };

export const AccountProfile = (props) => {
  const { user } = props;

  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={userData?.avatar || "/static/images/avatars/avatar_1.png"}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {`${userData?.firstname || "---"} ${userData?.lastname || "---"}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userData?.email || "Утга байхгүй."}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Төлөв: {userData?.active ? "Active" : "Deactive"}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
    </Card>
  );
};
