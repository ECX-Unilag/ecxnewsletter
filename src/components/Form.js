import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import { useState } from 'react'
import ErrorMessage from '@/components/ValidationStatus/ErrorMessage'
import Succes from './FormStatus/Succes'
import Error from './FormStatus/Error'


const Form = () => {
const [formStatus, setformStatus] = useState({
  loading: false,
  error:false,
  success:false,
})
const nameref = useRef(null)
const emailref = useRef(null)

 const sendToGoogleSheet = async(formData) => {
  const response = await fetch('/api/submit', {
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(formData)
  })

  const content = await response.json()
  if(content){
    setformStatus(prev => {
      return {
        ...prev,
        loading:false
      }
    })
    const status = content.data?.status
    
    if(status === 200){
      //success
      setformStatus(prev => {
        return {
          ...prev,
          success: true,
        }
      })
      formik.resetForm()
    }else{
      setformStatus(prev => {
        return {
          ...prev,
          error: true,
        }
      })
    }
  }
 }

  const validateSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup.string().email('Invalid email').required('This field is required')
})


const formik = useFormik({
  initialValues: {
      name: '',
      email: '',
  },
  validationSchema: validateSchema,
  onSubmit: (values, { resetForm }) => {
      setformStatus(prev => {
        return {
          ...prev,
          error: false,
          success: false,
          loading: true
        }
      })
      const formData = values
      sendToGoogleSheet(formData)
  },
  validateOnChange:  false,
})

 function Focus(id){
    if(id === 'name'){
      nameref.current.focus()
    }else if (id === 'email'){
      emailref.current.focus()
    }
 }


  return (
   <>
    {formStatus.error && <Error />}
    {formStatus.success && <Succes />}
    <form className='mt-8' onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)} } >
      <div className="inputDiv" >
        <input ref={nameref} value={formik.values.name} onChange={formik.handleChange} id='name' name='name'  type="text" className={`peer input placeholder-transparent ${formik.errors.name ? 'border-red-500' : ''} `}   placeholder='name' />
        <label  onClick={() => Focus('name')}  className='absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in' >Name</label>
        <div className="line"></div>
        { formik.errors.name && <ErrorMessage message={formik.errors.name} /> }
      </div>

      <div className="inputDiv">
        <input ref={emailref} placeholder='email' name='email' onChange={formik.handleChange} value={formik.values.email} className={`input peer ${formik.errors.name ? 'border-red-500' : ''}`} type="text"/>
        <div className="line"></div>
        <label  onClick={() => Focus('email')} className='absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in'>Email Address</label>
        { formik.errors.email && <ErrorMessage message={formik.errors.email} /> }
      </div>
      <button disabled={formStatus.loading} type='submit' className='w-28 h-10 bg-blue-500 rounded-md relative left-2/4 -translate-x-2/4 text-white '>Subscribe</button>
    </form>
   </> 
  )
}

export default Form