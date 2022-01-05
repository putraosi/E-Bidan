import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ModalContact} from '..';
import {colors, fonts} from '../../../Themes';

const ContactUs = () => {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Text style={styles.help(colors.text.primary)}>{'Butuh Bantuan? '}</Text>
      <Text style={styles.help(colors.primary)}>{` Hubungi Kami`}</Text>

      <ModalContact visible={visible} onDismiss={() => setVisible(false)} />
    </TouchableOpacity>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },

  help: color => ({
    fontSize: 12,
    color,
    fontFamily: fonts.primary.regular,
  }),
});
