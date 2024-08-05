import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../themes/theme';
import { Icon } from 'react-native-paper';

const BackButton = () => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      style={[
        styles.back,
        {
          top: insets.top,
          backgroundColor: colors.background
        }
      ]}>
      <Icon source='arrow-left' size={35} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 50,
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 15,
    padding: 4,
    borderRadius: 25,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
export default BackButton;
