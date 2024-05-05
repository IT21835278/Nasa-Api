import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/nasalogo.png';
import { Logout } from '../../../Services/authServices';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const logout = async () => {
    await Logout();
    // await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <div>
      <ul className="flex justify-between">
        <li className="mr-3 ml-10">
          <img className='w-40 h-40' src={Logo} alt="Logo" />
        </li>
        <li className="mr-3">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
          <h1 className="mt-10 text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent tracking-wider ml-4 font-serif">Universal Explores</h1>
        </li>
        <li className="mr-3">
          <div className='mt-6 ml-5'>
          <button type="button" onClick={logout} className="mt-7 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
          </div> 
          <div className='mt-5'>
          <b >{user && `Welcome, ${user.name}`}</b> 
          </div>        
        </li>
      </ul>
    </div>
  );
}

export default Header;
