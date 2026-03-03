#TransitEase – Client (Frontend)


#Overview
TransitEase is a full-stack travel aggregation platform that allows users to:
•Search intercity transport routes
•View dynamically generated pricing
•Authenticate securely using Firebase
•Initiate bookings
•Redirect to official provider websites for payment
•View booking history in a protected dashboard

This frontend is built using React + Vite and communicates with a Node.js/Express backend.


#Tech Stack
•React
•Vite
•Axios
•Firebase Authentication
•Tailwind CSS
•Framer Motion
•Lucide Icons


#Features
•User authentication (Firebase)
•Protected routes
•Search & filter journeys
•Dynamic pricing display
•Booking initiation
•Travel history dashboard
•External provider redirection


#Environment Variables
Create a .env file in the client root:
VITE_API_BASE_URL=http://localhost:5000/api


#Installation
npm install


#Run Development Server
npm run dev


#App runs on:
http://localhost:5174


#Architecture Flow
•User logs in via Firebase.
•Frontend fetches available routes from backend.
•User selects journey.
•Booking is recorded in database.
•User is redirected to official provider website.
•User can view booking history under "My Trips".

