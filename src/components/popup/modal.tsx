import React, {ReactNode, useEffect, useState} from 'react';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isOpened: boolean;
    onClose: () => void;
}

const Modal = ({children, isOpened = false, onClose, ...props}: ModalProps) => {
    if (!isOpened) return null;

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center`}
            onClick={onClose}
        >
            <div className='bg-white rounded-md p-6 shadow-sm w-full min-w-80 mx-4'
                 onClick={(e) => e.stopPropagation()}
                 {...props}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
