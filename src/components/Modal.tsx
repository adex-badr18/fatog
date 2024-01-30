import React, { ReactNode } from 'react';
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <div className={`flex justify-center items-center fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-60 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative max-w-lg p-10 bg-white shadow-md rounded-md">
                {children}
                <button className="absolute top-0 right-0 p-4 text-xl text-[#0e204d]" onClick={onClose}>
                    <IoCloseSharp />
                </button>
            </div>
        </div>
    );
};

export default Modal;
