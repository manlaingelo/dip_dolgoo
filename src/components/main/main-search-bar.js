import { useState, useRef } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Stack,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const options = ["Сонгино хайрхан", "Чингэлтэй", "Баянгол", "Сүхбаатар", "Баянзүрх", "Хан-уул"];

function valuetext(value) {
  return `${value}°₮`;
}

const MainSearchBar = (props) => {
  const { getSearchValues } = props;
  const [area, setArea] = useState([20, 100]);
  const [price, setPrice] = useState([20, 140]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleAreaChange = (event, newValue) => {
    setArea(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleSearch = () => {
    getSearchValues(area, price, options[selectedIndex], searchValue);
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
    <Box sx={{ marginTop: "1.5rem" }}>
      {/* <SearchIcon /> */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
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
            max={999}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <h4 className="font-thin">
            ТАЛБАЙ{" "}
            <strong>
              <span id="sale_area_min">{area[0]}</span> - <span id="sale_area_max">{area[1]}</span>
            </strong>{" "}
            <small>
              м<sup>2</sup>
            </small>
          </h4>
          <Slider
            getAriaLabel={() => "Area range"}
            max={999}
            value={area}
            onChange={handleAreaChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Хайх..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
            sx={{ width: "100%" }}
          >
            <Button sx={{ width: "100%" }} onClick={handleClick}>
              {options[selectedIndex]}
            </Button>
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
            style={{ zIndex: "999" }}
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
                    <MenuList id="split-button-menu" sx={{ zIndex: "tooltip" }} autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          sx={{ zIndex: "tooltip" }}
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack alignItems="flex-end">
            <Button variant="contained" onClick={handleSearch} sx={{ marginRight: 0 }}>
              Хайх
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSearchBar;
