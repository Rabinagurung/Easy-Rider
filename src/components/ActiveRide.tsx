import { Image, ScrollView, View } from 'react-native';
import DriverCard from './DriverCard';
import { Button, Card, Icon } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { initialRegion } from '../screens/MapScreen';
import MyBookingCard from './MyBookingCard';
import { useAppTheme } from '../themes/theme';
import Loader from './Loader';
import useDriver from '../hooks/useDriver';
import useVehicle from '../hooks/useVehicle';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navgiation/MainNavigator';
import useUpdateBookingStatus from '../hooks/useBookingStatus';
import { Booking, BookingStatus } from '../types/Booking';
import NoBookingCard from './NoBookingCard';

interface ActiveRideProps {
  booking: Booking | null;
  isLoading: boolean;
}
const ActiveRide = ({ booking, isLoading }: ActiveRideProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useAppTheme();

  const { showAlert } = useUpdateBookingStatus(booking?.id);

  const { driver, isLoading: isDriverLoading } = useDriver(booking?.driverID);
  const { vehicle, isLoading: isVehicleLoading } = useVehicle(
    booking?.vehicleID
  );
  if (isLoading || isDriverLoading || isVehicleLoading) {
    return <Loader />;
  }

  if (!booking || !driver || !vehicle) {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <NoBookingCard onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexGrow: 1, paddingBottom: 30, paddingHorizontal: 15 }}>
          <DriverCard
            driverCar={vehicle?.image}
            showCar
            driverImage={driver.imageUrl}
            driverName={driver.name}
            driverRating={driver.rating}
            totalReviews={driver.reviews.length}
            bookingPrice={booking.price || 0}
          />
          <View style={{ height: 30 }} />
          <MyBookingCard
            bookingId={booking.id}
            status={booking.status}
            originAddress={booking.origin.address}
            destinationAddress={booking.destination?.address}
            bookingPrice={booking.price}
          />
          <View style={{ height: 30 }} />

          <Card>
            <Card.Title
              title='Origin'
              titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            />

            <MapView
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              initialRegion={{ ...initialRegion, ...booking.origin }}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 10
              }}>
              <Marker coordinate={booking.origin} title='You'>
                <Image
                  source={require('../../assets/images/map_pin.png')}
                  style={{ height: 30, width: 20, objectFit: 'contain' }}
                />
              </Marker>
            </MapView>
          </Card>
          <View style={{ height: 30 }} />
          <Card>
            <Card.Title
              title='Destination'
              titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            />
            <MapView
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              initialRegion={{ ...initialRegion, ...booking.destination }}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 10
              }}>
              <Marker coordinate={booking.destination} title='You'>
                <View style={{ backgroundColor: 'transparent' }}>
                  <Icon
                    source='map-marker'
                    size={30}
                    color={colors.primary900}
                  />
                </View>
              </Marker>
            </MapView>
          </Card>
        </View>
      </ScrollView>
      <Card
        style={{
          borderRadius: 0
        }}>
        {booking.status === 'active' && (
          <Card.Actions>
            <Button
              mode='outlined'
              labelStyle={{ color: colors.primary }}
              style={{
                borderColor: colors.primary
              }}
              onPress={() =>
                showAlert(
                  'Complete Ride',
                  'Are you sure you want to cancel this ride?',
                  BookingStatus.Cancelled
                )
              }>
              Cancel Booking
            </Button>
            <Button
              onPress={() =>
                showAlert(
                  'Complete Ride',
                  'Are you sure you want to complete this ride?',
                  BookingStatus.Completed
                )
              }
              style={{ borderColor: colors.primary }}>
              Complete Ride
            </Button>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

export default ActiveRide;
