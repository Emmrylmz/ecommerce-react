import React from 'react'
import { Link, Navigate, json, useNavigate } from 'react-router-dom'
import { useState, } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { IInputs } from '../shared/types'

const Login : React.FC = () => {
  const [inputs, setInputs] = useState<IInputs>({
    email: "",
    password:"",
  })
  const [err,setErr] = useState("")
  const { login }  = useContext(AuthContext)
  const navigate = useNavigate()

  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    e.preventDefault()
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value
      
    });
    console.log(inputs)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Your async logic, for example, calling the login function
      const response = await login(inputs);
      console.log(json(response))
      navigate("/"); 
    } catch (err) {
      if(err instanceof Error)
      setErr(err.message || 'An error occurred');
      console.log(err);
    }
  };
  return (
  <>
  <form onSubmit={handleSubmit} className='flex flex-col gap-6   justify-center items-center absolute  w-full h-screen '>
    <h1 className=''>Login</h1>
    <input className='border-2 ' type="text" name="email" placeholder='email' value={inputs.email} onChange={handleChange}/>
    <input className='border-2 'type="text" name="password" placeholder='password' value={inputs.password} onChange={handleChange}/>
    <button className='border-2 ' >Login</button>
    <Link className='border-2 ' to={'/signup'}>Don't have an account ?</Link>
  </form>
  </>
  )
}



export default Login

