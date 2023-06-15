import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import Dashboard from './components/Dashboard'
import UserPage from './pages/UserPage'
import UserLoginPage from './pages/UserLoginPage'
import UserSignUpPage from './pages/UserSignUpPage'

 



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
        <Route path='/adminpage' element={<AdminPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='*' element={<h1>404</h1>} />
        <Route path='/userpage' element={<UserPage />} />
        {/* <Route path='/userpage/:id' element={<UserPage />} /> */}
        <Route path='userloginpage' element={<UserLoginPage />} />
        <Route path='/usersignuppage' element={<UserSignUpPage />} />
      </Routes> 
    <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default App
