import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export default function TourDetail() {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('session'))
    if (!sessionData) {
      alert('Você precisa estar logado para acessar esta página.')
      navigate('/login')
      return
    }
    setSession(sessionData)

    const storedTours = JSON.parse(localStorage.getItem('tours')) || []
    const foundTour = storedTours.find(t => t.id === id)

    if (!foundTour) {
      alert('Passeio não encontrado.')
      navigate('/passeios')
      return
    }

    setTour(foundTour)
  }, [id, navigate])

  const handleReserve = () => {
    if (!session || session.role !== 'Turista') {
      alert('Somente turistas podem realizar reservas.')
      return
    }

    const storedReservations =
      JSON.parse(localStorage.getItem('reservations')) || []

    const newReservation = {
      id: uuidv4(),
      touristEmail: session.email,
      tourId: id,
      tourName: tour.name,
      location: tour.location,
      date: tour.date,
      status: 'Ativa',
    }

    storedReservations.push(newReservation)
    localStorage.setItem('reservations', JSON.stringify(storedReservations))

    alert(`Reserva realizada com sucesso para o passeio: ${tour.name}`)
  }

  const handleEdit = () => {
    if (!session || session.email !== tour.guideEmail) {
      alert('Apenas o guia que cadastrou o passeio pode editá-lo.')
      return
    }

    navigate(`/passeio/editar/${id}`)
  }

  const handleDelete = () => {
    if (!session || session.email !== tour.guideEmail) {
      alert('Apenas o guia que cadastrou o passeio pode excluí-lo.')
      return
    }

    const storedTours = JSON.parse(localStorage.getItem('tours')) || []
    const updatedTours = storedTours.filter(t => t.id !== id)
    localStorage.setItem('tours', JSON.stringify(updatedTours))
    alert('Passeio excluído com sucesso!')
    navigate('/dashboard-guide')
  }

  if (!tour || !session) {
    return <div>Carregando detalhes do passeio...</div>
  }

  return (
    <div>
      <h2>{tour.name}</h2>
      <p>
        <strong>Local:</strong> {tour.location}
      </p>
      <p>
        <strong>Descrição:</strong>{' '}
        {tour.description || 'Nenhuma descrição fornecida.'}
      </p>
      <p>
        <strong>Preço:</strong> R$ {tour.price}
      </p>
      <p>
        <strong>Data:</strong> {new Date(tour.date).toLocaleDateString()}
      </p>

      {session.role === 'Turista' && (
        <button type="submit" onClick={handleReserve}>
          Reservar Passeio
        </button>
      )}

      {session.email === tour.guideEmail && (
        <>
          <button type="submit" onClick={handleEdit}>
            Editar Passeio
          </button>
          <button type="submit" onClick={handleDelete}>
            Excluir Passeio
          </button>
        </>
      )}
    </div>
  )
}
