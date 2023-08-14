import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const Header = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = sessionStorage.getItem("email");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    toast.success("Successfully Logout ", {
      theme: "colored",
    });
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box display="flex" flexDirection="row" sx={{ alignItems: "center" }}>
            <CalendarMonthIcon style={{ width: 40 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ alignContent: "center" }}
            >
              Calender - August - 2023
            </Typography>
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Logged User <span>:</span>{" "}
            <Typography style={{ marginLeft: 4 }}> {user}</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClose}
              color="inherit"
            >
              <LogoutIcon style={{ marginLeft: 4 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
