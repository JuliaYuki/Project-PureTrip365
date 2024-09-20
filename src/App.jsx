import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import DashboardGuide from './pages/DashboardGuidePage/DashboardGuide'
import PrivateGuideRoute from './components/PrivateGuideRoute/PrivateGuideRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import NewTour from './pages/NewTourPage/NewTour'
import TourList from './pages/TourListPage/TourList'
import TourDetail from './pages/TourDetailPage/TourDetail'
import Reservations from './pages/ReservationsPage/Reservations'
import TourReviews from './pages/TourReviewsPage/TourReviews'
import EditTour from './pages/EditTourPage/EditTour'
import ReviewsPage from './pages/TourReviewsPage/ReviewsPage'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard-guide"
          element={
            <PrivateGuideRoute>
              <DashboardGuide />
            </PrivateGuideRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/passeio/novo"
          element={
            <PrivateGuideRoute>
              <NewTour />
            </PrivateGuideRoute>
          }
        />
        <Route
          path="/passeios"
          element={
            <PrivateRoute>
              <TourList />
            </PrivateRoute>
          }
        />
        <Route
          path="/passeios/:id"
          element={
            <PrivateRoute>
              <TourDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/passeio/editar/:id"
          element={
            <PrivateGuideRoute>
              <EditTour />
            </PrivateGuideRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <Reservations />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes/:id"
          element={
            <PrivateRoute>
              <TourReviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes"
          element={
            <PrivateRoute>
              <ReviewsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
