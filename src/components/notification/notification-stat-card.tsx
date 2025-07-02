import React, {ReactNode} from 'react';

interface NotificationStatCardProps {
    title: string;
    count: number;
    children: ReactNode;
}

const NotificationStatCard = ({title, count, children}: NotificationStatCardProps) => {
    return (
        <div className={'bg-white p-4 rounded-lg shadow-sm w-full max-w-sm flex items-center gap-4'}>
            <div className={'flex flex-col gap-1'}>
                <h3>{title}</h3>
                <p>{count}</p>
            </div>
            {children}
        </div>
    );
};

export default NotificationStatCard;
