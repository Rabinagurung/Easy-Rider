import { Button, Card, Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import { View } from 'react-native';
import typography from '../styles/typography';
import { useNavigation } from '@react-navigation/native';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';
import { BookingStatus } from '../types/Booking';

interface MyBookingCardProps {
  bookingId: string;
  status: BookingStatus;
  destinationAddress?: string;
  originAddress?: string;
  bookingPrice?: number;
}
const MyBookingCard = ({
  bookingId,
  status,
  originAddress,
  destinationAddress,
  bookingPrice
}: MyBookingCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { colors } = useAppTheme();
  return (
    <Card
      onPress={() => {
        if (status === 'completed') {
          navigation.navigate('BookingDetails', {
            bookingId
          });
        }
      }}
      mode='outlined'
      style={{
        borderColor:
          status === BookingStatus.Active
            ? colors.primary
            : status === BookingStatus.Completed
            ? colors.success
            : colors.error
      }}>
      <Card.Content>
        <View style={{ marginLeft: -14 }}>
          <Icon source='home-circle-outline' size={30} color={colors.primary} />
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: colors.textContentDisabled,
            paddingLeft: 16,
            position: 'relative'
          }}>
          <Text
            style={[
              typography.subheadLgMedium,
              {
                color: colors.textContentTertiary
              }
            ]}>
            {originAddress}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 1,
              marginVertical: 20,
              backgroundColor: colors.textContentDisabled
            }}
          />
          <Text
            style={[
              typography.subheadLgMedium,
              {
                color: colors.textContentTertiary
              }
            ]}>
            {destinationAddress}
          </Text>
        </View>
      </Card.Content>
      <View style={{ paddingLeft: 2 }}>
        <Icon source='map-marker' size={30} color={colors.primary} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16
        }}>
        <Text
          variant='bodyLarge'
          style={{
            fontWeight: 'bold',
            textAlign: 'left'
          }}>
          ${bookingPrice?.toFixed(2)}
        </Text>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          mode='text'
          labelStyle={{
            color: status === 'active' ? colors.primary : colors.success,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
          {status}
        </Button>
      </View>
    </Card>
  );
};

export default MyBookingCard;
