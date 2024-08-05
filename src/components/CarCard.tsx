import { View, Image } from 'react-native';
import { Avatar, Button, Card, Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import { Vehicle } from '../types/Car';
import { useNavigation } from '@react-navigation/native';
import { DetailScreenNavigationProp } from '../navgiation/MainNavigator';
import { Driver } from '../types/Driver';

interface CarCardProps {
  driver: Driver;
}
const CarCard = ({ driver }: CarCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { colors } = useAppTheme();

  const vechile: Vehicle = driver.vehicle as unknown as Vehicle;

  return (
    <Card
      mode='outlined'
      style={{
        borderColor: colors.primary,
        backgroundColor: colors.primary50
      }}>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Avatar.Image size={60} source={{ uri: driver.imageUrl }} />
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600'
              }}>
              {driver.name}
            </Text>
            <Text
              style={{
                color: colors.textContentDisabled
              }}>
              {vechile.name}
            </Text>
            <Text
              style={{
                color: colors.textContentDisabled
              }}>
              Model: {vechile.features?.[0].value}
            </Text>
            <View style={{ flexDirection: 'row', gap: 3, marginTop: 2 }}>
              <Icon source='map-marker' size={16} color={colors.primary900} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500'
                }}>
                100 km (3 mins away)
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: vechile.image }}
          style={{ width: 101, height: 59 }}
        />
      </Card.Content>

      <Card.Actions>
        <Button
          style={{ borderColor: colors.primary, width: '100%' }}
          onPress={() =>
            navigation.navigate('Driver', {
              driver
            })
          }>
          BOOK NOW
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CarCard;
