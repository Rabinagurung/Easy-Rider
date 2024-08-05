import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import typography from '../styles/typography';
import { useNavigation } from '@react-navigation/native';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';
import { useEffect } from 'react';
import { updateBookingStatus } from '../api/firestore/bookings';
import { BookingStatus } from '../types/Booking';

interface CompletedRideScreenProps {
  route: { params: { bookingId: string } };
}
const CompletedRideScreen = ({ route }: CompletedRideScreenProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { bookingId } = route.params;

  useEffect(() => {
    if (!bookingId) return;
    (async () => {
      await updateBookingStatus(bookingId, BookingStatus.Completed);
    })();
  }, [bookingId]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LottieView
        source={require('../../assets/confirm.json')}
        style={{ width: '100%', height: '60%' }}
        autoPlay
        loop={false}
      />
      <Text style={typography.headlineLgMedium}>Congratulations🎉.</Text>
      <Text
        style={[
          typography.headlineLgMedium,
          { textAlign: 'center', marginHorizontal: 20, marginTop: 10 }
        ]}>
        You've completed the ride. Thank you for riding with us.
      </Text>
      <Button
        mode='contained'
        style={{ marginTop: 20 }}
        onPress={() => navigation.popToTop()}>
        Done
      </Button>
    </View>
  );
};
export default CompletedRideScreen;
