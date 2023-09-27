import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import ErrorMessage from '@/components/ValidationStatus/ErrorMessage'
import Error from './FormStatus/Error'

const Form = ({ success, errorOccured, processing, formStatus }) => {
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
    const status = content.data?.status
    
    if(status === 200){
      //success
      success()
      formik.resetForm()
    }else{
      errorOccured()
    }
  }
 }
// validation scheme
  const validateSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup.string().email('Invalid email').required('This field is required')
})

// focus on label click 
 function Focus(id){
    if(id === 'name'){
      nameref.current.focus()
    }else if (id === 'email'){
      emailref.current.focus()
    }
 }


const formik = useFormik({
  initialValues: {
      name: '',
      email: '',
  },
  validationSchema: validateSchema,
  onSubmit: (values) => {
      processing()
      const formData = values
      sendToGoogleSheet(formData)
  },
  validateOnChange:  false,
})




  return (
   <>
    {formStatus.error && <Error />}
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