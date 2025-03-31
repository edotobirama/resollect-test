import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import DropdownComponent from "./DropDownComponent";

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f8f9fa;
  position: fixed;
  left: 0;
  top: 60px;
  padding-top: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: ${({ active }) => (active ? "#1976d2" : "#333")};
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background-color: ${({ active }) => (active ? "#e3f2fd" : "transparent")};
  transition: background 0.3s, color 0.3s;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const SidebarButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: ${({ active }) => (active ? "#1976d2" : "#333")};
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background-color: ${({ active }) => (active ? "#e3f2fd" : "transparent")};
  transition: background 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const Drawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? "0" : "-320px")};
  top: 60px;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: right 0.3s ease-in-out;
  z-index: 1100; /* Ensure Drawer is on top of everything */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 4px rgba(25, 118, 210, 0.3);
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #155a9e;
  }

  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;

const SideNavbar: React.FC = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks || !file) {
      alert("Please fill in all fields!");
      return;
    }

    // Handle form submission logic (e.g., send data to backend)
    console.log("Submitted Data:", { remarks, file });

    // Clear the form
    setRemarks("");
    setFile(null);

    // Reset file input manually
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };
  return (
    <>
      <SidebarContainer>
        <SidebarItem to="/" active={location.pathname === "/"}>
          Dashboard
        </SidebarItem>
        <SidebarItem to="/portfolio" active={location.pathname === "/portfolio"}>
          Portfolio
        </SidebarItem>
        <SidebarItem to="/auction" active={location.pathname === "/auction"}>
          Auction
        </SidebarItem>

        {/* Data Upload Button (Triggers Drawer) */}
        <SidebarButton
          active={isDrawerOpen}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          Data Upload
        </SidebarButton>
      </SidebarContainer>

      {/* Collapsible Drawer */}
      <Drawer isOpen={isDrawerOpen}>
        <CloseButton onClick={() => setIsDrawerOpen(false)}>&times;</CloseButton>
        <h3>Upload Document</h3>
        <label>Document Name</label>
        <DropdownComponent/>
        <label>
          Document Type</label>
        <DropdownComponent/>
        <StyledLabel>Document Remarks</StyledLabel>
        <StyledInput  type="text"
        placeholder="Type your remarks here..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)} />

        <StyledLabel>Select File</StyledLabel>
        <FileInputWrapper>
          <FileInput  id="fileInput"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}/>
        </FileInputWrapper>

        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </Drawer>
    </>
  );
};

export default SideNavbar;
