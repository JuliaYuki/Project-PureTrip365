import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'

import { MdReviews } from 'react-icons/md'
import './Dashboard.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Dashboard = () => {
  const navigate = useNavigate()

  const [toursCount, setToursCount] = useState(0)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [tours, setTours] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const tours = JSON.parse(localStorage.getItem('tours')) || []
    const reviews = JSON.parse(localStorage.getItem('reviews')) || []

    setToursCount(tours.length)
    setReviewsCount(reviews.length)
    setTours(tours)
  }, [])

  const indexOfLastTour = currentPage * itemsPerPage
  const indexOfFirstTour = indexOfLastTour - itemsPerPage
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tours.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <h1>Dashboard</h1>

        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/passeios')}>
            <h3>Passeios Disponíveis</h3>
            <div className="card-info">
              <p>{toursCount}</p>
              <FaUsers className="icon" />
            </div>
          </div>
          <div className="card" onClick={() => navigate('/avaliacoes')}>
            <h3>Avaliações</h3>
            <div className="card-info">
              <p>{reviewsCount}</p>
              <MdReviews className="icon" />
            </div>
          </div>
        </div>

        <section className="locations">
          <h2>Locais</h2>
          <p>Listagem das localidades cadastradas</p>
          <table className="locations-table">
            <thead>
              <tr>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              {currentTours.map((tour, index) => (
                <tr key={index}>
                  <td
                    className="td-green"
                    onClick={() => navigate(`/avaliacoes/${tour.id}`)}
                  >
                    {tour.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {pageNumbers.map(number => (
              <span
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {' '}
                {number}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
