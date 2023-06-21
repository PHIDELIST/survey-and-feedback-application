import { useForm } from 'react-hook-form';
import './SignUpPage.css'
import {useNavigate} from 'react-router-dom';
import IntroPhoto from '../assets/introPhoto.jpg'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';

function SignUpPage() {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        AdminName: yup.string().required("*"),
        Email: yup.string().email().matches( /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required("*"),    
        Password: yup.string().required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match').required("Confirm Password is required")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver:yupResolver(schema),});
    const onSubmit = (data) => {
        Axios.post('http://localhost:8081/auth/register', data)
        .then(response => {
            response.data.message && alert(response.data.message);
            navigate("/login");
        })
        .catch(({response}) => {
            alert(response.data.error)
        });
        
    };
  return (
    <>
    <div id='RegisterMain'>
        <form id='RegisterForm' onSubmit={handleSubmit(onSubmit)}>
        <h2>Admins Registration</h2>
            <label>
            Name:
            </label> <input type="text" placeholder='Enter your username' {...register("AdminName")} />
            <p>{errors.AdminName?.message}</p>
            <label>
                Email:
            </label> <input type="text" placeholder='Email' {...register("Email")}/>
            <p>{errors.Email?.message}</p>
            <label>
                Password:
            </label><input type="password" placeholder='Password' {...register("Password")} />
            <p>{errors.Password?.message}</p>
            <label>
                Confirm Password:
            </label><input type="password" placeholder='Password' {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
           <button type='submit'>Register</button>
        </form>
        <div id='RightRegisterImg'>
            <img src={IntroPhoto} alt="" />
        </div>
    </div>
    </>
  )
}
export default SignUpPage;