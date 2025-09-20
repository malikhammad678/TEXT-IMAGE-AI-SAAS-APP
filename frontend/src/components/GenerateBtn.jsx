import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
const GenerateBtn = () => {

  const { navigate, setIsOpenForm, user } = useAppContext()

  const handleClick = () => {
    if(user){
      navigate("/result")
    } else {
      setIsOpenForm(true)
    }
  }

  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='pb-6 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-6'>See the magic, Try Now</h1>

      <button onClick={handleClick} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 flex items-center m-auto hover:scale-105 transition-all duration-300 gap-2 rounded-full'>Generate Images <img src={assets.star_group} className='h-6' alt="" /> </button>

    </motion.div>
  )
}

export default GenerateBtn
