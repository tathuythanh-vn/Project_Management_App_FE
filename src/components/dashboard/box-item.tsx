import React from 'react';

type BoxItemProps = {
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const BoxItem = ({title, className, children} :BoxItemProps) => {
    return (
        <div className={`shadow-sm h-96 max-h-full p-3 bg-white rounded-sm overflow-y-auto ${className}`}>
            <h2 className='font-bold mb-4'>{title}</h2>
            {children}
        </div>
    );
};

export default BoxItem;
