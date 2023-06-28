import { useForm } from 'react-hook-form';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import IntroPhoto from '../assets/introPhoto.jpg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';

function SignUpPage() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    AdminName: yup.string().required('*'),
    Email: yup.string().email().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required('*'),
    Password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('Password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...requestData } = data; // Exclude confirmPassword from the request data
    if (requestData.Password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    Axios.post('http://localhost:8081/auth/register', requestData)
      .then((response) => {
        
        if (response.status === 400 && response.data.message === 'User already exists') {
          alert('User already exists. Please try entering different details.');
        } else {
          response.data && response.data.message && alert(response.data.message);
          navigate('/login');
        }
      })
      .catch(({response }) => {
        alert(response.data.message);
      });
  };
  
  
  

  return (
    <>
      <div id="RegisterMain">
        <form id="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
          <div class="card-header">
            <div class="text-header">Register Details</div>
          </div>
          <label>
            Name:
          </label>
          <input type="text" placeholder="Enter your username" {...register("AdminName")} />
          <p>{errors.AdminName?.message}</p>
          <label>
            Email:
          </label>
          <input type="text" placeholder="Email" {...register("Email")} />
          <p>{errors.Email?.message}</p>
          <label>
            Password:
          </label>
          <input type="password" placeholder="Password" {...register("Password")} />
          <p>{errors.Password?.message}</p>
          <label>
            Confirm Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("Password") || "Passwords must match"
            })}
          />
          <p>{errors.confirmPassword?.message}</p>
          <button id="RegisterButton" type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
