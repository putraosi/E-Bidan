import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import {useSelector} from 'react-redux';
import {Loading} from '../Components';
import Router from './Router';

const AppNavigation = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreLogs(['Remote debugger']);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {stateGlobal.loading && <Loading type={'modal'} />}
    </>
  );
};

export default AppNavigation;
