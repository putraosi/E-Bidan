import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Gap, Input} from '../../..';
import {colors, fonts} from '../../../../Themes';

const DigitCodeModal = ({visible, onDismiss, onPress}) => {
  const [code, setCode] = useState('');

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
          <Text style={styles.title}>{'Masukan 4 Digit Code'}</Text>
          <Text style={styles.desc}>
            {'Masukan 4 digit kode yang sudah kami kirimkan di email atau sms'}
          </Text>
          <Input
            type={'digit-code-white'}
            label={'Alamat E-Mail'}
            value={code}
            onChangeText={value => setCode(value)}
            keyboardType={'email-address'}
          />
          <Gap height={16} />
          <Button label={'Lanjutkan'} onPress={() => onPress(code)} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default DigitCodeModal;

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
