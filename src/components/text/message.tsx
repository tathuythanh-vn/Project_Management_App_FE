import React from 'react';

type MessageProps = {
    children?: React.ReactNode;
    className?: string;
    type?: 'success' | 'error';
}

function Message({children, className, type = 'error'}: MessageProps) {
    const classes = `${type === 'error' ? 'text-red-500' : 'text-green-500'} ${className}`

    return (
        <p className={classes}>{children}</p>
    );
}

export default Message;