import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IcChecked,
  IcRadioActive,
  IcRadioInactive,
  IcUnchecked,
} from '../../../Images';
import {colors, fonts} from '../../../Themes';

const RadioButton = ({style, type, disable, label, isActive, onPress}) => {
  let Icon = IcRadioInactive;

  if (type && type.includes('rounded')) {
    if (isActive) Icon = IcChecked;
    else Icon = IcUnchecked;
  } else if (isActive) {
    Icon = IcRadioActive;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image style={styles.image} source={Icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    width: 20,
    height: 20,
  },

  label: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    marginLeft: 8,
  },
});
