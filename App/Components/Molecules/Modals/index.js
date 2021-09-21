import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Gap, SpaceBeetwen} from '../..';
import {colors, fonts} from '../../../Themes';
import DigitCodeModal from './DigitCodeModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';

const Modals = ({
  type,
  visible,
  title,
  labelPress,
  labelCancel,
  desc,
  onDismiss,
  onPress,
  onCancel,
}) => {
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

  if (type == 'reset-password')
    return (
      <ResetPasswordModal
        visible={visible}
        onDismiss={onDismiss}
        onPress={onPress}
      />
    );

  const showTitle = title ? true : false;
  const showDesc = desc ? true : false;
  const showButtonPress = labelPress ? true : false;
  const showButtonCancel = labelCancel ? true : false;

  return (
    <Modal
      animationType={'fade'}
      visible={visible}
      onRequestClose={onDismiss}
      transparent={true}>
      <TouchableOpacity style={styles.container} onPress={onDismiss}>
        <TouchableOpacity style={styles.wrapper} onPress={() => null}>
          {showTitle && <Text style={styles.title}>{title}</Text>}
          {showDesc && <Text style={styles.desc}>{desc}</Text>}
          <Gap height={20} />
          <SpaceBeetwen>
            {showButtonPress && (
              <Button type={'modal'} label={labelPress} onPress={onPress} />
            )}
            {showButtonPress && showButtonCancel && <Gap width={8} />}
            {showButtonCancel && (
              <Button
                type={'modal-white'}
                label={labelCancel}
                onPress={onCancel}
              />
            )}
          </SpaceBeetwen>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColorModal,
  },

  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 16,
  },

  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary.bold,
  },

  desc: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
});
