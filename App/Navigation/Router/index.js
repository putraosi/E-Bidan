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
  PreviewPhoto,
  AddOrderPatient,
  AddOrderPatientDetails,
  OrderSchedule,
  OrderHistoryPatient,
  OrderDetailPatient,
  HomeMidwife,
  IncomingOrder,
  IncomingOrderDetails,
  DetailsProfileMidwife,
  AddPatient,
  AddServices,
  AddServicesHomecare,
  AddServicesAntenatal
} from '../../Containers';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
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
      <Stack.Screen
        name="AddOrderPatient"
        component={AddOrderPatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddOrderPatientDetails"
        component={AddOrderPatientDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSchedule"
        component={OrderSchedule}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderHistoryPatient"
        component={OrderHistoryPatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetailPatient"
        component={OrderDetailPatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddServices"
        component={AddServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddServicesHomecare"
        component={AddServicesHomecare}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddServicesAntenatal"
        component={AddServicesAntenatal}
        options={{headerShown: false}}
      />

      {/* SCREEN MIDWIFE */}
      <Stack.Screen
        name="HomeMidwife"
        component={HomeMidwife}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IncomingOrder"
        component={IncomingOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IncomingOrderDetails"
        component={IncomingOrderDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsProfileMidwife"
        component={DetailsProfileMidwife}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
