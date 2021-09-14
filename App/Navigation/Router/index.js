import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Confirmation,
  DetailsProfile,
  GetStarted,
  Home,
  SignUp,
  SingIn,
} from '../../Containers';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SingIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="DetailsProfile"
        component={DetailsProfile}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default Router;
