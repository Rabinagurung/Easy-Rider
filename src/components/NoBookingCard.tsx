import { Button, Card } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';

interface NoBookingCardProps {
  onPress?: () => void;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}
const NoBookingCard = ({
  title,
  subtitle,
  buttonLabel,
  onPress = () => {}
}: NoBookingCardProps) => {
  const { colors } = useAppTheme();
  return (
    <Card
      mode='outlined'
      style={{
        borderColor: colors.primary
      }}>
      <Card.Title
        title={title ?? 'No Active Bookings'}
        subtitle={
          subtitle || 'You do not have any active bookings at the moment'
        }
      />

      <Card.Actions>
        <Button mode='contained' onPress={onPress}>
          {buttonLabel ?? 'Book a ride'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default NoBookingCard;
