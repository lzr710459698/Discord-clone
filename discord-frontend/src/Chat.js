import React, { useState, useEffect } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CradGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
//import db from './firebase';
//import firebase from 'firebase';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('29690bd659134b21c0fb', {
cluster: 'us2'
});


const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

const getConversation = (channelId) => {
  console.log('getConversation called with channelId:', channelId);

  if (channelId) {
    axios
      .get(`/get/conversation?id=${channelId}`)
      .then((res) => {
        console.log('/get/conversation response data:', res.data);

        // ✅ res.data is an object with a "conversation" field
        const conversation = res.data?.conversation || [];

        console.log('parsed conversation:', conversation);
        setMessages(conversation);
      })
      .catch((err) => {
        console.error('Error fetching conversation:', err);
        setMessages([]);
      });
  } else {
    setMessages([]);
  }
};



  useEffect(() => {
    getConversation(channelId);
    const channel = pusher.subscribe('conversation');
    channel.bind('newMessage', function(data) {
      getConversation(channelId);

    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`/new/message?id=${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user: user
    })



    setInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
      <Message
        key={message._id || message.timestamp}   // ✅ add a key
        message={message.message}
        timestamp={message.timestamp}
        user={message.user}
      />
    ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              channelId ? `Message #${channelName}` : 'Select a channel to start chatting'
            }
          />
          <button
            className="chat__inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcon">
          <CradGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
