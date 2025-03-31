import React from "react";
import { Typography, Container } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Container >
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome to the Loan Portfolio Management System.</Typography>
    </Container>
  );
};

export default Dashboard;