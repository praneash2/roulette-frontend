import React, { useState } from 'react'
import './auth.css';
import { useNavigate } from 'react-router-dom';
import constant from '../../constant';
const Auth = ({setBetAmount}) => {
   
    const [login,setLogin]=useState(true);
    const navigate=useNavigate();
    const [authData,setAuthData]=useState({UserName:'',Password:''});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthData((prevAuthData) => ({
            ...prevAuthData,
            [name]: value
        }));
    };
    const loginApi = async (UserName, Password) => {
        try {
            const response = await fetch(`${constant.BACKEND_URL}auth/${UserName}/${Password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            if(data?.message=="Login successful"){
                let profileData={token:data.data.token,UserName:UserName};
                localStorage.setItem('profile',JSON.stringify(profileData));
                alert('Login successful');
                
                navigate('/');
                navigate(0);
            }
            else{
                alert('invalid credentials');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('invalid credentials');
        }
    };
    const signUpApi = async (UserName, Password) => {
        try {
            const response = await fetch(`${constant.BACKEND_URL}auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserName, Password })
            });
            
            if (!response.ok) {
                throw new Error('Sign up failed');
            }
    
            const data = await response.json();
            if(data?.message=="Signup successful"){
                let profileData={token:data.data.token,UserName:UserName};
                localStorage.setItem('profile',JSON.stringify(profileData));
                alert('Signup successful');
               
                navigate('/');
                navigate(0);
            }
            else{
                alert('Signup not successful');
            }
            
            console.log('Sign up successful:', data);
        } catch (error) {
            alert('invalid credentials');
            console.error('Error:', error);
        }
    };
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(login===true){
            //logic api call
            loginApi(authData.UserName,authData.Password);
        }
        else{
            //signup api call
            signUpApi(authData.UserName,authData.Password);
        }
        
        
        setAuthData({UserName:'',Password:''});

        console.log(authData);
    }
  return (
    <div className='auth-whole-wrapper'>
        <form className='auth-wrapper' onSubmit={handleSubmit}>
            {(login)?<p className='auth-header'>login</p>:<p className='auth-header'>signup</p>}
            <input type="email" name="UserName" onChange={handleChange} value={authData.UserName} placeholder='email'>

            </input>
            <input name="Password" type="password" onChange={handleChange} value={authData.Password} placeholder='password'>
            </input>
            {(login)?<p onClick={()=>{setLogin(!login)}} className='create-new'>Create new Account</p>:<p onClick={()=>{setLogin(!login)}} className='create-new'>Already exists</p>}
            
            <button>{(login)?<p>login</p>:<p>signup</p>}</button>
        </form>
    </div>
    
  )
}

export default Auth