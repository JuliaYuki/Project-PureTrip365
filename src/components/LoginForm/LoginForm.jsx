import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'

function LoginForm({ onLogin }) {
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

    const user = users.find(
      user => user.email === data.email && user.password === data.password
    )

    if (!user) {
      setError('email', {
        type: 'manual',
        message: 'E-mail ou senha incorretos.',
      })
      return
    }

    localStorage.setItem(
      'session',
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    )

    if (user.role === 'Guia Turístico') {
      navigate('/dashboard-guide')
    } else {
      navigate('/dashboard')
    }

    if (onLogin) {
      onLogin(user.email, user.role)
    }

    reset()
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="email">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'E-mail é obrigatório',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Formato de e-mail inválido',
            },
          })}
          className="input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="password">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Senha é obrigatória' })}
          className="input"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <button type="submit" className="button">
        Entrar
      </button>
      <button type="submit" className="button color-g" onClick={handleRegister}>
        Cadastrar-se
      </button>
    </form>
  )
}

export default LoginForm
