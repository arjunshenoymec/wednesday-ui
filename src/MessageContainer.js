import React, { useRef, useEffect } from 'react';
import './MessageContainer.css';
import { Table } from '@mantine/core';

const MessageContainer = ({ messages }) => {
  const messageTableRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message table whenever a new message is added
    const messageTable = messageTableRef.current;
    if (messageTable) {
      messageTable.scrollTop = messageTable.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-container">
      <Table striped ref={messageTableRef}>
        <tbody>
          {messages.map((message, index) => (
            <tr>
              <td>{message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MessageContainer;
