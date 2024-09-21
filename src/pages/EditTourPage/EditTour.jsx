import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './EditTour.css'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

export default function EditTour() {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [session, setSession] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    date: '',
  })
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
    setFormValues({
      name: foundTour.name,
      location: foundTour.location,
      description: foundTour.description,
      price: foundTour.price,
      date: new Date(foundTour.date).toISOString().split('T')[0], // Para preencher o campo de data corretamente
    })
  }, [id, navigate])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSave = () => {
    if (!session || session.email !== tour.guideEmail) {
      alert('Apenas o guia que cadastrou o passeio pode editá-lo.')
      return
    }

    const storedTours = JSON.parse(localStorage.getItem('tours')) || []
    const updatedTours = storedTours.map(t =>
      t.id === id
        ? { ...t, ...formValues, date: new Date(formValues.date).toISOString() }
        : t
    )

    localStorage.setItem('tours', JSON.stringify(updatedTours))
    alert('Passeio atualizado com sucesso!')
    navigate('/passeios')
  }

  if (!tour || !session) {
    return <div>Carregando detalhes do passeio...</div>
  }

  return (
    <div className="edit-form">
      <Link className="link" to="/dashboard-guide">
        <MdOutlineKeyboardArrowLeft /> Voltar
      </Link>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <h2>Editar Passeio</h2>
        <label htmlFor="name">Nome do Passeio</label>
        <input
          className="input"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <label htmlFor="location">Local</label>
        <input
          className="input"
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          className="input"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Preço</label>
        <input
          className="input"
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleInputChange}
        />
        <label htmlFor="date">Data</label>
        <input
          className="input"
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleInputChange}
        />
        <button className="button" type="button" onClick={handleSave}>
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
