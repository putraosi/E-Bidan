import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../../Themes';

const Button = ({type, label, onPress}) => {
  let backgroundColor = Colors.white;
  let color = Colors.primary;

  if (type == 'blue') {
    backgroundColor = Colors.primary;
    color = Colors.white;
  }

  return (
    <TouchableOpacity
      style={styles.container(backgroundColor)}
      onPress={onPress}>
      <Text style={styles.label(color)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    maxWidth: '100%',
    height: 37,
    backgroundColor,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  label: color => ({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: Fonts.primary.regular,
    color,
  }),
});
