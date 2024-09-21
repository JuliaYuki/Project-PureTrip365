import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import './ReviewsPage.css'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || []
    const storedTours = JSON.parse(localStorage.getItem('tours')) || []

    const reviewsWithTourNames = storedReviews.map(review => {
      const tour = storedTours.find(t => t.id === review.tourId)
      return {
        ...review,
        tourName: tour ? tour.name : 'Passeio desconhecido',
      }
    })

    setReviews(reviewsWithTourNames)
  }, [])

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="review-content">
        <Link className="link" to="/dashboard">
          <MdOutlineKeyboardArrowLeft /> Voltar
        </Link>
        <h2>Avaliações</h2>
        <div className="review-items">
          <ul>
            {reviews.map((review, index) => (
              <li className="review-item" key={index}>
                <h4>{review.tourName}</h4>
                <p>
                  <strong>Comentário de:</strong> {review.userName}
                </p>
                <p>
                  <strong>Nota:</strong> {review.rating}/5
                </p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage
