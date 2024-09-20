import { Navigate } from 'react-router-dom'

export default function PrivateGuideRoute({ children }) {
  const session = JSON.parse(localStorage.getItem('session'))

  if (!session || session.role !== 'Guia Turístico') {
    return <Navigate to="/login" />
  }

  return children
}
