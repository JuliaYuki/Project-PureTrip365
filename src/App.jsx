import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardGuide from "./pages/DashboardGuidePage/DashboardGuide";
import PrivateGuideRoute from "./components/PrivateGuideRoute/PrivateGuideRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Logout from "./components/Logout/Logout";

function Navbar() {
  const session = JSON.parse(localStorage.getItem("session"));
  const location = useLocation();

  return (
    <nav>
      <ul>
        {session && location.pathname !== "/register" && (
          <li>
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        )}

        {!session && location.pathname !== "/login" && (
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        )}

        {!session &&
          location.pathname !== "/register" &&
          location.pathname !== "/dashboard" && (
            <li>
              <Link className="link" to="/register">
                Cadastro
              </Link>
            </li>
          )}

        {session && location.pathname === "/dashboard" && (
          <li>
            <Logout />
          </li>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard-guide"
          element={
            <PrivateGuideRoute>
              <DashboardGuide />
            </PrivateGuideRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <h2>Bem-vindo ao Dashboard!</h2>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
