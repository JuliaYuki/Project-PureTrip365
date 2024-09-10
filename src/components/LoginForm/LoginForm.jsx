import { useForm } from "react-hook-form";
import "./LoginForm.css";

export default function LoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: "E-mail inválido",
              },
            })}
            className="input"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
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
    </>
  );
}
