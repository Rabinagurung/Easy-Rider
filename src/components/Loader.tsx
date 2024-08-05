import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '../themes/theme';

interface LoaderProps {
  size?: 'small' | 'large' | number;
}
const Loader = ({ size = 'large' }: LoaderProps) => {
  const { colors } = useAppTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

export default Loader;
