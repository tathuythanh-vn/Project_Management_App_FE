'use client'

import {createContext, ReactNode, useContext, useState} from "react";
import {Task} from "@/model/task";



interface NotificationContextType {
    receiver: string;
    sender: string;
    type: string;
    message: string;
    task: Task
    isRead: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context;
};

const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notification, setNotification] = useState<NotificationContextType | undefined>(undefined);

    const [connectionStatus, setConnectionStatus] = useState<'disconnected'>('disconnected');


};

