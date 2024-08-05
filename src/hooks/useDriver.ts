import { useState, useEffect } from 'react';
import { getDriver } from '../api/firestore/driver';
import { Driver } from '../types/Driver';

const useDriver = (driverID: string | undefined) => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!driverID) return;

    const fetchDriver = async () => {
      setIsLoading(true);
      const driverData = await getDriver(driverID);
      setDriver(driverData);
      setIsLoading(false);
    };

    fetchDriver();
  }, [driverID]);

  return {
    driver,
    isLoading
  };
};

export default useDriver;
