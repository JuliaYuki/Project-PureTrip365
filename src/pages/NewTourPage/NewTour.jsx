import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './NewTour.css'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

export default function NewTour() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = data => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (!session || session.role !== 'Guia Turístico') {
      alert('Acesso negado! Apenas guias turíricos podem cadastrar passeios.')
      return
    }

    const tours = JSON.parse(localStorage.getItem('tours')) || []

    const existingTour = tours.find(
      tour => tour.guideEmail === session.email && tour.name === data.name
    )
    if (existingTour) {
      setError('name', {
        type: 'manual',
        message: 'Nome do passeio já cadastrado.',
      })
      return
    }

    const tourDateUTC = new Date(data.date).toISOString()

    const newTour = {
      id: uuidv4(),
      guideEmail: session.email,
      guideName: session.name,
      name: data.name,
      location: data.location,
      description: data.description || '',
      price: data.price,
      date: tourDateUTC,
    }

    tours.push(newTour)
    localStorage.setItem('tours', JSON.stringify(tours))

    alert('Passeio cadastrado com sucesso!')
    reset()
    navigate('/dashboard-guide')
  }

  return (
    <div className="newTour-content">
      <Link className="link" to="/dashboard-guide">
        <MdOutlineKeyboardArrowLeft /> Voltar
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-name">
          <label htmlFor="name">Nome do Passeio:</label>
          <input
            type="text"
            {...register('name', {
              required: 'Campo obrigatório',
              maxLength: { value: 100, message: 'Máximo de 100 caracteres' },
            })}
            className="input"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-location">
          <label htmlFor="location">Digite o local do passeio:</label>
          <input
            type="text"
            {...register('location', {
              required: 'Campo obrigatório',
            })}
            className="input"
          />
          {errors.location && (
            <span className="error">{errors.location.message}</span>
          )}
        </div>

        <div className="form-description">
          <label htmlFor="description">Descrição (opcional):</label>
          <textarea
            id="description"
            {...register('description', {
              maxLength: { value: 500, message: 'Máximo de 500 caracteres' },
            })}
            className="input"
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-price">
          <label htmlFor="price">Preço (R$):</label>
          <input
            type="number"
            {...register('price', {
              required: 'Campo obrigatório',
            })}
            className="input"
          />
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
        </div>

        <div className="form-date">
          <label htmlFor="date">Data do Passeio:</label>
          <input
            type="date"
            {...register('date', {
              required: 'Campo obrigatório',
            })}
            className="input"
          />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </div>
        <button type="submit" className="button">
          Cadastrar Passeio
        </button>
      </form>
    </div>
  )
}
