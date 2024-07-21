import React, { useState, useEffect } from 'react';
import './ChatPopup.css';

const ChatWindow = ({ isVisible, onClose, messages, onSend, loading }) => {
    const [message, setMessage] = useState('');

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
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="loading-bar-container">
                        <div className="loading-bar"></div>
                    </div>
                )}
            </div>
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
                {isChatVisible ? 'Close Chat' : 'Open Chat'}
            </button>
            <ChatWindow isVisible={isChatVisible} onClose={toggleChat} messages={messages} onSend={handleSend} loading={loading} />
        </div>
    );
};

export default ChatPopUp;
