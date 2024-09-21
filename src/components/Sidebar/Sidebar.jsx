import { FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { MdReviews, MdSpaceDashboard } from 'react-icons/md'
import logoBranca from '../../assets/logo-branca.svg'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const [userRole, setUserRole] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session) {
      setUserRole(session.role)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('session')
    navigate('/login')
  }
  return (
    <aside className="sidebar">
      <div className="sidebar-list">
        <img src={logoBranca} className="sidebar-logo" />
        <ul>
          {userRole === 'Guia Turístico' && (
            <li onClick={() => navigate('/dashboard-guide')}>
              <MdSpaceDashboard /> Dashboard Guia
            </li>
          )}
          <li onClick={() => navigate('/dashboard')}>
            <FaHouse /> Dashboard
          </li>
          <li onClick={() => navigate('/passeios')}>
            <FaMapMarkerAlt /> Locais
          </li>
          <li onClick={() => navigate('/avaliacoes')}>
            <MdReviews /> Avaliações
          </li>
          <li onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Sair
          </li>
        </ul>
      </div>
    </aside>
  )
}
