'use client'

import {connectSocket, disconnectSocket, socket} from '@/socket';
import {useEffect, useState} from 'react';
import {toast} from "sonner";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";

// Define notification types for better type safety
interface NotificationData {
    _id: string;
    type: 'task_assign' | 'task_update' | 'task_comment' | 'task_due_reminder' | 'team_invite';
    description: string;
    template: string;
    processedTemplate: string;
    data: {
        taskId?: string;
        taskTitle?: string;
        teamName?: string;
        dueDate?: string;
        senderDetails?: {
            name: string;
            avatar: string;
        };
        [key: string]: any;
    };
    isRead: boolean;
    createdAt: string;
}

interface TaskData {
    taskId: string;
    taskTitle: string;
    assignedBy?: string;
    updatedBy?: string;
    commentedBy?: string;
    projectName?: string;
    changes?: any;
    commentText?: string;
    dueDate?: string;
    reminderType?: string;
}

const NotificationListener = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState("N/A");
    const [notificationCount, setNotificationCount] = useState<number>(0);

    const {user} = useAuth()
    const router = useRouter();

    useEffect(() => {
        // Connect when user is available
        if (user?.userId) {
            connectSocket(user.userId);
        }

        // Cleanup on unmount
        return () => {
            disconnectSocket();
        };
    }, [user?.userId]);

    useEffect(() => {
        if (socket.connected) {
            console.log("Socket already connected");
            onConnect();
        }

        function onConnect() {
            console.log("onConnect called");
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });

            toast.success("Connected to server");
            console.log("Connected to server")
        }

        function onDisconnect() {
            console.log("Disconnected from server");
            setIsConnected(false);
            setTransport("N/A");
            toast.error("Disconnected from server");
        }

        function onConnectError(error: any) {
            console.error("Connection error:", error);
            toast.error("Connection failed. Trying to reconnect...");
        }

        // Core notification events
        function onNewNotification(notification: NotificationData) {
            console.log("New notification received:", notification);
            setNotificationCount(prev => prev + 1);

            // Show notification toast with rich content
            toast.info(
                <div className="notification-toast">
                    <div className="notification-header">
                        {notification.data.senderDetails?.avatar && (
                            <img
                                src={notification.data.senderDetails.avatar}
                                alt="Sender"
                                className="w-6 h-6 rounded-full mr-2"
                            />
                        )}
                        <span className="font-semibold">
                            {getNotificationTitle(notification.type)}
                        </span>
                    </div>
                    <div className="notification-message">
                        {notification.processedTemplate}
                    </div>
                </div>,
                {
                    duration: 5000,
                    action: {
                        label: 'View',
                        onClick: () => handleNotificationClick(notification)
                    }
                }
            );
        }

        function onNotificationRead(notification: NotificationData) {
            console.log("Notification marked as read:", notification);
            // Update notification in your UI to show as read
            // You might want to update a notification list state here
        }

        function onNotificationUpdated(notification: NotificationData) {
            console.log("Notification updated:", notification);
            // Update notification in your UI
        }

        function onNotificationDeleted(data: { id: string }) {
            console.log("Notification deleted:", data);
            setNotificationCount(prev => Math.max(0, prev - 1));
            // Remove notification from your UI
        }

        // Task-specific events (optional - for enhanced real-time updates)
        function onTaskAssigned(data: TaskData) {
            console.log("Task assigned:", data);
            toast.success(
                `New task assigned: "${data.taskTitle}"`,
                {
                    description: data.projectName ? `Project: ${data.projectName}` : undefined
                }
            );
        }

        function onTaskUpdated(data: TaskData) {
            console.log("Task updated:", data);
            toast.info(
                `Task updated: "${data.taskTitle}"`,
                {
                    description: `Updated by: ${data.updatedBy}`
                }
            );
        }

        function onTaskComment(data: TaskData) {
            console.log("New task comment:", data);
            toast.info(
                `New comment on: "${data.taskTitle}"`,
                {
                    description: data.commentText?.substring(0, 50) + (data.commentText && data.commentText.length > 50 ? '...' : '')
                }
            );
        }

        function onTaskDueReminder(data: TaskData) {
            console.log("Task due reminder:", data);
            toast.warning(
                `Due date reminder: "${data.taskTitle}"`,
                {
                    description: `Due: ${data.dueDate}`,
                    duration: 10000 // Longer duration for important reminders
                }
            );
        }

        // Helper function to get notification title
        function getNotificationTitle(type: string): string {
            const titles: Record<string, string> = {
                'task_assign': 'Task Assigned',
                'task_update': 'Task Updated',
                'task_comment': 'New Comment',
                'task_due_reminder': 'Due Date Reminder',
                'team_invite': 'Team Invitation'
            };
            return titles[type] || 'New Notification';
        }

        // Helper function to handle notification click
        function handleNotificationClick(notification: NotificationData) {
            console.log("Notification clicked:", notification);

            // Navigate based on notification type
            switch (notification.type) {
                case 'task_assign':
                case 'task_update':
                case 'task_comment':
                case 'task_due_reminder':
                    if (notification.data.taskId) {
                        // Navigate to task page
                        router.push(`/task`);
                    }
                    break;
                case 'team_invite':
                    if (notification.data.teamId) {
                        // Navigate to team page
                        router.push(`/team/${notification.data.teamId}`);
                    }
                    break;
                default:
                    // Navigate to notifications page
                    router.push(`/inbox`);
                    break;
            }
        }

        // Set up all event listeners
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", onConnectError);

        // Core notification events
        socket.on("new-notification", onNewNotification);
        socket.on("notification-read", onNotificationRead);
        socket.on("notification-updated", onNotificationUpdated);
        socket.on("notification-deleted", onNotificationDeleted);

        // Task-specific events (optional)
        socket.on("task-assigned", onTaskAssigned);
        socket.on("task-updated", onTaskUpdated);
        socket.on("task-comment", onTaskComment);
        socket.on("task-due-reminder", onTaskDueReminder);

        return () => {
            console.log("Cleaning up listeners");

            // Remove all event listeners
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("connect_error", onConnectError);

            socket.off("new-notification", onNewNotification);
            socket.off("notification-read", onNotificationRead);
            socket.off("notification-updated", onNotificationUpdated);
            socket.off("notification-deleted", onNotificationDeleted);

            socket.off("task-assigned", onTaskAssigned);
            socket.off("task-updated", onTaskUpdated);
            socket.off("task-comment", onTaskComment);
            socket.off("task-due-reminder", onTaskDueReminder);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-100">
            <div className="flex items-center gap-x-1">
                <p className="text-sm font-medium">
                    Status: <span className={isConnected ? "text-green-600" : "text-red-600"}>
                            {isConnected ? "Connected" : "Disconnected"}
                        </span>
                </p>
                {/* Connection status indicator */}
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
        </div>
    );
};

export default NotificationListener;