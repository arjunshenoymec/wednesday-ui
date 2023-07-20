import React, { useState } from 'react';
import { Input, Textarea, Button } from '@mantine/core';
import './Chat.css'; // Import the CSS file
import { RiSendPlane2Line } from 'react-icons/ri';
import MessageContainer from './MessageContainer';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Add your logic to handle sending the message
    console.log('Sending message:', message);
    // Add the new message to the messages array
    setMessages([...messages, message]);
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <MessageContainer messages={messages} />
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
            style={{ marginLeft: '-20px' }}
            variant="subtle"
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
