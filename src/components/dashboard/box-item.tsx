import React from 'react';

type BoxItemProps = {
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const BoxItem = ({title, className, children} :BoxItemProps) => {
    return (
        <div className={`shadow-sm min-h-80 p-3 bg-white rounded-sm ${className}`}>
            <h2 className='font-bold'>{title}</h2>
            {children}
        </div>
    );
};

export default BoxItem;
