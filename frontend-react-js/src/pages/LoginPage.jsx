import './LoginPage.css'
import IntroPhoto from '../assets/introPhoto.jpg'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useContext } from 'react';
import { Context } from '../context/UserContext/Context';
import {url} from '../utilis.jsx'
function LoginPage() {
  const {user, dispatch} = useContext(Context);
 
  const navigate= useNavigate();
   const schema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().required()
   });
   const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(schema)})
   const onSubmit = (data) => {
    Axios.post(`${url}/auth/login`,data)
    .then(({data}) => {
      if(data.token){
        dispatch({type:"LOGIN_SUCCESS", payload:data})
        navigate("/adminpage")
      }
    })
    .catch(({response}) =>{
      alert(response.data.error)
    })
  }
  return (
    <>
    <div id='LoginContainer'>
        <div id='Log'>
    <form id='LoginForm' onSubmit={handleSubmit(onSubmit)}>
        <label> Email: </label><input type='text' placeholder='Enter your email' {...register('Email')}/> 
        <p>{errors.Email?.message}</p>
        < br />
        <label> Password: </label><input type='password' placeholder='Enter your password' {...register('Password')}/>
        <p>{errors.Password?.message}</p>
        <br />
        <button type='submit'>Login</button>
    </form>
    <Link id='SignUpLink'to='/register'>SignUp here</Link>
    </div>
    <div id='RightLoginImg'>
            <img src={IntroPhoto} alt="" />
    </div>
    </div>
    </>
  )
}
export default LoginPage;