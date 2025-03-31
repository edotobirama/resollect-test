import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { Button,Menu,IconButton,MenuItem } from "@mui/material";
import { ExpandMore,ExpandLess } from "@mui/icons-material";
import { useState } from "react";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.img`
  height:40px;
`;

const UserProfile = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;

const UserName = styled.span`
font-weight: bold;
`;

const TopNavbar: React.FC = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const nav = useNavigate()
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    nav('/login');
    handleMenuClose();
  };

  return (
    <NavbarContainer>
      <Logo src="../../logo.png"/>
      <UserProfile>
        <img
          src={user?.photoURL || "https://via.placeholder.com/40"}
          alt="User"
          style={{ height:'36px',
            borderRadius: "50%" }}
        />
        <UserName>{user?.displayName || "Guest"}</UserName>
        {/* Right Side - Profile Menu */}
       {/* Right Side - Dropdown Menu */}
       <IconButton onClick={handleMenuOpen} color="inherit" size="small" sx={{ marginLeft: "8px" }}>
          {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          {/* ˄ when closed, ˅ when open */}
        </IconButton>

        {/* Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </UserProfile>
    </NavbarContainer>
  );
};

export default TopNavbar;
