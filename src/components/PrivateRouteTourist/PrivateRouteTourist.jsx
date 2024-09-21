import { Navigate } from 'react-router-dom'

function PrivateRouteTourist({ children }) {
  const session = JSON.parse(localStorage.getItem('session'))

  if (!session || session.role !== 'Turista') {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRouteTourist
