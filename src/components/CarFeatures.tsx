import { Card, Text } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';
import { CarFeature } from '../types/Car';

export const Feature: React.FC<{ item: CarFeature }> = ({ item }) => {
  const { colors } = useAppTheme();
  return (
    <Card
      mode='outlined'
      style={{
        borderColor: colors.primary,
        backgroundColor: colors.primary50
      }}>
      <Card.Content
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{item.name}</Text>
        <Text> {item.value}</Text>
      </Card.Content>
    </Card>
  );
};
