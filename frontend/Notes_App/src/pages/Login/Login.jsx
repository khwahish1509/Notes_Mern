/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import Passwordinput from '../../components/input/Passwordinput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Function to handle the login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (!password) {
            setError("Password is required");
            return;
        }

        setError(null);

        // Call the login API here
    };

  return (
    <>
        <Navbar />

        <div className='flex items-center justify-center mt-28 '>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="input-box" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Passwordinput
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>

                {/* // Display error message if there is any */}
                {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                <button type="submit" className="btn-primary">
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Not registered yet?{" "}
                    <Link to="/signUp" className="font-medium text-primary underline">
                        Create an Account
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login