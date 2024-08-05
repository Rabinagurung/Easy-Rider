import { View, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useAppTheme } from '../themes/theme';
import CarCard from '../components/CarCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { fetchAllDriversWithVehicles } from '../api/firestore/driver';
import { Driver } from '../types/Driver';
import useActiveBooking from '../hooks/useActiveBooking';
import MapScreen from './MapScreen';
import MenuButtons from '../components/MenuButtons';

const HomeSceen = () => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const [availableDrivers, setAvailableDrivers] = useState<
    Driver[] | undefined
  >([]);

  const { hasActiveBooking, isLoading: isActiveBookingLoading } =
    useActiveBooking('userId_1');

  useEffect(() => {
    setIsLoading(true);
    fetchAllDriversWithVehicles()
      .then((data) => {
        setAvailableDrivers(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || isActiveBookingLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }
  if (hasActiveBooking) {
    return <MapScreen />;
  }
  return (
    <>
      <View style={[styles.root]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={availableDrivers}
          ListHeaderComponent={() => (
            <View style={{ marginBottom: 30, marginTop: insets.top + 50 }}>
              <Text
                variant='headlineSmall'
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: 30
                }}>
                Available car for rides
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  color: colors.textContentDisabled
                }}
                variant='bodyMedium'>
                Choose your ride
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CarCard driver={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
        />
        <MenuButtons />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15
  }
});
export default HomeSceen;
