import { View, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';
import DriverCard from './DriverCard';
import { useAppTheme } from '../themes/theme';
import typography from '../styles/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useActiveBooking from '../hooks/useActiveBooking';
import { BookingStatus } from '../types/Booking';
import { updateBookingStatus } from '../api/firestore/bookings';
import useDriver from '../hooks/useDriver';
import useVehicle from '../hooks/useVehicle';
import { useNavigation } from '@react-navigation/native';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';

const BottomDriverIncomingSheet = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { activeBooking } = useActiveBooking('userId_1');

  const { driver, isLoading: isDriverLoading } = useDriver(
    activeBooking?.driverID
  );
  const { vehicle, isLoading: isVehicleLoading } = useVehicle(
    activeBooking?.vehicleID
  );

  const handleCallPress = () => {
    Linking.openURL(`tel:+12333333333`).catch(() => {
      Alert.alert('Error', 'Call can be made only on real devices');
    });
  };

  const handleMessagePress = () => {
    Linking.openURL(`sms:+12333333333`);
  };
  const completeRide = async (status: BookingStatus) => {
    if (!activeBooking?.id) return;
    try {
      if (status === BookingStatus.Completed) {
        navigation.navigate('Completed', {
          bookingId: activeBooking?.id
        });
      } else {
        await updateBookingStatus(activeBooking?.id, BookingStatus.Cancelled);
      }
    } catch (error) {
      console.log('Error updating booking status', error);
    }
  };

  const showAlertComplete = () => {
    Alert.alert(
      'Complete Ride',
      'Are you sure you want to complete the ride?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => completeRide(BookingStatus.Completed) }
      ],
      { cancelable: false }
    );
  };

  if (isDriverLoading || isVehicleLoading) {
    return null;
  }

  const showAlertCancel = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel the ride?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => completeRide(BookingStatus.Cancelled) },
        {}
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={[styles.container]}>
      <Card
        style={{
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: colors.background,
          paddingBottom: insets.bottom
        }}>
        <Card.Content>
          <Text style={[typography.subheadLgMedium, { marginBottom: 10 }]}>
            Your driver is on the way!
          </Text>

          {driver && vehicle && (
            <DriverCard
              showCar
              driverName={driver?.name}
              driverRating={driver?.rating}
              driverImage={driver?.imageUrl}
              totalReviews={driver?.reviews.length}
              driverCar={vehicle?.image}
              bookingPrice={activeBooking?.price || 0}
            />
          )}
        </Card.Content>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center'
          }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={handleCallPress}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon source='phone' size={35} color={colors.primary} />
            </Pressable>
            <Pressable
              onPress={handleMessagePress}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon
                source='message-processing-outline'
                size={35}
                color={colors.primary}
              />
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Button
              mode='outlined'
              onPress={showAlertCancel}
              style={{
                borderColor: colors.primary
              }}>
              Cancel
            </Button>
            <Button mode='contained' onPress={showAlertComplete}>
              Complete Ride
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default BottomDriverIncomingSheet;
