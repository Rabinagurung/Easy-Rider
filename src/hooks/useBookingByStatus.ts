import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { Booking } from '../types/Booking';

const useBookingsByStatus = (userId: string, status: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const db = getFirestore();
      try {
        setLoading(true);
        const q = query(
          collection(db, 'bookings'),
          where('userID', '==', userId),
          where('status', '==', status)
        );
        const querySnapshot = await getDocs(q);
        const bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(bookings);
        setLoading(false);
      } catch (err) {
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, status]);

  return { bookings, loading, error };
};

export default useBookingsByStatus;
