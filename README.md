# StreamMate 🎬
A real-time watch party platform where users can create rooms, sync video playback, and chat together using MERN Stack and Socket.io.

## 🔗 Live Demo

- **Frontend (Vercel)**:  
  👉 https://stream-mate-tau.vercel.app/

- **Backend (Render)**:  
  👉 https://streammate-fwfs.onrender.com/

> ⚠️ **Deployment Note:** This project uses Render's free hosting for the backend. After periods of inactivity, the server may take up to a minute to restart. If requests fail on the first attempt, please wait briefly, refresh the page, and try again.

## Features

- **Real-Time Synchronized Streaming**: Watch videos together with synchronized play, pause, seek, and playback controls powered by Socket.IO.
- **Private & Public Watch Rooms**: Create secure rooms with optional password protection or join public sessions via room codes.
- **Host-Controlled Playback**: Only the host can control media playback, ensuring a seamless shared viewing experience.
- **Live Group Chat**: Chat with participants in real time while watching videos together
- **User Authentication**: Secure JWT-based authentication with email OTP verification and password encryption.
- **Cloud-Based Profile Images**: Upload and manage profile pictures securely using Cloudinary.
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS.
- **Toast Notifications**: Instant feedback for user actions with react-hot-toast

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Real-Time Communication:** Socket.IO Client
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Real-Time Communication:** Socket.IO
- **Image Storage:** Cloudinary
- **Email Service:** Nodemailer 
- **Utilities**: CORS, dotenv, bcryptjs, JWT

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 📋 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB Atlas account (or a local MongoDB instance)
- Cloudinary account
- SMTP email credentials (for OTP verification)

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bishtarun169/StreamMate.git
cd StreamMate
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```
### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
``

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Start the Backend

```bash
cd server
npm run dev
```

Backend will be available at:

```
http://localhost:5000
```

---

### Start the Frontend

Open a new terminal.

```bash
cd client
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

## 📁 Project Structure

```text
StreamMate/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   └── package.json
│
└── README.md
```

## 🚀 Production Build

### Frontend

```bash
cd client
npm run build
```
### Backend

```bash
cd server
npm start
```

## 🤝 Contributing
Contributions, suggestions, and bug reports are welcome. If you'd like to improve the project, feel free to fork the repository, create a feature branch, and submit a pull request.

## 📄 License
This project is licensed under the **MIT License**. See the `LICENSE` file for more information.

<div align="center">
**Built with ❤️ using React, Node.js, Express.js, MongoDB, Socket.IO, Tailwind CSS, and Cloudinary.**
If you found this project useful, consider giving it a ⭐ on GitHub.

</div>
