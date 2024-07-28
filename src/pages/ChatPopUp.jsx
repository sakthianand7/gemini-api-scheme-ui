import React, { useState, useEffect, useRef } from 'react';
import '../css/ChatPopup.css';
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import ReactMarkdown from 'react-markdown';
import geminiIcon from './google-gemini-icon.png';

const LOCAL_HOST = "http://localhost:8000";

/**
 * Chat window
 */
const ChatWindow = ({ isVisible, onClose, messages, onSend, loading }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const latestMessageRef = useRef(null); // Ref for the start of the latest message

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
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [messages]);

    if (!isVisible) return null;

    return (
        <div className="chat-popup">
            <div className="chat-popup-header">
                <h2>Ask Gemini</h2>
                <button className="close" onClick={onClose}>&times;</button>
            </div>
            <div className="chat-popup-body">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.type === 'sent' ? 'sent' : 'received'}`}
                        ref={index === messages.length - 1 ? latestMessageRef : null} // Assign ref to the latest message
                    >
                        {msg.type === 'sent' ? msg.text : <ReactMarkdown>{msg.text}</ReactMarkdown>}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {loading && (
                <div className="loading-bars">
                    <LoadingBar variant="gen-ai-masked" />
                    <LoadingBar variant="gen-ai-masked" />
                    <LoadingBar variant="gen-ai-masked" />
                </div>
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

/**
 * Chat Pop up
 */
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
        try {
            const response = await chat(message);
            handleReceive(response);
        } catch (error) {
            console.error('Error sending message:', error);
            setLoading(false);
        }
    };

    const handleReceive = (messageText) => {
        setLoading(false);
        setMessages((prevMessages) => [...prevMessages, { type: 'received', text: messageText }]);
    };

    async function chat(message) {
        const input = { message: message.text };

        const response = await fetch(`${LOCAL_HOST}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.text();
        return result;
    }

    return (
        <div className="App">
            <button className="chat-button" onClick={toggleChat}>
                <img src={geminiIcon} alt="Gemini AI Icon" className="icon" />
            </button>
            <ChatWindow
                isVisible={isChatVisible}
                onClose={toggleChat}
                messages={messages}
                onSend={handleSend}
                loading={loading}
            />
        </div>
    );
};

export default ChatPopUp;
