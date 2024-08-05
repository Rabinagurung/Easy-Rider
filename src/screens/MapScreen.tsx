import { View, Dimensions, Image, StyleSheet } from 'react-native';
import BottomDriverIncomingSheet from '../components/BottomDriverIncomingSheet';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useState } from 'react';
import MenuButtons from '../components/MenuButtons';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 43.013;
const LONGITUDE = -81.1994;
const LATITUDE_DELTA = 0.03422538266494257;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const initialRegion = {
  latitude: 43.01114760210257,
  longitude: -81.2023631762733,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};
const hardcodedRoute = [
  { latitude: 43.007288, longitude: -81.210274 }, // Starting Point
  { latitude: 43.007053, longitude: -81.210845 },
  { latitude: 43.007676, longitude: -81.21113 },
  { latitude: 43.012307, longitude: -81.195552 },
  { latitude: 43.014335, longitude: -81.19651 },
  { latitude: 43.013953, longitude: -81.198003 },
  { latitude: 43.013569, longitude: -81.199301 },
  { latitude: 43.013216, longitude: -81.199129 }
];

const MapScreen = () => {
  const [origin] = useState({ latitude: LATITUDE, longitude: LONGITUDE });

  const [driverLocation] = useState({
    latitude: hardcodedRoute[0].latitude,
    longitude: hardcodedRoute[0].longitude
  });
  return (
    <View style={[{ backgroundColor: 'orange', flex: 1 }]}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* User Marker */}
        <Marker coordinate={origin} title='You'>
          <Image
            source={require('../../assets/images/map_pin.png')}
            style={{ height: 30, width: 20, objectFit: 'contain' }}
          />
        </Marker>

        {/* Driver Marker */}
        <Marker coordinate={driverLocation} title='Driver'>
          <Image
            source={require('../../assets/images/UberX.png')}
            style={{ height: 30, width: 60 }}
          />
        </Marker>
        {hardcodedRoute.length > 0 && (
          <Polyline
            coordinates={hardcodedRoute}
            strokeColor='#000'
            strokeWidth={3}
          />
        )}
      </MapView>

      <MenuButtons />
      <BottomDriverIncomingSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});
export default MapScreen;
