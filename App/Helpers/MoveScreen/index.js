import {CommonActions} from '@react-navigation/native';
import {storeData} from '..';

const resetPage = (navigation, screen) => {
  if (screen == 'SignIn') {
    storeData('mode', 'midwife');
    storeData('user', '');
    storeData('token', '');
  }

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screen}],
    }),
  );
};

export {resetPage};
