import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full bg-red-400 flex justify-between flex-col '>
            <img className='w-16 ml-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
            <div className='bg-white px-4 py-4 pb-7'>
                <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black py-3  text-white rounded-lg mt-5' >Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home