import { useForm } from 'react-hook-form';
import './SignUpPage.css'
import IntroPhoto from '../assets/introPhoto.jpg'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
function SignUpPage() {
    const schema = yup.object().shape({
        firstName: yup.string().required("*"),
        county: yup.string().required("*"),
        email: yup.string().email().matches( /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required("*"),
        password: yup.string().matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver:yupResolver(schema),});
    const onSubmit = (data) => {console.log(data)};
  return (
    <>
    <div id='UserRegisterMain'>
        
        <form id='UserRegisterForm' onSubmit={handleSubmit(onSubmit)}>
        <h2>User Registration</h2>
            <div id='Names'>
            <label>
                FirstName:
            </label> <input type="text" placeholder='First Name' {...register("firstName")} />
            <p>{errors.firstName?.message}</p>
            </div>
            <div id='UsercountyPhone'>
            <label>
                Country:
            </label> <input type="text" placeholder='County' {...register("county")} />
            <p>{errors.county?.message}</p>
            </div>
            <div id='UserEmailDate'>
            <label>
                Email:
            </label> <input type="text" placeholder='Email' {...register("email")}/>
            <p>{errors.email?.message}</p>
           
            </div>
            <div id='UserPassword'>
            <label>
                Password:
            </label><input type="password" placeholder='Password' {...register("password")} />
            <p>{errors.password?.message}</p>
            <label>
                Confirm Password:
            </label><input type="password" placeholder='Password' {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
            </div>
           <Link to='/userloginpage'> <button type='submit'>Register</button></Link>
        </form>
        <div id='UserRightRegisterImg'>
            <img src={IntroPhoto} alt="" />
        </div>
    </div>
    </>
  )
}
export default SignUpPage;