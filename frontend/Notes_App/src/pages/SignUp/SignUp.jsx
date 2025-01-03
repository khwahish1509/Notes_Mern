/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Passwordinput from '../../components/input/Passwordinput'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevents the default action of the form submission
    console.log("Sign Up");
  }
  return (
    <>
        <Navbar />

        <div className='flex items-center justify-center mt-28 '>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleSignUp}>
                  <h4 className="text-2xl mb-7">SignUp</h4>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="input-box" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input 
                    type="text" 
                    placeholder="Email" 
                    className="input-box" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />     
                  
                  <Passwordinput
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                  />
                  {/* // Display error message if there is any */}
                  {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                  <button type="submit" className="btn-primary">
                      Create Account
                  </button>

                  <p className="text-sm text-center mt-4">
                   Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary underline">
                        Login
                    </Link>
                    </p>                  
                </form>
            </div>
        </div>
    </>
  )
}

export default SignUp