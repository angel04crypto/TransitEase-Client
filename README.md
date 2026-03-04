##TransitEase – Client (Frontend)


## Live Demo

🔗 **Frontend (Vercel)**  
https://transit-ease-client.vercel.app

⚙️ **Backend API (Railway)**  
https://transitease-server-production.up.railway.app


##Overview
TransitEase is a full-stack travel aggregation platform that allows users to:
1. Search intercity transport routes
2. View dynamically generated pricing
3. Authenticate securely using Firebase
4. Initiate bookings
5. Redirect to official provider websites for payment
6.View booking history in a protected dashboard

This frontend is built using React + Vite and communicates with a Node.js/Express backend.


##Tech Stack
1. React
2. Vite
3. Axios
4. Firebase Authentication
5. Tailwind CSS
6. Framer Motion
7. Lucide Icons


##Features
1. User authentication (Firebase)
2. Protected routes
3. Search & filter journeys
4. Dynamic pricing display
5. Booking initiation
6. Travel history dashboard
7. External provider redirection


##Environment Variables
Create a .env file in the client root:
VITE_API_BASE_URL=http://localhost:5000/api


##Installation
1. npm install


##Run Development Server

2. npm run dev


##App runs on:
http://localhost:5174


#Architecture Flow
•User logs in via Firebase.
•Frontend fetches available routes from backend.
•User selects journey.
•Booking is recorded in database.
•User is redirected to official provider website.
•User can view booking history under "My Trips".

