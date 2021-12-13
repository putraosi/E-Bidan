import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AddOrderPatient,
  AddOrderPatientDetails,
  AddPatient,
  AddServicesAntenatal,
  AddServicesHomecare,
  AddServicesImmunization,
  AddServicesInc,
  AddServicesOther,
  AddServicesPregnancyExercise,
  AddServicesReferral,
  Confirmation,
  DetailsProfileMidwife,
  DetailsProfilePatient,
  GetStarted,
  HomecareSerivceDetails,
  HomeMidwife,
  HomePatient,
  ImmunizationSerivceDetails,
  IncomingOrder,
  IncomingOrderDetails,
  OrderDetailPatient,
  OrderHistoryPatient,
  OrderSchedule,
  OtherSerivceDetails,
  PreviewPhoto,
  SignUp,
  SingIn,
  Splash,
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
        name="AddServicesReferral"
        component={AddServicesReferral}
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
      <Stack.Screen
        name="AddServicesImmunization"
        component={AddServicesImmunization}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddServicesInc"
        component={AddServicesInc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddServicesOther"
        component={AddServicesOther}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddServicesPregnancyExercise"
        component={AddServicesPregnancyExercise}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomecareSerivceDetails"
        component={HomecareSerivceDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OtherSerivceDetails"
        component={OtherSerivceDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ImmunizationSerivceDetails"
        component={ImmunizationSerivceDetails}
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
