import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
import './Chat.css'; // Import the CSS file
import { ChevronIcon } from '@mantine/core';
import { RiSendPlane2Line } from 'react-icons/ri';

const Chat = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Add your logic to handle sending the message
    console.log('Sending message:', message);
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
      <div className="input-container">
        <Input
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
