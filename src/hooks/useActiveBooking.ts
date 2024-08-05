import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { Booking } from '../types/Booking';

const useActiveBooking = (userId: string) => {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    const bookingsCollection = collection(db, 'bookings');
    const q = query(
      bookingsCollection,
      where('userID', '==', userId),
      where('status', '==', 'active')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const booking = querySnapshot.docs[0].data() as Booking;
        setHasActiveBooking(true);
        setActiveBooking({ ...booking, id: querySnapshot.docs[0].id });
      } else {
        setHasActiveBooking(false);
        setActiveBooking(null);
      }
      setisLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return {
    hasActiveBooking,
    activeBooking,
    isLoading
  };
};

export default useActiveBooking;
