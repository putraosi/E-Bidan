import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DigitCodeModal from './DigitCodeModal';
import ForgotPasswordModal from './ForgotPasswordModal';

const Modals = ({type, visible, onDismiss, onPress}) => {
  if (type == 'forgot-password')
    return (
      <ForgotPasswordModal
        visible={visible}
        onDismiss={onDismiss}
        onPress={onPress}
      />
    );

  if (type == 'digit-code')
    return (
      <DigitCodeModal
        visible={visible}
        onDismiss={onDismiss}
        onPress={onPress}
      />
    );

  return (
    <View>
      <Text>new comp</Text>
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({});
