import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  const handleLogin = (email, password) => {
    console.log("email: ", email);
    console.log("password: ", password);
    alert("Login efetuado com sucesso!");
  };

  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </>
  );
}
