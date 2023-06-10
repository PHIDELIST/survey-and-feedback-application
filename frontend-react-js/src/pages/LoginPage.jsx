import './LoginPage.css'
import IntroPhoto from '../assets/introPhoto.jpg'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
function LoginPage() {
   const schema = yup.object().shape({
    email: yup.string().email().required().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email is not valid'),
    password: yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number')
   });
   const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(schema)})
   const onSubmit = (data) => {console.log(data)}
  return (
    <>
    <div id='LoginContainer'>
        <div id='Log'>
    <form id='LoginForm' onSubmit={handleSubmit(onSubmit)}>
        <label> Email: </label><input type='text' placeholder='Enter your email' {...register('email')}/> 
        <p>{errors.email?.message}</p>
        < br />
        <label> Password: </label><input type='password' placeholder='Enter your password' {...register('password')}/>
        <p>{errors.password?.message}</p>
        <br />
        <button type='submit'>Login</button>
    </form>
    <Link to='/register'>SignUp here</Link>
    </div>
    <div id='RightLoginImg'>
            <img src={IntroPhoto} alt="" />
    </div>
    </div>
    </>
  )
}
export default LoginPage;