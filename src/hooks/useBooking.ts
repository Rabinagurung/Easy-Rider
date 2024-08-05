import { useState, useEffect } from 'react';
import { fetchBookingById } from '../api/firestore/bookings';
import { Booking } from '../types/Booking';

const useBooking = (bookingId: string | null) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setBooking(null);
      setIsLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const fetchedBooking = await fetchBookingById(bookingId);
        setBooking(fetchedBooking);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching booking');
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return { booking, isLoading, error };
};

export default useBooking;
