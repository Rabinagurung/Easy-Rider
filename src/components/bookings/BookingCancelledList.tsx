import React from 'react';
import { View, Text, FlatList } from 'react-native';
import useBookingsByStatus from '../../hooks/useBookingByStatus';
import { BookingStatus } from '../../types/Booking';
import NoBookingCard from '../NoBookingCard';
import { useNavigation } from '@react-navigation/native';
import { DetailScreenNavigationProp } from '../../navgiation/MainNavigator';
import typography from '../../styles/typography';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../../themes/theme';
import { DEFAULT_USER_ID } from '../../utils/constants';
import useDriver from '../../hooks/useDriver';
import useVehicle from '../../hooks/useVehicle';

interface CancelledCardProps {
  bookingId: string;
  driverId: string;
  vehicleId: string;
}
const CancelledCard = ({
  bookingId,
  driverId,
  vehicleId
}: CancelledCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { colors } = useAppTheme();

  const { driver, isLoading } = useDriver(driverId);
  const { vehicle, isLoading: isVehicleLoading } = useVehicle(vehicleId);

  const renderContent = () => {
    if (isLoading || isVehicleLoading) {
      return null;
    }
    return (
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <View>
            <Text
              style={[
                typography.subHeadSmMedium,
                {
                  color: colors.textContentSecondary
                }
              ]}>
              {driver?.name || 'Nate'}
            </Text>
            <Text
              style={[
                typography.bodyLgBold,
                {
                  color: colors.textContentDisabled
                }
              ]}>
              {vehicle?.name || 'Mustang Shelby GT'}
            </Text>
          </View>
          <Text
            style={{
              ...typography.subheadLgMedium,
              color: colors.error
            }}>
            Cancelled
          </Text>
        </View>
      </Card.Content>
    );
  };
  return (
    <Card
      mode='outlined'
      onPress={() =>
        navigation.navigate('BookingDetails', {
          bookingId
        })
      }
      style={{
        borderColor: colors.primary
      }}>
      {renderContent()}
    </Card>
  );
};

const BookingsCancelledList = () => {
  const { bookings, error } = useBookingsByStatus(
    DEFAULT_USER_ID,
    BookingStatus.Cancelled
  );

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (bookings.length === 0) {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <NoBookingCard
          title='No cancelled bookings'
          subtitle="You haven't cancelled any bookings yet."
        />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <CancelledCard
            key={item.id}
            bookingId={item.id}
            driverId={item.driverID}
            vehicleId={item.vehicleID}
          />
        )}
      />
    </View>
  );
};

export default BookingsCancelledList;
