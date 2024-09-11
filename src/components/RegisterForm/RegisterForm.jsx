import { useForm } from "react-hook-form";
import "./RegisterForm.css";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === data.email);

    if (existingUser) {
      setError("email", {
        type: "manual",
        message: "E-mail já cadastrado",
      });
      return;
    }

    users.push({ email: data.email, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuário cadastrado com sucesso!");

    reset();
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
              required: "E-mail obrigratório",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Formato de e-mail inválido",
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
            {...register("password", {
              required: "Senha obrigratória",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
            })}
            className="input"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="button">
          Cadastrar
        </button>
      </form>
    </>
  );
}
