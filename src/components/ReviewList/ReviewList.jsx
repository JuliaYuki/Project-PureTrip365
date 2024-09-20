export default function ReviewsList({ reviews }) {
  if (reviews.length === 0) {
    return <p>Não há avaliações para este passeio.</p>
  }

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
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
  )
}
