import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Gap, Input} from '../../..';
import {colors, fonts} from '../../../../Themes';

const ForgotPasswordModal = ({visible, onDismiss, onPress}) => {
  const [email, setEmail] = useState('');

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
          <Text style={styles.title}>{'Lupa Password'}</Text>
          <Text style={styles.desc}>
            {
              'Masukan alamat email atau No handphone anda untuk proses verifikasi, kami akan mengirimkan 4 digit code ke alamat email / no handphone anda'
            }
          </Text>
          <Input
            type={'white'}
            label={'Alamat E-Mail'}
            value={email}
            onChangeText={value => setEmail(value)}
            keyboardType={'email-address'}
          />
          <Gap height={30} />
          <Button label={'Lanjutkan'} onPress={() => onPress(email)} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ForgotPasswordModal;

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
