/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Passwordinput = ({value, onChange, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false)

    const toogleShowPassword = () => {
        // Function to toggle the visibility of the password. 
        // It flips the value of `isShowPassword` between `true` and `false`.
        setIsShowPassword(!isShowPassword)
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder  || 'Password'}
        className='w-full text-sm bg-transparent py-3 mr-3 outline-none'
        />

        {isShowPassword?(
        <FaRegEye
          size={22}
          className='text-primary cursor-pointer'
          onClick={ () => toogleShowPassword()}
        />):(
        <FaRegEyeSlash
          size={22}
          className='text-slate-400 cursor-pointer'
          onClick={ () => toogleShowPassword()}/>
        )}

    </div>
  )
}

export default Passwordinput