import { Image, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import typography from '../styles/typography';
import { useAppTheme } from '../themes/theme';

interface DriverCardProps {
  driverName: string;
  driverImage: string;
  driverRating: number;
  driverDistance?: number;
  driverCar: string;
  showCar?: boolean;
  bookingPrice: number;
  totalReviews: number;
}
const DriverCard = ({
  driverName,
  driverImage,
  driverRating,
  driverDistance = 5.9,
  bookingPrice = 20.0,
  driverCar,
  totalReviews = 0,
  showCar = false
}: DriverCardProps) => {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8
        }}>
        <Image
          source={{ uri: driverImage }}
          style={{ width: 54, height: 59, borderRadius: 4 }}
        />
        <View>
          <Text style={typography.subheadLgMedium}>{driverName}</Text>
          <View style={{ gap: 4, flexDirection: 'row' }}>
            <Icon source='map-marker' size={20} />
            <Text
              style={{
                ...typography.subHeadSmMedium,
                color: colors.textContentDisabled
              }}>
              ({driverDistance} mins away)
            </Text>
          </View>
          <Text
            style={{
              ...typography.subHeadSmMedium,
              color: colors.textContentDisabled
            }}>
            ⭐️ {driverRating} ({totalReviews} reviews)
          </Text>
        </View>
      </View>
      {showCar && driverCar ? (
        <Image
          source={{ uri: driverCar }}
          style={{
            width: 90,
            height: 54
          }}
        />
      ) : (
        <Text style={typography.subheadLgMedium}>
          ${bookingPrice.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

export default DriverCard;
