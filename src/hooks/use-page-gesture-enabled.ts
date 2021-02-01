import { useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

type PageGestureEnabledParams = {
  setEnabled: (enabled: boolean) => void;
};

export default (enabled: boolean): PageGestureEnabledParams => {
  const enabledRef = useRef(enabled);
  const navigation = useNavigation();

  const _onHardwareBackPress = () => {
    if (enabledRef.current) {
      return false;
    } else {
      return true;
    }
  };

  const setEnabled = (enabled: boolean): void => {
    enabledRef.current = enabled;
    navigation.setOptions({
      gestureEnabled: enabled,
    });
  };

  useLoad(() => {
    navigation.setOptions({
      gestureEnabled: enabled,
    });
    BackHandler.addEventListener('hardwareBackPress', _onHardwareBackPress);
  });

  useUnload(() => {
    BackHandler.removeEventListener('hardwareBackPress', _onHardwareBackPress);
  });

  return {
    setEnabled,
  };
};
