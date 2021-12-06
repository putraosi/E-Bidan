import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const requestPermission = async permission => {
  try {
    const granted = await PermissionsAndroid.request(permission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

export const requestPermissionIOS = async permission => {
  try {
    const isHasPermission = await request(permission);

    if (isHasPermission === RESULTS.GRANTED) return true;

    return false;
  } catch (error) {
    return false;
  }
};

export const checkPermissionCamera = async () => {
  if (Platform.OS === 'android') {
    const granted = await requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted) return true;
  } else {
    const granted = await requestPermissionIOS(PERMISSIONS.IOS.CAMERA);

    if (granted) return true;
  }
};
