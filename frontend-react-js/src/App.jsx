import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ProfilePage from './pages/ProfilePage'

import { useContext } from 'react'
import { Context } from './context/UserContext/Context'
 



function App() {
  const {user} = useContext(Context)
  
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/adminpage' element={user ? <AdminPage/> : <HomePage />} />
        <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} />
        <Route path='/userpage' element={<UserPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        {/* <Route path='/userpage/:id' element={<UserPage />} /> */}
      </Routes> 
    <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default App
