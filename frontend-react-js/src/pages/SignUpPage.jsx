import { useForm } from 'react-hook-form';
import './SignUpPage.css'
import IntroPhoto from '../assets/introPhoto.jpg'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
function SignUpPage() {
    const schema = yup.object().shape({
        firstName: yup.string().required("*"),
        lastName: yup.string().required("*"),
        county: yup.string().required("*"),
        phoneNumber: yup.string().required("*"),
        email: yup.string().email().matches( /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required("*"),
        organization: yup.string().required("*"),
        organizationType: yup.string().required("*"),
        password: yup.string().matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver:yupResolver(schema),});
    const onSubmit = (data) => {console.log(data)};
  return (
    <>
    <div id='RegisterMain'>
        
        <form id='RegisterForm' onSubmit={handleSubmit(onSubmit)}>
        <h2>Admins Registration</h2>
            <div id='Names'>
            <label>
                FirstName:
            </label> <input type="text" placeholder='First Name' {...register("firstName")} />
            <p>{errors.firstName?.message}</p>
            <label>
                LastName:
            </label> <input type="text" placeholder='Last Name' {...register("lastName")}  />
            <p>{errors.lastName?.message}</p>
            </div>
            <div id='countyPhone'>
            <label>
                Country:
            </label> <input type="text" placeholder='County' {...register("county")} />
            <p>{errors.county?.message}</p>
            <label>
                Phone Number:
            </label> <input type="text" placeholder='Phone Number' {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>
            </div>
            <div id='EmailDate'>
            <label>
                Email:
            </label> <input type="text" placeholder='Email' {...register("email")}/>
            <p>{errors.email?.message}</p>
            <label>
                Organization:
            </label> <input type="text" placeholder='organization name' {...register("organization")}/>
            <p>{errors.organization?.message}</p>
            <label>Type of Organization</label>
            <select id='organizationType' {...register("organizationType")}> 
            <option value="1">Travel</option>
            <option value="2">Cleaning company</option>
            <option value="3">IT company</option>
            <option value="4">Logistics</option>
            <option value="5">Hospital</option>
            <option value="6">Restaurant</option>   
            <option value="7">Construction</option>
            </select>
            </div>
            <div id='Password'>
            <label>
                Password:
            </label><input type="password" placeholder='Password' {...register("password")} />
            <p>{errors.password?.message}</p>
            <label>
                Confirm Password:
            </label><input type="password" placeholder='Password' {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
            </div>
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