/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TagInput from '../../components/input/TagInput'
import axiosInstance from '../../utils/axiosInstance'
import { MdClose } from 'react-icons/md'

const AddEditNotes = ({noteData, type, getAllNotes, onClose}) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null);

    // Function to add a new note
    const addNewNote = async () => {
        try {
          const response = await axiosInstance.post("/add-note", {
            title,
            content,
            tags,
          });
    
          if (response.data && response.data.note) {
            getAllNotes();
            onClose();
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setError(error.response.data.message);
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        }
      };
    

    // Function to edit a note
    const editNote = async () => {
        // const updatedNote = {
        //     ...noteData,
        //     title,
        //     content,
        //     tags,
        }

    const handleAddNote = () => {
        if(!title){
            setError("Title is required");
            return;
        }

        if(!content){
            setError("Content is required");
            return;
        }

        setError("");

        if (!type === "edit") {
            editNote()
        }else{
            addNewNote()
        }

    };

  return (
    <div className='relative'>

        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' 
            onClick={onClose}>
            <MdClose className='text-xl text-slate-400 hover:text-white'/>
        </button>
        <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Go To Gym At 5"
            value={title}
            onChange={({target}) => setTitle(target.value)}
        />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className="input-label">CONTENT</label>
            <textarea
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="Content"
                rows={10}
                value={content}
                onChange={({target}) => setContent(target.value)}
            />
        </div>

        {error && <p className='text-red-500 text-sm pt-4'>{error}</p>}

        <div className='mt-3'>
            <label className="input-label">TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
            ADD
        </button>
    </div>
  )
}
AddEditNotes.propTypes = {
    noteData: PropTypes.object,
    type: PropTypes.string,
    getAllNotes: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default AddEditNotes