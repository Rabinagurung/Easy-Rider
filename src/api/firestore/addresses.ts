import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Address } from '../../types/Address';

// Function to add an address
export const fetchAddressesByType = async (
  type: string
): Promise<Address[]> => {
  const q = query(collection(db, 'addresses'), where('type', '==', type));
  const querySnapshot = await getDocs(q);
  const addresses = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    type: doc.data().type,
    address: doc.data().address,
    latitude: doc.data().latitude,
    longitude: doc.data().longitude
  })) as Address[];
  return addresses;
};
