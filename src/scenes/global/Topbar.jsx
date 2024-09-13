import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSignUp(false); // Reset to sign-in when closing
  };

  const handleSignIn = () => {
    // Here, you would handle sign-in logic
    console.log("User signed in");
    setIsLoggedIn(true);
    handleClose();
  };

  const handleSignOut = () => {
    // Handle sign-out logic
    console.log("User signed out");
    setIsLoggedIn(false);
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          {/* Person Icon with Popup Dialog */}
          <IconButton onClick={handleClickOpen}>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Authentication Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
        <DialogContent>
          {isSignUp ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
            </>
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <Button onClick={handleToggleSignUp}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={isSignUp ? handleSignIn : handleSignOut} color="primary">
            {isLoggedIn ? "Logout" : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Topbar;
