import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from '../../types/User';
import { db } from '../../config/firebaseConfig';

export const userData: User = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  roles: ['rider'],
  phone: '+1234567890',
  activeBooking: null, // or null if no active booking
  pastBookings: []
};

export const addUser = async (userId: string, userData: User) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
    console.log('User added with ID:', userId);
  } catch (error) {
    console.error('Error adding user: ', error);
  }
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log('No such user!');
    return null;
  }
};

// Update a user's data
export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, userData);
    console.log('User updated with ID:', userId);
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};
