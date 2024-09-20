import { useState } from 'react'

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (!rating || rating < 0 || rating > 5) {
      alert('Por favor, forneça uma nota válida (0 a 5).')
      return
    }

    if (!comment) {
      alert('Por favor, forneça um comentário.')
      return
    }

    onSubmit({ rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <div>
      <h3>Deixe sua avaliação</h3>
      <label>
        Nota (0 a 5):
        <input
          type="number"
          value={rating}
          onChange={e =>
            setRating(Math.max(0, Math.min(5, Number(e.target.value))))
          }
          min="0"
          max="5"
        />
      </label>
      <label>
        Comentário:
        <textarea value={comment} onChange={e => setComment(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Enviar Avaliação
      </button>
    </div>
  )
}
