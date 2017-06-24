import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';

export function getTouchableComponent(useNativeFeedback = true) {
  if (useNativeFeedback === true && Platform.OS === 'android') {
    return TouchableNativeFeedback;
  }
  return TouchableOpacity;
}
