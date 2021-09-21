import React, { useState } from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Gap, Input} from '../../..';
import {ToastAlert, useForm} from '../../../../Helpers';
import { colors, fonts } from '../../../../Themes';

const ResetPasswordModal = ({visible, onDismiss, onPress}) => {
  const [form, setForm] = useForm({
    newPassword: '',
    repeatPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useForm({
    _newPassword: true,
    _repeatPassword: true,
  });

  const onValidation = () => {
    if (form.newPassword !== form.repeatPassword)
      return ToastAlert('Kata sandi tidak sama');

    onPress(form.newPassword);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      onRequestClose={onDismiss}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onDismiss}>
        <TouchableOpacity
          style={styles.wrapper}
          activeOpacity={1}
          onPress={() => null}>
          <Text style={styles.title}>{'Reset Password'}</Text>
          <Text style={styles.desc}>
            {'Masukan kata sandi baru untuk bisa masuk kedalam aplikasi.'}
          </Text>
          <Input
            type={'password-white'}
            label={'Kata Sandi Baru'}
            value={form.newPassword}
            onChangeText={value => setForm('newPassword', value)}
            secureTextEntry={secureTextEntry._newPassword}
            onTogglePassword={() =>
              setSecureTextEntry('_newPassword', !secureTextEntry._newPassword)
            }
          />
          <Gap height={12} />
          <Input
            type={'password-white'}
            label={'Ulangi Kata Sandi'}
            value={form.repeatPassword}
            onChangeText={value => setForm('repeatPassword', value)}
            secureTextEntry={secureTextEntry._repeatPassword}
            onTogglePassword={() =>
              setSecureTextEntry('_repeatPassword', !secureTextEntry._repeatPassword)
            }
          />
          <Gap height={16} />
          <Button label={'Setel Ulang'} onPress={onValidation} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorModal,
  },

  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 22,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginBottom: 10,
  },

  desc: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginBottom: 12,
  },
});
