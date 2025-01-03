/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'

const Home = () => {

    // State to manage the Add/Edit Modal
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: {}
    })
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

        <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-black hover:bg-gray-600 absolute right-10 bottom-10' 
        onClick={()=>{
            // Open the Add/Edit Modal
            setOpenAddEditModal({isShown: true, type: "add", data: null})
        }}
        >
          <MdAdd className='text-[32px] text-white'/>  
        </button>

        {/* Add/Edit Modal */}
        <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={()=>setOpenAddEditModal({isShown: false, type: "add", data: {}})}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
            }}
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            contentLabel=""
        >
            <AddEditNotes/>

        </Modal>

    </>
  )
}

export default Home