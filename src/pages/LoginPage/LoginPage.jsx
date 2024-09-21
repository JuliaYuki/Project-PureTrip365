import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

export default function LoginPage() {
  return (
    <div className="container">
      <div className="login-left"> </div>
      <div className="login-right">
        <div className="right-content">
          <h2 className="login-header">Efetue seu login</h2>
          <p className="login-subtext">
            Entre para Conquistar: Acesso ao Seu Novo Estilo de Vida Ativo!
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
