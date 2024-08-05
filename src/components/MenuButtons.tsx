import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { useAppTheme } from '../themes/theme';
import { Pressable, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

interface IconWrapperProps {
  source: string;
  wrapperColor?: string;
  iconColor?: string;
  onPress?: () => void;
}
const IconWrapper = ({
  source,
  wrapperColor,
  iconColor,
  onPress
}: IconWrapperProps) => {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.iconWrapper,
        { backgroundColor: wrapperColor ?? colors.primary100 }
      ]}>
      <Icon
        source={source}
        size={24}
        color={iconColor ?? colors.textContentSecondary}
      />
    </Pressable>
  );
};
const MenuButtons = () => {
  const { isDarkTheme, toggleTheme } = useDarkTheme();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <>
      {/* <View
        style={{
          top: insets.top,
          left: 15,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <IconWrapper source='menu' />
      </View> */}
      <View
        style={{
          top: insets.top,
          right: 15,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <IconWrapper
          source={isDarkTheme ? 'white-balance-sunny' : 'moon-waxing-crescent'}
          iconColor={colors.textContentSecondary}
          onPress={toggleTheme}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 5,
    backgroundColor: 'primary',
    width: 34,
    borderRadius: 4,
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

export default MenuButtons;
