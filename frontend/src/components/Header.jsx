import { assets } from "../assets/assets"
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Header = () => {

  const { navigate, user, setIsOpenForm } = useAppContext()

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

    className='flex flex-col justify-center items-center text-center my-20'>
      <motion.div
      
      initial={{opacity:0,y:-20}}
      transition={{duration:0.8, delay:0.2}}
      animate={{opacity:1, y:0}}

      className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

     <motion.h1
     
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{delay:0.4, duration:2}}

     className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'
     
     >image</span>, in seconds.</motion.h1>
     
     <motion.p
     
      initial={{opacity:0, y:20}}
     animate={{opacity:1,y:0}}
     transition={{delay:0.6, duration:0.8}}

     className='text-center max-w-xl mx-auto mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum reprehenderit consequatur suscipit eveniet blanditiis necessitatibus officia aut eos repellendus voluptas!</motion.p>
     <motion.button
     onClick={handleClick}
     whileHover={{scale:1.05}}
     whileTap={{scale:0.95}}
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{default:{ duration:0.5 }, opacity: { delay:0.8, duration:1 }}}

     className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>Generate Images 
        <img className='h-6' src={assets.star_group} alt="" />
     </motion.button>

     <motion.div
     
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{delay:1, duration:1}}

     className='flex flex-wrap justify-center items-center gap-2 mt-16'>
        {Array(6).fill('').map((item,index) => {
           return <motion.img
           
           whileHover={{ scale:1.05, duration:0.1 }}

           src={index % 2 ? assets.sample_img_2 : assets.sample_img_1} className='object-cover rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' key={index} width={70} alt="" />
        })}
     </motion.div>
     
     <motion.p
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{delay:1, duration:1}}

     className='mt-2 text-neutral-600'>Generate images from imagify</motion.p>

    </motion.div>
  )
}

export default Header
