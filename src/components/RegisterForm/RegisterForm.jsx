import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.css'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = data => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(user => user.email === data.email)

    if (existingUser) {
      setError('email', {
        type: 'manual',
        message: 'E-mail já cadastrado',
      })
      return
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Usuário cadastrado com sucesso!')

    navigate('/login')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register('name', { required: 'Nome completo obrigatório' })}
            className="input"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'E-mail obrigatório',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Formato de e-mail inválido',
              },
            })}
            className="input"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register('password', {
              required: 'Senha obrigatória',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  'A senha deve conter no mínimo 8 caracteres, incluindo letras e números.',
              },
            })}
            className="input"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="role">Tipo de Usuário</label>
          <select
            {...register('role', { required: 'Selecione o tipo de usuário' })}
            className="input"
          >
            <option value={''}>Selecione o tipo de usuário</option>
            <option value={'Guia Turístico'}>Guia Turístico</option>
            <option value={'Turista'}>Turista</option>
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>}
        </div>
      </div>
      <div className="cadastro-btn">
        <button type="submit" className="r-button">
          Cadastrar
        </button>
      </div>

      <p className="login-link">
        Já possui conta? <a href="/login">Faça seu login.</a>
      </p>
    </form>
  )
}
