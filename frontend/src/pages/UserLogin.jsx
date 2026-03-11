import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    setUserData({ email, password })
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen '>
      <div>
        <img className='w-16  mb-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3 className='mb-2 text-lg font-medium'>What's your email.</h3>

        <input className='bg-[#eeeeee] px-4 py-2 rounded text-lg border w-full placeholder:text-base mb-6'
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        type="email" 
        placeholder='email@example.com' />

        <h3 className='mb-2 text-lg font-medium'>Enter your password.</h3>
        <input className='bg-[#eeeeee] px-4 py-2 rounded text-lg border w-full placeholder:text-base mb-6' 
         value={password} 
         onChange={(e) => setPassword(e.target.value)} 
         required 
         type="password" 
         placeholder='Password' />

        <button className='bg-black text-white px-4 py-2 rounded text-lg  w-full placeholder:text-base mb-3'>Login</button>
        <p className='text-center mb-1'>New here?<Link 
         className='text-blue-500'  to="/signup">Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to ='/captain/login'
         className='flex items-center justify-center bg-[#10b461] text-white px-4 py-2 rounded text-lg  w-full placeholder:text-base'>Sign in as a captain</Link>
      </div>
    </div>
  )
}

export default UserLogin