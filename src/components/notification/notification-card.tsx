import React from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Notification} from "@/model/notification";
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import {markNotificationAsRead} from "@/service/notification";
import {toast} from "sonner";

interface NotificationCardProps {
    notification: Notification;
    refetch: () => void;
}

const NotificationCard = ({notification, refetch, ...props}: NotificationCardProps) => {
    console.log(notification)

    return (
        <div className={`flex items-center justify-between px-4 py-4 w-full hover:bg-gray-200 cursor-pointer relative ${notification.isRead ? ' bg-gray-200' : ' bg-zinc-50'}`} {...props} >
            <div className="flex items-center gap-4">
                <Checkbox
                    checked={notification.isRead}
                    disabled={notification.isRead}
                    onCheckedChange={async () => {
                        try {
                            const response = await markNotificationAsRead(notification._id);

                            const data = await response.json();
                            if (!response.ok) throw new Error(data.message);

                            refetch();
                            toast.success("Successful");
                        } catch (e) {
                            console.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
                            toast.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
                        }
                    }}
                />
                <h2>{notification.data.taskTitle}</h2>
            </div>
            <p className={`${notification.type === 'task_assign' ? 'text-blue-600' : 'text-stone-900'} font-semibold`}>
                {notification.type === 'task_update' ? '✏️' : '🤝'}
                {formatSnakeToTitle(notification.type)}</p>
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${notification.sender.avatar}`}/>
                    <AvatarFallback>{notification.sender.fullName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p>{notification.processedTemplate}</p>
            </div>
            <p>{formarDateTime(new Date(notification.createdAt))}</p>
        </div>
    );
};

export default NotificationCard;
