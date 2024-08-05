import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import typography from '../styles/typography';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';
import { Driver } from '../types/Driver';

interface ConfirmationScreenProps {
  navigation: DetailScreenNavigationProp;
  route: { params: { driver: Driver; bookingPrice: number } };
}
const ConfirmationScreen = ({ navigation, route }: ConfirmationScreenProps) => {
  const { driver } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LottieView
        source={require('../../assets/confirm.json')}
        style={{ width: '100%', height: '60%' }}
        autoPlay
        loop={false}
      />
      <Text style={typography.headlineLgMedium}>Booking Confirmed 🎉.</Text>
      <Text
        style={[
          typography.headlineLgMedium,
          { textAlign: 'center', marginHorizontal: 20, marginTop: 10 }
        ]}>
        Your booking has been confirmed with {driver.name}.
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
export default ConfirmationScreen;
