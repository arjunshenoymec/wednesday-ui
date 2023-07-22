import React, { useState } from 'react';
import { Textarea, Button } from '@mantine/core';
import './Chat.css'; // Import the CSS file
import { RiSendPlane2Line } from 'react-icons/ri';
import { ChatFeed, Message } from 'react-chat-ui';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    // Add your logic to handle sending the message
    console.log('Sending message:', message);
    // Add the new message to the messages array
    const userMessage = new Message({id: 0, message: message, senderName: 'User'});
    setMessages([...messages, userMessage]);
    setMessage('');
    await sendResponse(userMessage);
  };

  const sendResponse = async (userMessage) => {
    setIsTyping(true);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const {message} = userMessage;
    const url = 'http://localhost:8080/query';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: message})
    });
    const data = await response.json();
    const reply = data.response;
    setMessages([...messages, userMessage, new Message({ id: 1, message: reply, senderName: 'Wednesday' })]);
    setIsTyping(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <ChatFeed className="message-pannel"
        messages={messages.map((msg) => ({
          ...msg,
          message: (
            <ReactMarkdown>{msg.message}</ReactMarkdown>
          ),
        }))}
        showSenderName
        bubbleStyles={{ text: { fontSize: 16, lineHeight: '1.5' },
        chatbubble: { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      background: 'linear-gradient(135deg, #00b4db, #0083b0)',
                      overflow: 'auto'
                    },
        userBubble: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          background: 'linear-gradient(135deg, #cccccc, #999999)'
        }
       }}
      />
      {isTyping && <div className="computer-typing">Generating response...</div>}
      <div className="input-container">
        <Textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="chat-input"
          onKeyPress={handleKeyPress}
          rightSection={
            <Button 
            onClick={handleSendMessage}
            style={{ marginLeft: '-35px', fontSize: '20px' }}
            variant="white"
            size={"md"}
            color="blue">
              <RiSendPlane2Line />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Chat;
