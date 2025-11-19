# 🚀 Discord Clone — MERN Stack (Frontend + Backend)

A real-time chat application inspired by Discord, built using the **MERN stack** with **live communication**, **channel management**, and **persistent messaging**.  
This project demonstrates full-stack development skills using **MongoDB, Express, React, Node.js**, and **Pusher** for real-time updates.

---

## 📁 Project Structure

```
Discord-clone/
│
├── discord-frontend/     # React frontend (channels, chat UI, Redux)
├── discord-backend/      # Express + MongoDB backend (API + Pusher)
└── README.md             # Project documentation
```

---

# ✨ Features

### 🔹 Real-Time Messaging (Pusher)
Messages appear instantly across all clients with WebSocket-powered updates.

### 🔹 Channel System
- Create new chat channels  
- Fetch channels from MongoDB  
- Messages are tied to individual channels

### 🔹 Modern React Frontend
- Functional components  
- Redux (user + channel state)  
- Axios API calls  
- Styled UI similar to Discord

### 🔹 RESTful Backend API
- Create channels  
- Post messages  
- Fetch conversation history  
- MongoDB persistence using Mongoose

### 🔹 Cloud Database
Uses **MongoDB Atlas** for scalable cloud storage.

### 🔹 Fully Decoupled Frontend + Backend
Independent folders with their own dependencies.

---

# 🛠️ Technologies Used

### **Frontend**
- React  
- Redux  
- Axios  
- Material-UI Icons  
- CSS Modules  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Pusher  
- CORS  
- Nodemon (dev)  

---

# 🚀 Getting Started

## 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/Discord-clone.git
cd Discord-clone
```

---

# ⚙️ Backend Setup (`discord-backend`)

### Install dependencies
```bash
cd discord-backend
npm install
```

### Add your environment variables  
Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PUSHER_APP_ID=xxx
PUSHER_KEY=xxx
PUSHER_SECRET=xxx
PUSHER_CLUSTER=us2
```

### Start the server
```bash
npm start
```

Server runs at:

```
http://localhost:8002
```

---

# 💻 Frontend Setup (`discord-frontend`)

### Install dependencies
```bash
cd ../discord-frontend
npm install
```

### Start React client
```bash
npm start
```

React app runs at:

```
http://localhost:3000
```

---

# 🔗 API Endpoints

### Get Channel List
`GET /get/channelList`

### Create Channel
`POST /new/channel`

### Get Conversation
`GET /get/conversation?id=<channel_id>`

### Post Message
`POST /new/message`

---

# 👨‍💻 Author

**Felix Liu**  
Full-Stack & Embedded Engineer

---

# 📝 License
MIT License — free to use, modify, and share.
