import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

export const ToastAlert = (message = 'Coming Soon') => {
  return Toast.show(message, Toast.SHORT);
};

export const SampleAlert = (title, message) => {
  if (!message) message = 'Coming Soon';
  Alert.alert(title, message, [{text: 'OK', onPress: () => null}]);
};
