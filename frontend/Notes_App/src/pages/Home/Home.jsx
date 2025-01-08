/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";


const Home = () => {

    // State to manage the Add/Edit Modal
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
      isShown: false,
      message: "",
      type: "add",
    })

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
      setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    };

    // Delete a note
    const showToastMessage = (message, type) => {
      setShowToastMsg({
        isShown: true,
        message: message,
        type,
      });
    };
    
    // Close the toast message
    const handleCloseToast = () => {
      setShowToastMsg({
        isShown: false,
        message: "",
      });
    };

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

    // Get all notes
    const getAllNotes = async () => {
        try {
          const response = await axiosInstance.get("/get-all-notes");
    
          if (response.data && response.data.notes) {
            setAllNotes(response.data.notes);
          }
        } catch (error) {
          console.log("An unexpected error occurred. Please try again.");
        }
      };

        // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

    useEffect(() => {
    getAllNotes();
      getUserInfo();
      return () => {};
    }, []);

    

  return (
    <>
        
        <Navbar userInfo={userInfo} />
          <div className='container mx-auto px-5'>
            {allNotes.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {allNotes.map((item) => {
                  return (
                    <NoteCard
                      key={item._id}
                      title={item.title}
                      content={item.content}
                      date={item.createdOn}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item)}
                      // onPinNote={() => }
                    />
                  );
                })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? `Oops! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your
          thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
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
            // onRequestClose={()=>setOpenAddEditModal({isShown: false, type: "add", data: {}})}
            onRequestClose={() => {}}

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
                getAllNotes={getAllNotes}
                showToastMessage={showToastMessage}
            />

        </Modal>

        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />

    </>
  )
}

export default Home