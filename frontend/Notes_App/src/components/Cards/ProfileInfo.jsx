/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
    // Ensure userInfo is defined and has fullName before rendering
    const fullName = userInfo?.fullName || "Guest";  // Default to "Guest" if fullName is not available

    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-medium bg-slate-100"> 
                {getInitials(fullName)}  {/* Use fullName for initials */}
            </div>
        
            <div>
                <p className="text-sm font-medium">{fullName}</p> {/* Display the fullName */}
                <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

// PropTypes validation
ProfileInfo.propTypes = {
    userInfo: PropTypes.shape({
        fullName: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
};

// Set default props in case userInfo is undefined
ProfileInfo.defaultProps = {
    userInfo: {
        fullName: "",  // Default to empty string if fullName is missing
    },
};
    
export default ProfileInfo;
