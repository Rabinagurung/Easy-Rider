import ActiveRide from '../components/ActiveRide';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useBooking from '../hooks/useBooking';
import { View } from 'react-native';

interface MyBookingDetailScreenProps {
  route: { params: { bookingId: string } };
}
const MyBookingDetailScreen = ({ route }: MyBookingDetailScreenProps) => {
  const bookingId = route.params.bookingId;
  const { booking, isLoading } = useBooking(bookingId);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ActiveRide booking={booking} isLoading={isLoading} />
    </View>
  );
};

export default MyBookingDetailScreen;
