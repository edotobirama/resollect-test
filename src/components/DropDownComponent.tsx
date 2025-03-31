import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Ensures dropdown is on a new line */
  gap: 10px;
  margin-top: 20px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const DropdownComponent: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <Container>
      <StyledLabel>Select an Option:</StyledLabel>
      <StyledSelect value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
        <option value="" disabled>Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </StyledSelect>
    </Container>
  );
};

export default DropdownComponent;
