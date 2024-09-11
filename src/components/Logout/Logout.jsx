import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("session");

    navigate("/login");
  };

  return (
    <>
      <button onClick={handleLogout} className="button">
        Logout
      </button>
    </>
  );
}
