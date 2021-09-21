import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Confirmation,
  DetailsProfilePatient,
  GetStarted,
  HomePatient,
  SignUp,
  SingIn,
  Splash,
  PreviewPhoto
} from '../../Containers';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="DetailsProfilePatient">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="HomePatient"
        component={HomePatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsProfilePatient"
        component={DetailsProfilePatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreviewPhoto"
        component={PreviewPhoto}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
