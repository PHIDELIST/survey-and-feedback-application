import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'



function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes> 
    <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default App
