import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './TourList.css'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import Sidebar from '../../components/Sidebar/Sidebar'
import './TourList.css'

export default function TourList() {
  const [tours, setTours] = useState([])
  const [session, setSession] = useState(null)
  const [locationFilter, setLocationFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [isDate, setIsDate] = useState(false)
  const [filteredTours, setFilteredTours] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('session'))
    if (!sessionData) {
      alert('Você precisa estar logado para acessar esta página.')
      navigate('/login')
      return
    }

    if (
      sessionData.role !== 'Turista' &&
      sessionData.role !== 'Guia Turístico'
    ) {
      alert('Acesso restrito a Turistas e Guias Turísticos.')
      navigate('/login')
      return
    }

    setSession(sessionData)

    const storedTours = JSON.parse(localStorage.getItem('tours')) || []
    const adjustedTours = storedTours.map(tour => ({
      ...tour,
      date: new Date(tour.date).toISOString(),
    }))

    setTours(storedTours)
    setFilteredTours(adjustedTours)
  }, [navigate])

  const handleReserve = tourId => {
    const sessionData = JSON.parse(localStorage.getItem('session'))
    if (!sessionData || sessionData.role !== 'Turista') {
      alert('Apenas turistas autenticados podem fazer reservas.')
      return
    }

    const storedTours = JSON.parse(localStorage.getItem('tours')) || []
    const tour = storedTours.find(tour => tour.id === tourId)

    if (!tour) {
      alert('Passeio não encontrado.')
      return
    }

    const storedReservations =
      JSON.parse(localStorage.getItem('reservations')) || []

    const alreadyReserved = storedReservations.some(
      reservation =>
        reservation.tourId === tourId &&
        reservation.touristEmail === sessionData.email
    )

    if (alreadyReserved) {
      alert('Você já reservou este passeio.')
      return
    }

    const newReservation = {
      id: Date.now(),
      tourId: tourId,
      touristEmail: sessionData.email,
      tourName: tour.name,
      location: tour.location,
      date: tour.date,
      status: 'Ativa',
    }

    storedReservations.push(newReservation)
    localStorage.setItem('reservations', JSON.stringify(storedReservations))

    alert('Reserva realizada com sucesso!')
  }

  useEffect(() => {
    let filtered = tours
    if (locationFilter) {
      filtered = filtered.filter(tour =>
        tour.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    if (dateFilter) {
      filtered = filtered.filter(tour => {
        const tourDate = new Date(tour.date).toISOString().split('T')[0]
        return tourDate === dateFilter
      })
    }

    setFilteredTours(filtered)
  }, [locationFilter, dateFilter, tours])

  const formatDateForDisplay = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="tour-content">
          <Link className="link" to="/dashboard">
            <MdOutlineKeyboardArrowLeft /> Voltar
          </Link>
          <h2>Lista de Passeios Disponíveis</h2>

          <div className="filters">
            <input
              type="text"
              placeholder="Filtrar por local"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            />
            <input
              className="filters-date"
              type="{isDate ? 'date' : 'text'}"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              onFocus={e => {
                setIsDate(true)
                e.target.type = 'date'
              }}
              onBlur={e => {
                if (!e.target.value) {
                  setIsDate(false)
                  e.target.type = 'text'
                }
              }}
              placeholder="Filtrar por data"
            />
          </div>
          <div className="tour-form">
            {tours.length === 0 ? (
              <p>Nenhum passeio disponível</p>
            ) : (
              <ul>
                {filteredTours.map(tour => (
                  <li key={tour.id} className="form-item">
                    <h3>{tour.name}</h3>
                    <div className="form-text">
                      <p>Local: {tour.location}</p>
                      <p>Descrição: {tour.description || 'Sem descrição'}</p>
                      <p>Preço: R$ {tour.price}</p>
                      <p>Data: {formatDateForDisplay(tour.date)}</p>
                    </div>

                    {session.role === 'Turista' && (
                      <button
                        type="submit"
                        onClick={() => handleReserve(tour.id)}
                      >
                        Reservar Passeio
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
