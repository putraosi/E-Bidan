import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

export const ToastAlert = (message = 'Coming Soon') => {
  return Toast.show(message, Toast.SHORT);
};

export const sampleAlert = (message, onPress) => {
  if (!message) message = 'Coming Soon';
  Alert.alert('', message, [{text: 'OK', onPress: () => onPress()}]);
};
