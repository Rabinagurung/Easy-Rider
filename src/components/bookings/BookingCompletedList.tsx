import React from 'react';
import { View, Text, FlatList } from 'react-native';
import useBookingsByStatus from '../../hooks/useBookingByStatus';
import { BookingStatus } from '../../types/Booking';
import MyBookingCard from '../MyBookingCard';
import Loader from '../Loader';
import NoBookingCard from '../NoBookingCard';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navgiation/MainNavigator';

interface BookingsListProps {
  userId: string;
  status: BookingStatus;
}
const BookingsCompletedList = ({ userId, status }: BookingsListProps) => {
  const { bookings, loading, error } = useBookingsByStatus(userId, status);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (bookings.length === 0) {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <NoBookingCard
          title='No completed bookings'
          subtitle="You haven't completed any bookings yet."
          buttonLabel='Book a ride'
          onPress={() => navigation.navigate('Home')}
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
          <MyBookingCard
            key={item.id}
            bookingId={item.id}
            status={item.status}
            originAddress={item.origin.address}
            destinationAddress={item.destination.address}
            bookingPrice={item.price}
          />
        )}
      />
    </View>
  );
};

export default BookingsCompletedList;
