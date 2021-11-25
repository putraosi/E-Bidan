import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../..';
import {colors, fonts} from '../../../Themes';

const ModalAlert = ({visible, desc, onPress, onDismiss}) => {
  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onDismiss}>
      <TouchableOpacity style={styles.container} onPress={onDismiss}>
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          <Text style={styles.desc}>{desc}</Text>

          <View style={styles.containerButton}>
            <Button type={'modal-white'} label={'Oke'} onPress={onPress} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor:colors.backgroundColorModal
  },

  content: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
  },

  desc: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
    textAlign: 'center',
  },

  containerButton: {
    alignItems: 'center',
  },
});
