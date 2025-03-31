import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { signInWithGoogle, logout } from "../services/authService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const nav = useNavigate();
  const handleLogin = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
      nav('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width:100%;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top: 60px; /* To accommodate the fixed top navbar */
`;

  return (
    <LoginContainer>
      {user ? (
        <div>
          <Typography variant="h6">Welcome, {user.displayName}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (<>
          <img src="../../logo.png"/>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Sign in with Google
          </Button>
          </>
      )}
    </LoginContainer>
  );
};

export default Login;
