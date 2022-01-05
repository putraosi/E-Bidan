import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Gap, SpaceBeetwen} from '../..';
import {onOpenPhoneCall, onOpenWA} from '../../../Helpers';
import {colors, fonts} from '../../../Themes';

const ModalContact = ({visible, onDismiss}) => {
  const onPhone = () => {
    onOpenPhoneCall();
    onDismiss();
  };

  const onWA = () => {
    onOpenWA();
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
      transparent={true}>
      <TouchableOpacity style={styles.container} onPress={onDismiss}>
        <TouchableOpacity
          style={styles.wrapper}
          activeOpacity={1}
          onPress={() => null}>
          <Text style={styles.title}>{'Butuh Bantuan'}</Text>

          <Text style={styles.desc}>{'Silahkan hubungi kami'}</Text>

          <Gap height={20} />
          <SpaceBeetwen style={styles.wrapperButton}>
            <Button type={'modal'} label={'Telepon'} onPress={onPhone} />
            <Gap width={8} />
            <Button type={'modal-white'} label={'WhatsApp'} onPress={onWA} />
          </SpaceBeetwen>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalContact;

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
    padding: 20,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  },

  desc: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
});
