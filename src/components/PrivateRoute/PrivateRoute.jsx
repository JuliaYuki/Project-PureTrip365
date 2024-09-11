import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
}
