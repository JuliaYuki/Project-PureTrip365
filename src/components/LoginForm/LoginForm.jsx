import { useEffect, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [isRegistering, setIsRegistering] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [sucess, setSucess] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/register") {
			setIsRegistering(true);
		} else {
			setIsRegistering(false);
		}
	}, [location.pathname]);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:3000/users?email=${email}&password=${password}`,
			);
			if (response.data.length > 0) {
				console.log("Login successful:", response.data);
				setSucess("Login successful!");
				setError("");
				navigate("/");
			} else {
				setError("Email ou senha inválidos.");
				setSucess("");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("Falha ao logar.");
			setSucess("");
		}
	};

	const handleRegister = async (event) => {
		event.preventDefault();
		const user = { name, email, password };

		try {
			const response = await axios.post("http://localhost:3000/users", user);
			console.log("User registered:", response.data);
			setSucess("Registration successful!");
			setName("");
			setEmail("");
			setPassword("");
			setError("");
			navigate("/login");
		} catch (error) {
			console.error("Registration error:", error);
			setError("Failed to register.");
			setSucess("");
		}
	};

	const toggleForm = () => {
		if (isRegistering) {
			navigate("/login");
		} else {
			navigate("/register");
		}
	};

	return (
		<div>
			{!isRegistering ? (
				<>
					<form onSubmit={handleLogin}>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email"
							required
						/>
						<label htmlFor="password">Senha:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha"
							required
						/>
						<button type="submit">Entrar</button>
					</form>
					<button onClick={toggleForm} type="button">
						Cadastrar
					</button>
				</>
			) : (
				<>
					<form onSubmit={handleRegister}>
						<label htmlFor="name">Nome:</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Digite seu nome"
							required
						/>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email"
							required
						/>
						<label htmlFor="password">Senha</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha"
							required
						/>
						<button type="submit">Cadastrar</button>
					</form>
					<button onClick={toggleForm} type="button">
						Login
					</button>
				</>
			)}

			{sucess && <p style={{ color: "green" }}>{sucess}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
