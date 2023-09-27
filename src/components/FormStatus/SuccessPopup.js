import React from 'react' 
import { FaXmark } from 'react-icons/fa6'
import success from '../../../public/success.webp'
import Image from 'next/image'

const SuccessPopup = ({display, close}) => {
  return (
    <div className={`${display ? 'flex' : 'hidden'}  absolute top-0 left-0 bg-black/30 w-screen h-screen  items-center justify-center`}>
     <div className='relative w-[85%] max-w-[400px] py-8 bg-white shadow-lg flex flex-col rounded-md'>
      <div className='w-fit ml-auto h-fit absolute -right-4 -top-3' onClick={close}>
       <FaXmark className='text-black text-[2rem]'/>
      </div>
      <div className='relative w-36 h-36 mx-auto'>
       <Image alt='succesImage' src={success} className='object-fit' fill={true}  />
      </div>
      <h3 className='mt-6 text-center text-xl font-inter px-2'>Thank you for subscribing to our newsletter</h3>
     </div>
    </div>
  )
}

export default SuccessPopup