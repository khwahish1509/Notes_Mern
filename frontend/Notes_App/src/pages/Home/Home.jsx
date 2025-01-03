/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'

const Home = () => {
  return (
    <>

        <Navbar />
        <div className='container mx-auto px-5'>
            <div className='grid grid-cols-3 gap-4 mt-8' >
                <NoteCard
                    title="Meeting on 7th April"
                    date="3rd Apr 2024"
                    content="Meeting on 7th April Meeting on 7th April"
                    tags="#Meeting"
                    isPinned={true}
                    onEdit={()=>{}}
                    onDelete={()=>{}}
                    onPinNote={()=>{}}
                />                
            </div>
        </div>

        <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-black hover:bg-gray-600 absolute right-10 bottom-10' onClick={()=>{}}>
          <MdAdd className='text-[32px] text-white'/>  
        </button>

        <AddEditNotes/>
    </>
  )
}

export default Home