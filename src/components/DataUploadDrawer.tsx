import React from "react";
import { Drawer, Button, IconButton, TextField, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const DrawerContainer = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface DataUploadDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DataUploadDrawer: React.FC<DataUploadDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "400px",
          padding: "20px",
          background: "#fff",
          boxShadow: "-5px 0px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DrawerContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <h3>Upload Document</h3>

        <TextField select label="Document Name" fullWidth>
          <MenuItem value="doc1">Document 1</MenuItem>
          <MenuItem value="doc2">Document 2</MenuItem>
        </TextField>

        <TextField select label="Document Type" fullWidth>
          <MenuItem value="pdf">PDF</MenuItem>
          <MenuItem value="word">Word</MenuItem>
        </TextField>

        <TextField label="Document Remarks" fullWidth multiline rows={2} />

        <input type="file" />

        <Button variant="contained" color="primary">
          Submit
        </Button>
      </DrawerContainer>
    </Drawer>
  );
};

export default DataUploadDrawer;
