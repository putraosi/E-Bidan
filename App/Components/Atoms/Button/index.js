import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../Themes';
import ButtonCircle from './ButtonCircle';
import ButtonModal from './ButtonModal';

const Button = ({type, label, onPress, styleButton}) => {
  if (type == 'circle') return <ButtonCircle onPress={onPress} />;
  if (type && type.includes('modal'))
    return <ButtonModal type={type} label={label} onPress={onPress} />;

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
    height: 40,
    backgroundColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor,
    borderWidth: 1,
  }),

  label: color => ({
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color,
  }),
});
