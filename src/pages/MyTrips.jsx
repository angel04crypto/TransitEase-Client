import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading trips...</div>;

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-3xl font-bold mb-8">Travel Manifest</h2>

      {bookings.length === 0 ? (
        <div className="text-center opacity-60">
          No Recorded Journeys
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-6 border rounded-xl shadow">
              <h3 className="text-xl font-bold">
                {booking.transport?.source} → {booking.transport?.destination}
              </h3>
              <p>Mode: {booking.transport?.type}</p>
              <p>Date: {booking.travelDate}</p>
              <p>Price: ₹{booking.bookedPrice}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;