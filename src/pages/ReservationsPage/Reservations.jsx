import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function Reservations() {
  const [reservations, setReservations] = useState([])
  const [tours, setTours] = useState([])
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const sessionData = JSON.parse(localStorage.getItem('session'))
      if (!sessionData || sessionData.role !== 'Turista') {
        alert(
          'Você precisa ser um turista autenticado para acessar suas reservas.'
        )
        navigate('/login')
        return
      }
      setSession(sessionData)

      const storedReservations =
        JSON.parse(localStorage.getItem('reservations')) || []
      const userReservations = storedReservations.filter(
        reservation => reservation.touristEmail === sessionData.email
      )
      setReservations(userReservations)

      const storedTours = JSON.parse(localStorage.getItem('tours')) || []
      setTours(storedTours)
    } catch (error) {
      console.error('Error parsing data from localStorage', error)
    }
  }, [navigate])

  const handleCancelReservation = id => {
    const confirmation = window.confirm(
      'Tem certeza que deseja cancelar a reserva?'
    )
    if (!confirmation) return

    const updatedReservations = reservations.filter(
      reservation => reservation.id !== id
    )
    setReservations(updatedReservations)

    const storedReservations =
      JSON.parse(localStorage.getItem('reservations')) || []
    const updatedStoredReservations = storedReservations.filter(
      reservation => reservation.id !== id
    )
    localStorage.setItem(
      'reservations',
      JSON.stringify(updatedStoredReservations)
    )

    alert('Reserva cancelada com sucesso!')
  }

  if (reservations.length === 0) {
    return <div>Você ainda não tem reservas.</div>
  }

  const getTourDetails = tourId => {
    const tour = tours.find(tour => tour.id === tourId)
    if (!tour) {
      return {
        name: 'Passeio não encontrado',
        location: 'Local não disponível',
        date: null,
      }
    }
    return tour
  }

  const formatDate = dateString => {
    const utcDate = new Date(dateString)
    return utcDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  return (
    <div>
      <h2>Suas Reservas</h2>
      <ul>
        {reservations.map(reservation => {
          const tour = getTourDetails(reservation.tourId)

          return (
            <li key={reservation.id} className="reservation-item">
              <h3>{tour.name}</h3>
              <p>
                <strong>Local:</strong> {tour.location}
              </p>
              <p>
                <strong>Data:</strong>{' '}
                {tour.date ? formatDate(tour.date) : 'Data não disponível'}
              </p>
              <p>
                <strong>Status:</strong> {reservation.status}
              </p>
              {reservation.status === 'Ativa' && (
                <button
                  type="submit"
                  onClick={() => handleCancelReservation(reservation.id)}
                >
                  Cancelar Reserva
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Reservations
