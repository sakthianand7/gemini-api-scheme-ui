import React, { useState, useEffect, useRef } from 'react';
import './ChatPopup.css';
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons'; // Example icon

import geminiIcon from './google-gemini-icon.png';

const ChatWindow = ({ isVisible, onClose, messages, onSend, loading }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            onSend({ type: 'sent', text: message });
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    if (!isVisible) return null;

    return (
        <div className="chat-popup">
            <div className="chat-popup-header">
                <h2>Chat</h2>
                <button className="close" onClick={onClose}>&times;</button>
            </div>
            <div className="chat-popup-body">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.type === 'sent' ? 'sent' : 'received'}`}
                    >
                        {msg.type === 'sent' ? (<>{msg.text}</>) : <><ReactMarkdown>{msg.text}</ReactMarkdown></>}
                    </div>
                ))}
                <div ref={messagesEndRef} />

            </div>
            {loading && (
                <><LoadingBar variant="gen-ai-masked" />
                <LoadingBar variant="gen-ai-masked" />
                <LoadingBar variant="gen-ai-masked" /></>
            )}
            <div className="chat-popup-footer">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

const LOCAL_HOST = "http://localhost:8000"
const ChatPopUp = (props) => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleSend = async (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setLoading(true);
        const response = await chat(message);
        handleReceive(response);
    };

    const handleReceive = (messageText) => {
        setLoading(false);
        setMessages((prevMessages) => [...prevMessages, { type: 'received', text: messageText }]);
    };

    async function chat(message) {
        const input = {
            message: message.text
        };

        const response = await fetch(`${LOCAL_HOST}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)

        })
        const result = await response.text();
        return result;
    }

    return (

        <div className="App">
            <button className="chat-button" onClick={toggleChat}>
                <img src={geminiIcon} alt="Gemini AI Icon" className="icon" />
            </button>
            <ChatWindow isVisible={isChatVisible} onClose={toggleChat} messages={messages} onSend={handleSend} loading={loading} />
        </div>
    );
};

export default ChatPopUp;
