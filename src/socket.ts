"use client";

import { io } from "socket.io-client";

// Create socket instance without auth initially
export const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
    autoConnect: false, // Don't connect automatically
    auth: {
        userId: null
    }
});

// Function to connect with user authentication
export const connectSocket = (userId: string) => {
    if (userId && !socket.connected) {
        socket.auth = { userId };
        socket.connect();
    }
};

// Function to disconnect socket
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};