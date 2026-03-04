# TransitEase — Client (Frontend)

TransitEase is a full-stack **travel aggregation platform** that allows users to search, compare, and initiate bookings across multiple transport modes including **Trains, Buses, Flights, and Cars**.

The frontend is built with **React + Vite** and communicates with a Node.js / Express backend to fetch transport routes, manage authentication, and handle booking workflows.

---

# 🌐 Live Demo

Frontend (Vercel)
https://transit-ease-client.vercel.app

Backend API (Railway)
https://transitease-server-production.up.railway.app

---

# 📌 Overview

TransitEase enables users to:

• Search intercity transport routes
• View dynamically generated pricing and availability
• Authenticate securely using Firebase Authentication
• Initiate transport bookings
• Redirect to official provider websites for payment
• View booking history in a protected dashboard

The application follows a **modern SPA architecture** with secure API communication.

---

# ✨ Features

• Firebase user authentication (Email / Password)
• Protected routes for authenticated users
• Multi-transport search (Train, Bus, Flight, Car)
• Dynamic pricing and transport details display
• Booking initiation workflow
• Travel history dashboard (My Trips)
• External provider redirection for final booking

---

# 🧰 Tech Stack

### Frontend

React
Vite
Axios
Firebase Authentication
Tailwind CSS
Framer Motion
Lucide Icons

### Backend Communication

Node.js / Express REST API
MongoDB Atlas Database

---

# 📁 Project Structure

```
client/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # Authentication context
│   ├── firebase/          # Firebase configuration
│   ├── pages/             # Application pages
│   │   ├── Home
│   │   ├── Results
│   │   ├── Details
│   │   └── MyTrips
│   ├── services/          # Axios API service
│   └── App.jsx            # Root component
│
├── public/
├── index.html
└── vite.config.js
```

---

# ⚙️ Environment Variables

Create a `.env` file in the **client root directory**:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

This variable defines the backend API endpoint used by the frontend.

---

# 🖥️ Local Development Setup

## 1. Install Dependencies

```
npm install
```

---

## 2. Start Development Server

```
npm run dev
```

Frontend will run on:

```
http://localhost:5174
```

---

# 🔄 Application Architecture Flow

1. User logs in using Firebase Authentication.
2. Frontend sends transport search requests to backend APIs.
3. Backend returns filtered transport data from MongoDB.
4. User selects a journey and initiates booking.
5. Booking information is stored in the backend database.
6. User is redirected to the official provider website for payment.
7. Booking history can be viewed in the **My Trips dashboard**.

---

# 🚀 Deployment

Frontend: Vercel
Backend: Railway
Database: MongoDB Atlas

---

This frontend demonstrates **modern React architecture, secure authentication workflows, and scalable API integration for travel aggregation systems**.
