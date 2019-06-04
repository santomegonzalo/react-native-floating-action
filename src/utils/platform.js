import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
  const dimension = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimension.height === 812 || dimension.width === 812)
  );
}
