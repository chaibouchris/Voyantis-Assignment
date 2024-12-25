import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api';

function App() {
  const [queues, setQueues] = useState({});
  const [selectedQueue, setSelectedQueue] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState(null);
  const [newQueueName, setNewQueueName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueues();
  }, []);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const fetchQueues = async () => {
    try {
      const response = await axios.get(`${API_URL}/queues`);
      setQueues(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch queues:', error);
      showError('Failed to fetch queues.');
    }
  };

  const createQueue = async (queueName) => {
    if (!queueName.trim()) {
      showError('Queue name cannot be empty.');
      return;
    }
    try {
      await axios.post(`${API_URL}/queues/${queueName}`);
      fetchQueues();
      setNewQueueName('');
      setError(null);
    } catch (error) {
      console.error('Failed to create queue:', error);
      showError('Failed to create queue.');
    }
  };

  const addMessageToQueue = async () => {
    if (!selectedQueue || !newMessage.trim()) {
      showError('Please select a queue and enter a message.');
      return;
    }
    try {
      await axios.post(`${API_URL}/${selectedQueue}`, newMessage, {
        headers: { 'Content-Type': 'text/plain' },
      });
      setNewMessage('');
      fetchQueues();
      setError(null);
    } catch (error) {
      console.error('Failed to add message:', error);
      showError('Failed to add message.');
    }
  };

  const fetchMessageFromQueue = async () => {
    if (!selectedQueue) {
      showError('Please select a queue.');
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/${selectedQueue}`);
      setRetrievedMessage(response.data || 'No message available');
      fetchQueues();
      setError(null);
    } catch (error) {
      console.error('Failed to fetch message:', error);
      showError('Failed to fetch message.');
    }
  };

  return (
      <div className="App">
        <img src="/assets/voyantis-logo.png" alt="Voyantis Logo" className="logo" />
        <h1>Queue Manager</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="create-queue">
          <h2>Create a New Queue</h2>
          <input
              type="text"
              placeholder="Enter queue name"
              value={newQueueName}
              onChange={(e) => setNewQueueName(e.target.value)}
          />
          <button onClick={() => createQueue(newQueueName)}>Create Queue</button>
        </div>

        <div className="queue-list">
          <h2>Available Queues</h2>
          <ul>
            {Object.keys(queues).map((queueName) => (
                <li
                    key={queueName}
                    className={queueName === selectedQueue ? 'selected-queue' : ''}
                    onClick={() => setSelectedQueue(queueName)}
                >
                  <span>{queueName} - {queues[queueName]} messages</span>
                </li>
            ))}
          </ul>
        </div>

        <div className="message-controls">
          <h2>Manage Messages</h2>
          <input
              type="text"
              placeholder="Enter a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={addMessageToQueue}>Add Message</button>

          <div className="go-button-container">
            <button onClick={fetchMessageFromQueue}>Go</button>
          </div>

          {retrievedMessage && (
              <p>
                <strong>Message:</strong> {retrievedMessage}
              </p>
          )}
        </div>
      </div>
  );



}

export default App;
