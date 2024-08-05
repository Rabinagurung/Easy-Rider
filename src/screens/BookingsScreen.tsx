import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import ActiveRide from '../components/ActiveRide';
import useActiveBooking from '../hooks/useActiveBooking';
import BookingsCompletedList from '../components/bookings/BookingCompletedList';
import { DEFAULT_USER_ID } from '../utils/constants';
import { BookingStatus } from '../types/Booking';
import BookingsCancelledList from '../components/bookings/BookingCancelledList';

const BookingsScreen = () => {
  const { colors } = useAppTheme();
  const [value, setValue] = useState('active');
  const { activeBooking, isLoading } = useActiveBooking(DEFAULT_USER_ID);

  const buttons = [
    {
      value: 'active',
      label: 'Active',
      checkedColor: colors.background,
      style: {
        backgroundColor: value === 'active' ? colors.primary : colors.primary50,
        borderColor: colors.primary
      }
    },
    {
      value: 'completed',
      label: 'Completed',
      checkedColor: colors.background,
      style: {
        backgroundColor:
          value === 'completed' ? colors.primary : colors.primary50,
        borderColor: colors.primary
      }
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      checkedColor: colors.background,
      style: {
        backgroundColor:
          value === 'cancelled' ? colors.primary : colors.primary50,
        borderColor: colors.primary
      }
    }
  ];

  const renderSection = () => {
    if (value === 'active') {
      return <ActiveRide booking={activeBooking} isLoading={isLoading} />;
    }
    if (value === 'completed') {
      return (
        <BookingsCompletedList
          userId={DEFAULT_USER_ID}
          status={BookingStatus.Completed}
        />
      );
    }
    return <BookingsCancelledList />;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={buttons}
        />
      </View>

      <View style={{ height: 30 }} />
      {renderSection()}
    </View>
  );
};

export default BookingsScreen;
