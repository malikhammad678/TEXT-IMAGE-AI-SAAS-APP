
import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Login = () => {

    const { openForm , setIsOpenForm } = useAppContext()
    const [state,setState] = useState('Login')

   useEffect(() => {
  if (openForm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return () => {
    document.body.style.overflow = "unset";
  };
}, [openForm]);


  return ( openForm &&
       <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      
      <form className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl  text-neutral-700 font-medium'> {state === 'Login' ? 'Login' : 'Sign Up'} </h1>
        <p className='text-sm text-center mt-2 text-blue-600'> { state === 'Login' ? 'Welcome back!' : 'Join Our Community' } </p>
        { state === 'Sign Up' &&
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.user_icon} alt="" />
            <input type="text" className='outline-none text-sm' placeholder='Full Name' required />
        </div>
        }

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input type="email" className='outline-none text-sm' placeholder='Email ID' required />
        </div>
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input type="password" className='outline-none text-sm' placeholder='Password' required />
        </div>

      { state === "Login" && <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget Password</p> }
      <button className={`bg-blue-600 w-full text-white py-2 rounded-full ${state === 'Sign Up' && 'mt-4'}`}
      > { state === 'Login' ? 'Login' : 'Create an account' } </button>

     { state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span></p> : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>}

     <img src={assets.cross_icon} onClick={() => setIsOpenForm(false)} className='absolute top-5 right-5 cursor-pointer' alt="" />

      </form>

    </div>
  )
}

export default Login
