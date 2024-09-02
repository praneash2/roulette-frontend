import React from 'react'
import './navbar.css';
import { useNavigate } from 'react-router-dom';
const NavBar = ({UserName}) => {
    const navigate=useNavigate();
    const logout=(e)=>{
        localStorage.clear();
        navigate('/auth');
    }
    return (
    <div className='navbar-wrapper'>
        <p>{UserName}</p>
        <button onClick={logout}>
            logout
        </button>
    </div>
  )
}

export default NavBar