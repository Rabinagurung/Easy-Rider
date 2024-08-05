import { useCallback } from 'react';
import { Alert } from 'react-native';
import { BookingStatus } from '../types/Booking';
import { updateBookingStatus } from '../api/firestore/bookings';

const useUpdateBookingStatus = (activeBookingId: string | undefined) => {
  const updateStatus = useCallback(
    async (status: BookingStatus) => {
      if (!activeBookingId) return;
      try {
        await updateBookingStatus(activeBookingId, status);
      } catch (error) {
        console.log('Error updating booking status', error);
      }
    },
    [activeBookingId]
  );

  const showAlert = useCallback(
    (title: string, message: string, status: BookingStatus) => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Yes', onPress: () => updateStatus(status) }
        ],
        { cancelable: false }
      );
    },
    [updateStatus]
  );

  return { showAlert, updateStatus };
};

export default useUpdateBookingStatus;
