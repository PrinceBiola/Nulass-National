import React from "react";
// import Zoom from 'react-reveal/Zoom';
import { MdCancel } from "react-icons/md";

const SammyModal = ({ isOpen, onClose, children, theme, clickBackgroundToClose, modalClass }) => {
    
  return (
    <>
      <div
        className={`${
          !isOpen && "hidden"
        } fixed top-0 left-0 w-full h-full px-2 flex justify-center items-center z-[999]`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40" onClick={() => clickBackgroundToClose && onClose()}></div>

        {/* Modal content */}

     
        <div
          className={`${
            theme === "dark" ? "bg-[#121212]" : "bg-white"
          } pb-4 pt-8 px-6 rounded-lg shadow-lg relative z-[999] ${modalClass}`}
        >
       
                <MdCancel size={25} className="text-red-600 absolute top-3 right-3 hover:scale-110 transition-all duration-300" onClick={onClose}/>
  
          {children}
          {/* Close button */}
        
        </div>
     
      </div>
    </>
  );
};

export default SammyModal;
