import { useState, useEffect } from 'react';
import { Vehicle } from '../types/Car';
import { getVehicle } from '../api/firestore/vehicles';

const useVehicle = (vehicleID: string | undefined) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!vehicleID) return;

    const fetchVehicle = async () => {
      setIsLoading(true);
      const vehicleData = await getVehicle(vehicleID);
      setVehicle(vehicleData);
      setIsLoading(false);
    };

    fetchVehicle();
  }, [vehicleID]);

  return {
    vehicle,
    isLoading
  };
};

export default useVehicle;
