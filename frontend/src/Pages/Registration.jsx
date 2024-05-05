import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginIMG from '../assets/nasaloging.png';
import { login } from '../redux/features/authSlice';
import { registerUser } from '../../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  Email: "",
  password: "",
  name:""
}

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState(initialState);
  const { Email, password } = formData;

  const userData = {
    Email,
    password,
    name
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const Signup = async (e) => {
    e.preventDefault();
    if (!name ||!Email || !password) {
      // return toast.error("All Field must be filled")
      console.log("enter pwd and mail");
    }

    try {
      const data = await registerUser(userData);
      console.log(data);
      dispatch(login(data)); // Dispatching login action with user data
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  }

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${LoginIMG})` }}>
      <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
        <div className="text-slate-100 items-center">
          <div className="text-center pb-3">Welcome!</div>
        </div>
        <form onSubmit={Signup} className='w-full md:w-3/4 lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12 bg-opacity-5 '>
          <div className="w-3/4 mb-6">
            <input type="email" name="Email" id="email" value={Email} onChange={handleInputChange} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold placeholder-gray-800 rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300 bg-opacity-30" placeholder="Email adress" />
          </div>
          <div className="w-3/4 mb-6">
            <input type="text" name="name" id="name" value={name} onChange={handleInputChange} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold placeholder-gray-800 rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300 bg-opacity-30" placeholder="Email adress" />
          </div>
          <div className="w-3/4 mb-6">
            <input type="password" name="password" id="password" value={password} onChange={handleInputChange} className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold placeholder-gray-800 rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300 bg-opacity-30" placeholder="Password" />
          </div>
          <div className="w-3/4 mb-12">
            <button type="submit" className="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700 bg-opacity-90"> LOGIN</button>
          </div>
          <div>
              <Link to='/' className='font-medium text-gray-900 dark:text-blue-500 hover:underline'>Signin</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
