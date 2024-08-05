import { View, FlatList, Image, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card1 from '../components/Card1';
import { Specification } from '../types/Specificaiton';
import typography from '../styles/typography';
import DriverCard from '../components/DriverCard';
import { Feature } from '../components/CarFeatures';
import { Vehicle } from '../types/Car';
import { Driver } from '../types/Driver';
import { calculateRandomPrice } from '../utils/calculateRandomPrice';
import { bookRide } from '../api/firestore/bookings';
import { useState } from 'react';
import Loader from '../components/Loader';

interface DetailScreenProps {
  navigation: DetailScreenNavigationProp;
  route: { params: { driver: Driver } };
}

const SpecificationItem: React.FC<{ item: Specification }> = ({ item }) => (
  <Card1 specification={item} />
);

const SpecificationsList = ({
  specifications
}: {
  specifications: Specification[];
}) => {
  return (
    <FlatList
      data={specifications}
      renderItem={({ item }) => <SpecificationItem item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
      horizontal
    />
  );
};

const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const driver = route.params.driver;
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const bookingPrice = calculateRandomPrice();
  const vehicle = driver.vehicle as unknown as Vehicle;

  const handleBookRide = async () => {
    try {
      setIsLoading(true);
      await bookRide(driver.id, vehicle.id, bookingPrice);
      setIsLoading(false);
      navigation.navigate('Confirmation', { driver, bookingPrice });
    } catch (error) {
      Alert.alert('Error', 'Failed to book ride');
    }
  };
  const showBookAlert = () => {
    Alert.alert(
      'Confirm Booking',
      `Are you sure you want to book this ride for $${bookingPrice.toFixed(
        2
      )}?`,
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: handleBookRide
        }
      ],
      { cancelable: false }
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: insets.bottom
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={vehicle.features}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ marginVertical: 20 }}>
                <DriverCard
                  driverName={driver.name}
                  driverImage={driver.imageUrl}
                  driverRating={driver.rating}
                  totalReviews={driver.reviews.length}
                  bookingPrice={bookingPrice}
                  driverCar={vehicle.image as string}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...typography.titleMDSemibold
                  }}>
                  {vehicle.name}
                </Text>
              </View>
              <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <Image
                  source={{ uri: vehicle.image }}
                  style={{ width: 269, height: 156 }}
                />
              </View>
              <Text
                style={{
                  ...typography.headlineSmMedium,

                  marginBottom: 16
                }}>
                Specifications
              </Text>
              <SpecificationsList specifications={vehicle.specifications} />
              <Text
                style={{
                  ...typography.headlineSmMedium,
                  marginBottom: 16,
                  marginTop: 30
                }}>
                Car Features
              </Text>
            </>
          );
        }}
        renderItem={({ item }) => <Feature item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
      />

      <Card.Actions>
        <Button
          mode='contained'
          style={{ borderColor: colors.primary, width: '100%' }}
          onPress={showBookAlert}>
          Confirm Book
        </Button>
      </Card.Actions>
    </View>
  );
};

export default DetailScreen;
