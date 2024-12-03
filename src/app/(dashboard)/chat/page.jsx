"use client";

import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/auth/auth_context";

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatPage = () => {
    const { usuarioAuth } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (usuarioAuth) {
            const socket = new SockJS("http://localhost:8080/ws");
            const client = Stomp.over(socket);

            client.connect({}, () => {
                setIsConnected(true);

                client.subscribe("/topic/public", (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });

            setStompClient(client);
            return () => {
                if (client) client.disconnect();
            };
        }
    }, [usuarioAuth]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (isConnected && stompClient && inputMessage.trim() !== "") {
            stompClient.send(
                "/app/chat.sendMessage",
                {},
                JSON.stringify({
                    sender: usuarioAuth.fullName,
                    content: inputMessage,
                    type: "CHAT"
                })
            );
            setInputMessage("");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="chat-container max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="chat-header p-4 bg-gradient-to-r from-green-600 to-green-800 text-white text-center">
                    <h2>Checkers Room</h2>
                </div>
                <div className="connecting p-4 text-center text-gray-500">
                    {isConnected ? `Conectado como ${usuarioAuth.fullName}` : "Conectando..."}
                </div>
                <ul id="messageArea" className="p-4 overflow-y-auto h-64">
                    {messages.map((msg, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-semibold">{msg.sender}: </span>
                            <span>{msg.content}</span>
                        </li>
                    ))}
                </ul>
                <form onSubmit={sendMessage} className="p-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="message"
                            placeholder="Haz tu consulta..."
                            className="form-control flex-grow border border-gray-300 rounded p-2"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button type="submit" className="primary bg-green-700 text-white rounded p-2">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
