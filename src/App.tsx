import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Auction from "./pages/Auction";
import Login from './components/Login';
import Layout from "./components/Layout";
import { CssBaseline, Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Container>
            <Routes>
                {/* Public Route - Login */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes inside Layout */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="auction" element={<Auction />} />
                    {/*<Route path="notifications" element={<Notifications />} />*/}
                  </Route>
                </Route>

            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
