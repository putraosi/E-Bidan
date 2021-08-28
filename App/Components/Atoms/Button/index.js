import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../../Themes';

const Button = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    height: 37,
    backgroundColor: Colors.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: Fonts.primary.regular,
    color: Colors.primary,
  },
});
