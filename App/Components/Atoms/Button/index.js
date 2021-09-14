import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../Themes';
import ButtonCircle from './ButtonCircle';

const Button = ({type, label, onPress, styleButton}) => {
  if (type == 'circle') return <ButtonCircle onPress={onPress} />;

  let backgroundColor = colors.button.default.backgroundColor;
  let borderColor = colors.button.default.borderColor;
  let color = colors.button.default.color;

  if (type == 'blue') {
    backgroundColor = colors.primary;
    color = colors.white;
  }

  return (
    <TouchableOpacity
      style={[styles.container(backgroundColor, borderColor), styleButton]}
      onPress={onPress}>
      <Text style={styles.label(color)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (backgroundColor, borderColor) => ({
    maxWidth: '100%',
    height: 48,
    backgroundColor,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor,
    borderWidth: 1,
  }),

  label: color => ({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: fonts.primary.regular,
    color,
  }),
});
