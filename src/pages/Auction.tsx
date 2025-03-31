import React from "react";
import { Typography, Container } from "@mui/material";

const Auction: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Auction</Typography>
      <Typography>Manage auctions for loan assets here.</Typography>
    </Container>
  );
};

export default Auction;