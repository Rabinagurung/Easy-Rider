import { Card, Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import { Specification } from '../types/Specificaiton';

interface Card1Props {
  specification: Specification;
}
const Card1 = ({ specification }: Card1Props) => {
  const { colors } = useAppTheme();
  return (
    <Card
      mode='outlined'
      contentStyle={{
        padding: 10,
        alignItems: 'center'
      }}
      style={{
        borderColor: colors.primary,
        backgroundColor: colors.primary50,
        alignSelf: 'flex-start'
      }}>
      <Icon source={specification.icon} size={24} />

      <Text
        style={{
          fontSize: 10,
          fontWeight: '500',
          color: colors.textIconContentTertiary,
          marginTop: 3
        }}>
        {specification.title}
      </Text>
      <Text
        style={{
          fontSize: 8,
          fontWeight: '400',
          color: colors.textIconContentTertiary
        }}>
        {specification.value}
      </Text>
    </Card>
  );
};

export default Card1;
