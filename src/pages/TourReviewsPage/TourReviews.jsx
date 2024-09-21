import { useEffect, useState, useMemo } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../../components/Sidebar/Sidebar'
import './TourReviews.css'

export default function TourReviews() {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) // For better UX
  const navigate = useNavigate()

  const session = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('session'))
    } catch (error) {
      console.error('Erro ao carregar sessão:', error)
      return null
    }
  }, [])

  const getLocalStorageData = key => {
    try {
      return JSON.parse(localStorage.getItem(key)) || []
    } catch (error) {
      console.error(`Erro ao carregar ${key}:`, error)
      return []
    }
  }

  useEffect(() => {
    try {
      const storedTours = getLocalStorageData('tours')
      const foundTour = storedTours.find(t => t.id === id)

      if (!foundTour) {
        alert('Passeio não encontrado.')
        navigate('/passeios')
        return
      }

      setTour(foundTour)

      const storedReviews = getLocalStorageData('reviews')
      const tourReviews = storedReviews.filter(review => review.tourId === id)
      setReviews(tourReviews)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }, [id, navigate])

  const handleSubmitReview = () => {
    if (!rating) {
      setErrorMessage('Por favor, forneça uma nota válida (0 a 5).')
      return
    }

    if (!comment) {
      setErrorMessage('Por favor, forneça um comentário.')
      return
    }

    const storedReservations = getLocalStorageData('reservations')
    const hasParticipated = storedReservations.some(
      reservation =>
        reservation.touristEmail === session?.email && reservation.tourId === id
    )

    if (!hasParticipated) {
      setErrorMessage(
        'Apenas turistas que participaram do passeio podem avaliá-lo.'
      )
      return
    }

    const storedReviews = getLocalStorageData('reviews')
    const newReview = {
      id: uuidv4(),
      tourId: tour.id,
      userName: session.name,
      touristEmail: session.email,
      rating,
      comment,
    }

    storedReviews.push(newReview)
    localStorage.setItem('reviews', JSON.stringify(storedReviews))
    setReviews(prevReviews => [...prevReviews, newReview])

    setRating(0)
    setComment('')
    setErrorMessage(null)
    alert('Avaliação enviada com sucesso!')
  }

  if (!tour) {
    return <div>Carregando avaliações...</div>
  }

  const hasAlreadyReviews = reviews.some(
    review => review.touristEmail === session?.email && review.tourId === id
  )

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="review-content">
        <Link className="link" to="/dashboard">
          <MdOutlineKeyboardArrowLeft /> Voltar
        </Link>
        <h2>Avaliações do Passeio: {tour.name}</h2>

        <div className="reviews">
          <h3>Avaliações</h3>
          <div className="reviews-items">
            {reviews.length === 0 ? (
              <p>Não há avaliações para este passeio.</p>
            ) : (
              <ul>
                {reviews.map(review => (
                  <li key={review.id} className="reviews-item">
                    <p>
                      <strong>Nota:</strong> {review.rating}
                    </p>
                    <p>
                      <strong>Comentário:</strong> {review.comment}
                    </p>
                    <p>
                      <strong>Autor:</strong> {review.touristEmail}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {session ? (
          <div>
            <h3>Deixe sua avaliação</h3>
            {errorMessage && <p className="error">{errorMessage}</p>}{' '}
            {/* Error message */}
            {hasAlreadyReviews ? (
              <p>Você já avaliou este passeio.</p>
            ) : (
              <div>
                <label>
                  Nota (0 a 5):
                  <input
                    type="number"
                    value={rating}
                    onChange={e =>
                      setRating(
                        Math.max(0, Math.min(5, Number(e.target.value)))
                      )
                    }
                    min="0"
                    max="5"
                  />
                </label>
                <label>
                  Comentário:
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  onClick={handleSubmitReview}
                  disabled={!session}
                >
                  Enviar Avaliação
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>
            <strong>Faça login</strong> para deixar sua avaliação.
          </p>
        )}
      </div>
    </div>
  )
}
