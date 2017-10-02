import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

import { shadeColor } from './color';

export function getTouchableComponent(useNativeFeedback = true) {
  if (useNativeFeedback === true && Platform.OS === 'android') {
    return TouchableNativeFeedback;
  }
  return TouchableOpacity;
}

export function getRippleProps(color, useNativeFeedback = true) {
  if (useNativeFeedback === true && Platform.OS === 'android') {
    return {
      background: TouchableNativeFeedback.Ripple(shadeColor(color, -30), true)
    };
  }
  return {};
}
