import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Vehicle } from '../../types/Car';

export const getDriverWithVehicle = async (driverId: string) => {
  try {
    // Fetch driver data
    const driverRef = doc(db, 'drivers', driverId);
    const driverSnap = await getDoc(driverRef);

    if (driverSnap.exists()) {
      const driverData = driverSnap.data();
      const vehicleId = driverData.vehicleId;

      // Fetch vehicle data
      const vehicleRef = doc(db, 'vehicles', vehicleId);
      const vehicleSnap = await getDoc(vehicleRef);

      if (vehicleSnap.exists()) {
        const vehicleData = vehicleSnap.data();
        return { ...driverData, vehicle: vehicleData };
      } else {
        console.log('No such vehicle!');
        return driverData;
      }
    } else {
      console.log('No such driver!');
    }
  } catch (error) {
    console.error('Error fetching driver and vehicle: ', error);
  }
};

export const getVehicle = async (vehicleId: string) => {
  const vehicleRef = doc(db, 'vehicles', vehicleId);
  const vehicleSnap = await getDoc(vehicleRef);

  if (vehicleSnap.exists()) {
    return vehicleSnap.data() as Vehicle;
  } else {
    console.log('No such vehicle!');
    return null;
  }
};
