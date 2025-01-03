/* eslint-disable no-unused-vars */
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types'; // Import PropTypes


const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return(
        <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
            <input
                type="text"
                placeholder="Search Notes"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose
                className="text-xl Otext-slate-500 cursor-pointer hover: text-black mr-3"
                onClick={onClearSearch}
            />
            )}

            <FaMagnifyingGlass
                className="text-slate-400 cursor-pointer  hover: text-black"
                onClick={handleSearch}
            />
        </div>
    );
};

// PropTypes validation
SearchBar.propTypes = {
    value: PropTypes.string.isRequired, // Assuming `value` is a string
    onChange: PropTypes.func.isRequired, // `onChange` should be a function
    handleSearch: PropTypes.func.isRequired, // `onChange` should be a function
    onClearSearch: PropTypes.func.isRequired, // `onChange` should be a function
};
export default SearchBar

