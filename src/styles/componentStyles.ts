import { styled } from "@mui/material/styles";
import { Paper, Button, TextField } from "@mui/material";

export const StyledPaper = styled(Paper)({
  padding: "20px",
  margin: "20px 0",
  borderRadius: "10px",
});

export const StyledButton = styled(Button)({
  textTransform: "none",
  padding: "10px 20px",
  borderRadius: "8px",
});

export const StyledTextField = styled(TextField)({
  marginBottom: "15px",
});
