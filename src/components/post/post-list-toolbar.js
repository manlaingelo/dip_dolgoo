import { useState, useRef } from "react";

import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Slider,
  Button,
  Stack,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = ["Сонгино хайрхан", "Чингэлтэй", "Баянгол", "Сүхбаатар", "Баянзүрх", "Хан-уул"];

function valuetext(value) {
  return `${value}°₮`;
}

export const PostListToolbar = (props) => {
  const [area, setArea] = useState([20, 40]);
  const [price, setPrice] = useState([20, 40]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleAreaChange = (event, newValue) => {
    setArea(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleSearch = () => {
    // console.log(area, price);
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
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
          Зарууд
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <h4 className="font-thin">
                ҮНЭ{" "}
                <strong>
                  <span id="sale_price_min">{price[0]}</span> -{" "}
                  <span id="sale_price_max">{price[1]}</span>
                </strong>{" "}
                <small>сая ₮</small>
              </h4>
              <Slider
                getAriaLabel={() => "Price range"}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <h4 className="font-thin">
                ТАЛБАЙ{" "}
                <strong>
                  <span id="sale_area_min">{area[0]}</span> -{" "}
                  <span id="sale_area_max">{area[1]}</span>
                </strong>{" "}
                <small>
                  м<sup>2</sup>
                </small>
              </h4>
              <Slider
                getAriaLabel={() => "Area range"}
                value={area}
                onChange={handleAreaChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <h4 className="font-thin">Байршил </h4>
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
                sx={{ my: 2 }}
              >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select location"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                sx={{ backgroundColor: "#ebebeb" }}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" sx={{ zIndex: "tooltip" }} style={{zIndex: '100'}} autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                              sx={{zIndex: 'tooltip'}}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Stack alignItems="flex-start">
                <Button onClick={handleSearch}>Хайх</Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
