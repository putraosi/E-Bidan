import {Linking} from 'react-native';
import {constants, SampleAlert} from '..';

export const onCanOpenLinking = async link => {
  return await Linking.canOpenURL(link)
    .then(supported => {
      console.log('cek 2');
      if (!supported) {
        SampleAlert({message: 'Mohon maaf tidak dapat dibuka'});
      } else {
        console.log('cek 3');
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
  console.log('cek 1', check);

  if (check) Linking.openURL(link);
};

export const onOpenWA = async () => {
    const link = `https://wa.me/${constants.PHONE_NUMBER_ADMIN}/`;

  const check = await onCanOpenLinking(link);
  console.log('cek 1', check);

  if (check) Linking.openURL(link);
}
