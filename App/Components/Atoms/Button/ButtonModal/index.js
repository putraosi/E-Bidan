import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../../Themes';

const ButtonModal = ({type, label, onPress}) => {
  let color = colors.button.default.color;
  let backgroundColor = colors.button.default.backgroundColor;
  let borderColor = colors.button.default.borderColor;

  if (type == 'modal-white') {
    color = colors.button.white.color;
    backgroundColor = colors.button.white.backgroundColor;
    borderColor = colors.button.white.borderColor;
  }

  return (
    <TouchableOpacity
      style={styles.container(backgroundColor, borderColor)}
      onPress={onPress}>
      <Text style={styles.label(color)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonModal;

const styles = StyleSheet.create({
  container: (backgroundColor, borderColor) => ({
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    borderColor,
    borderWidth: 1,
    borderRadius: 4,
  }),

  label: color => ({
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color,
    textAlign: 'center',
  }),
});
