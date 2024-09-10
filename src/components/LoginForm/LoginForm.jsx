import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "user@example.com", password: "123456" })
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== data.email) {
      setError("email", {
        type: "manual",
        message: "E-mail não encontrado",
      });
      return;
    }

    if (storedUser.password !== data.password) {
      setError("password", {
        type: "manual",
        message: "Senha incorreta",
      });
      return;
    }

    onLogin(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <label>E-mail:</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" },
          })}
          className="input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "Senha é obrigatória" })}
          className="input"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <button type="submit" className="button">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
