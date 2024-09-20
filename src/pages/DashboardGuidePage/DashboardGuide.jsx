import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import './DashboardGuide.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const DashboardGuide = () => {
  const navigate = useNavigate()

  const [tours, setTours] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Página atual
  const itemsPerPage = 5 // Quantidade de itens por página

  useEffect(() => {
    // Fetching tours from localStorage
    const allTours = JSON.parse(localStorage.getItem('tours')) || []

    const session = JSON.parse(localStorage.getItem('session'))
    if (session) {
      // Filtrar tours cadastrados pelo guia logado
      const guideTours = allTours.filter(
        tour => tour.guideEmail === session.email
      )
      setTours(guideTours)
    }
  }, [])

  // Calcular o índice inicial e final para exibir os itens da página atual
  const indexOfLastTour = currentPage * itemsPerPage
  const indexOfFirstTour = indexOfLastTour - itemsPerPage
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour)

  // Função para trocar de página
  const paginate = pageNumber => setCurrentPage(pageNumber)

  // Número total de páginas
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tours.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleDelete = id => {
    // Função para excluir o local
    const updatedTours = tours.filter(tour => tour.id !== id)
    setTours(updatedTours)
    localStorage.setItem('tours', JSON.stringify(updatedTours))

    const reviews = JSON.parse(localStorage.getItem('reviews')) || []
    const updatedReviews = reviews.filter(review => review.tourId !== id)
    localStorage.setItem('reviews', JSON.stringify(updatedReviews))
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="content">
        <div className="content-header">
          <div className="content-texts">
            <h1>Locais</h1>
            <p className="content-subtext">
              Localidades de atividades cadastradas
            </p>
          </div>

          <button
            className="add-location-btn"
            onClick={() => navigate('/passeio/novo')}
          >
            Cadastrar local
          </button>
        </div>

        <table className="locations-table">
          <thead>
            <tr>
              <th>Local</th>
              <th>Guia Turístico</th> {/* Alterado para Guia Turístico */}
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {currentTours.map((tour, index) => (
              <tr key={index}>
                <td>{tour.name}</td>
                <td>{tour.guideName}</td>
                <td>
                  <div className="content-icons">
                    <FaEdit
                      onClick={() => navigate(`/passeio/editar/${tour.id}`)}
                    />
                    <FaTrashAlt onClick={() => handleDelete(tour.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Controles de Paginação */}
        <div className="pagination">
          {pageNumbers.map(number => (
            <span
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </span>
          ))}
        </div>
      </main>
    </div>
  )
}

export default DashboardGuide
