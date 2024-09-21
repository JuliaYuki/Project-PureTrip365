import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './RegisterPage.css'

export default function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-left-content">
          <h2 className="register-header">Cadastre-se</h2>
          <RegisterForm />
        </div>
      </div>

      <div className="register-right"> </div>
    </div>
  )
}
