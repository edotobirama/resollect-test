import React from "react";
import { Typography, Container } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Typography>The page you are looking for does not exist.</Typography>
    </Container>
  );
};

export default NotFound;
