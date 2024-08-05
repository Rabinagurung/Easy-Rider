import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Driver } from '../../types/Driver';

export const addDriver = async (driverId: string, driverData: Driver) => {
  try {
    await setDoc(doc(db, 'drivers', driverId), driverData);
    console.log('Driver added with ID:', driverId);
  } catch (error) {
    console.error('Error adding driver: ', error);
  }
};

export const getDriver = async (driverId: string) => {
  const driverRef = doc(db, 'drivers', driverId);
  const driverSnap = await getDoc(driverRef);

  if (driverSnap.exists()) {
    return driverSnap.data() as Driver;
  } else {
    console.log('No such driver!');
    return null;
  }
};

export const fetchAllDriversWithVehicles = async () => {
  try {
    const driversCollection = collection(db, 'drivers');
    const driversSnapshot = await getDocs(driversCollection);
    const drivers = await Promise.all(
      driversSnapshot.docs.map(async (driverDoc) => {
        const driverData = driverDoc.data() as Driver;

        //@ts-ignore
        const vehicleRef = doc(db, 'vehicles', driverData.vehicle);
        const vehicleSnap = await getDoc(vehicleRef);

        const vehicle = vehicleSnap.data() as any;
        if (vehicleSnap.exists()) {
          return {
            ...driverData,
            vehicle: {
              ...vehicle,
              id: driverData.vehicle
            },
            id: driverDoc.id
          };
        } else {
          return { ...driverData, id: driverDoc.id, vehicle: null };
        }
      })
    );
    return drivers as Driver[];
  } catch (error) {
    console.error('Error fetching drivers with vehicles: ', error);
  }
};
