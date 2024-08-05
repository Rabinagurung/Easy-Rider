import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DetailScreen from '../screens/DetailScreen';
import { useAppTheme } from '../themes/theme';
import MapScreen from '../screens/MapScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import BookingsScreen from '../screens/BookingsScreen';
import MyBookingDetailScreen from '../screens/MyBookingDetailScreen';
import { Driver } from '../types/Driver';
import CompletedRideScreen from '../screens/CompletedRideScreen';

/** Bottom Nav */
export type BottomTabParamList = {
  Home: undefined;
  Rides: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'Home'
>;

type MainStackParamList = {
  EasyRider: undefined;
  Driver: {
    driver: Driver;
  };
  Confirmation: {
    driver: Driver;
    bookingPrice: number;
  };
  Bookings: undefined;
  Map: undefined;
  BookingDetails: {
    bookingId: string;
  };
  Completed: {
    bookingId: string;
  };
};

export type EasyRiderNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  'Home'
>;
export type DetailScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EasyRider'
>;

const EasyRiderOverView = () => {
  const Tab = createBottomTabNavigator();
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {},
        headerTitleStyle: {
          fontSize: 20,
          color: colors.primary900
        }
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const name = focused ? 'home' : 'home-outline';
            return (
              <MaterialCommunityIcons name={name} color={color} size={size} />
            );
          }
        }}
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        name='Rides'
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const name = focused ? 'car' : 'car-outline';
            return (
              <MaterialCommunityIcons name={name} color={color} size={size} />
            );
          },
          title: 'My Bookings',
          headerShadowVisible: false
        }}
        component={BookingsScreen}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          color: colors.primary900
        }
      }}>
      {/** Bottom Nav added as first screen in Stack*/}

      <Stack.Screen
        name='EasyRider'
        options={{ headerShown: false }}
        component={EasyRiderOverView}
      />
      <Stack.Screen name='Driver' component={DetailScreen} />
      <Stack.Screen
        name='Confirmation'
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Map'
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen
          name='BookingDetails'
          component={MyBookingDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Screen
        name='Completed'
        component={CompletedRideScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
