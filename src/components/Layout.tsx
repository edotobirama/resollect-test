import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";

const LayoutContainer = styled.div`
  justify-content:flex-start;
  height: 100vh;
  width: 100vw;
`;


const ContentWrapper = styled.div`
  flex: 1;
  margin-top: 60px;
  margin-left: 30px;
  padding: 20px;
  padding-left: 170px;
  background-color: #f1f3f5;
  height: calc(100vh - 60px); /* Adjust height considering TopNavbar */
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 1300px) { /* Fixed syntax */
    padding-left: 30px; /* Ensure this change is intentional */
  }
`;

const Layout: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <LayoutContainer>
        <SideNavbar />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </LayoutContainer>
    </>
  );
};

export default Layout;
