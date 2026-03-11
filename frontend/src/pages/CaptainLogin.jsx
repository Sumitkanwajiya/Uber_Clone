import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainLogin = () => {

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault()
  
      setCaptainData({ email, password })
      setEmail('')
      setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen '>
      <div>
        <img className='w-16  mb-8' src="https://staging.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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
        <p className='text-center mb-1'>Join Uber?<Link 
         className='text-blue-500'  to="/captain/signup">Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link to ='/login'
         className='flex items-center justify-center bg-[#b44910] text-white px-4 py-2 rounded text-lg  w-full placeholder:text-base'>Sign in as a User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin