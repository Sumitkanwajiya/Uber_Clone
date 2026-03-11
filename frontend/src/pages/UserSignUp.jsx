import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({ 
      fullName:{
        firstname:firstName,
        lastname:lastName
      },
      email,
      password
     })

     console.log(userData)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen '>
      <div>
        <img className='w-16  mb-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>

          <h3 className='mb-2 text-lg font-medium'>What's your name.?</h3>

          <div className='flex gap-4 mb-6'>

            <input className='bg-[#eeeeee] px-4 py-2 rounded text-lg border w-1/2 placeholder:text-base '
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder='First Name' />

            <input className='bg-[#eeeeee] px-4 py-2 rounded text-lg border w-1/2 placeholder:text-base '
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder='Last Name' />

          </div>



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
          <p className='text-center mb-1 text-base '>Already have a Account.?<Link
            className='text-blue-500' to="/login">Login here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight text-sm text-gray-500 '>Terms & policies of Uber. Your data will be used to improve your experience. Your Best and Most affordable Riding Partner Uber contact us on uber@gmail.com.</p>
      </div>
    </div>
  )
}

export default UserSignUp