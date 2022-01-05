import {Linking} from 'react-native';
import {constants, SampleAlert} from '..';

export const onCanOpenLinking = async link => {
  return await Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
        SampleAlert({message: 'Mohon maaf tidak dapat dibuka'});
      } else {
        return true;
      }
    })
    .catch(() => {
      SampleAlert({message: 'Mohon maaf tidak dapat dibuka'});
    });
};

export const onOpenPhoneCall = async () => {
  const link = `tel:${constants.PHONE_NUMBER_ADMIN}`;

  const check = await onCanOpenLinking(link);

  if (check) Linking.openURL(link);
};

export const onOpenWA = async () => {
  const link = `https://wa.me/${constants.PHONE_NUMBER_ADMIN}/`;

  const check = await onCanOpenLinking(link);

  if (check) Linking.openURL(link);
};
