import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openCamera = () => {
  return launchCamera({
    cameraType: 'back',
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.85,
  });
};

export const openGallery = () => {
  return launchImageLibrary({
    mediaType: 'photo',
    maxHeight: 1200,
    maxWidth: 1200,
    quality: 0.85,
  });
};
