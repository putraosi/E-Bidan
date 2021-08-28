import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SingIn} from '../../Containers';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SingIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
