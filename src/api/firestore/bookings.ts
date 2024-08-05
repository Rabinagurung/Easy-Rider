import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Booking, BookingStatus, NewBooking } from '../../types/Booking';
import { fetchAddressesByType } from './addresses';
import { getRandomItem } from '../../utils/getRandomItem';

export const addBooking = async (bookingData: NewBooking) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    console.log('Booking added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding booking: ', error);
  }
};

export const bookRide = async (
  driverId: string,
  vehicleId: string,
  price: number
) => {
  try {
    const origins = await fetchAddressesByType('origin');
    const destinations = await fetchAddressesByType('destination');

    const origin = getRandomItem(origins);
    const destination = getRandomItem(destinations);

    const bookingData = {
      userID: 'userId_1',
      driverID: driverId,
      vehicleID: vehicleId,
      origin: origin,
      destination: destination,
      status: BookingStatus.Active,
      price: price,
      timestamp: new Date()
    };

    await addBooking(bookingData);
    console.log('Ride booked successfully!');
  } catch (error) {
    console.error('Error booking ride:', error);
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string
) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: status
    });
    console.log('Booking status updated for ID:', bookingId);
  } catch (error) {
    console.error('Error updating booking status: ', error);
  }
};

export const fetchBookingsByStatus = async (userId: string, status: string) => {
  const q = query(
    collection(db, 'bookings'),
    where('userID', '==', userId),
    where('status', '==', status)
  );
  const querySnapshot = await getDocs(q);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return bookings;
};

export const fetchBookingById = async (
  bookingId: string
): Promise<Booking | null> => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.exists()) {
      return { id: bookingSnap.id, ...bookingSnap.data() } as Booking;
    } else {
      console.log('No such booking!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching booking: ', error);
    throw error;
  }
};
