import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { IInputs } from '../shared/types'

function Signup() {
  const [inputs, setInputs] = useState<IInputs>({
    email: "",
    password:"",
    name:""
  })
  const [err,setErr] = useState("")
  const { signup }  = useContext(AuthContext)
  const navigate = useNavigate()

  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Your async logic, for example, calling the login function
      const response = await signup(inputs);
      console.log(response)
      navigate("/login"); 
    } catch (err) {
      if(err instanceof Error)
      setErr(err.message || 'An error occurred');
      console.log(err);
    }
  };
  return (
    <div>
      <form className='flex flex-col gap-6   justify-center items-center absolute  w-full h-screen ' onSubmit={handleSubmit}>
        <h1 className=''>Sign up</h1>
        <input className='border-2 border-gray-500' type="text" name="email" placeholder='email' value={inputs.email} onChange={handleChange}></input>
        <input className='border-2' placeholder='password' type="text" name="password" value={inputs.password} onChange={handleChange}></input>
        <input className='border-2' placeholder='name' type="text" name="name" value={inputs.name} onChange={handleChange}></input>
        <button className='border-2'>Sign up</button>
        <Link className='border-2 ' to={'/login'}>Have an account ?</Link>
      </form>
    </div>
  )
}


export default Signup

