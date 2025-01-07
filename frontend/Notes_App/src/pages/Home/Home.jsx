/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'


const Home = () => {

    // State to manage the Add/Edit Modal
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: {}
    })

    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

//   Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

    useEffect(() => {
      getUserInfo();
      return () => {};
    }, []);

    

  return (
    <>
        
        <Navbar userInfo={userInfo} />
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
            <AddEditNotes
                noteData={openAddEditModal.data}
                type={openAddEditModal.type}
                onClose={()=>{
                    setOpenAddEditModal({isShown: false, type: "add", data: null});
                }}
            />

        </Modal>

    </>
  )
}

export default Home