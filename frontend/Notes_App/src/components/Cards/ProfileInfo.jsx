/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ onLogout }) => {
    return (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-medium bg-slate-100"> 
            {getInitials("Khwahish Vaid")}
        </div>
    
        <div>
            <p className="text-sm font-medium">Khwahish Vaid</p>
            <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
    );
};

// PropTypes validation
ProfileInfo.propTypes = {
    onLogout: PropTypes.func.isRequired,
};
    
export default ProfileInfo;