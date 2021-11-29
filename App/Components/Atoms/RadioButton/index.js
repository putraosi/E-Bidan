import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from '..';
import {
  IcChecked,
  IcRadioActive,
  IcRadioInactive,
  IcUnchecked,
} from '../../../Images';
import {colors, fonts} from '../../../Themes';

const RadioButton = ({
  style,
  type,
  disable,
  label,
  other,
  onChangeText,
  isActive,
  onPress,
}) => {
  let Icon = IcRadioInactive;

  if (type && type.includes('rounded')) {
    if (isActive) Icon = IcChecked;
    else Icon = IcUnchecked;
  } else if (isActive) {
    Icon = IcRadioActive;
  }

  return (
    <View style={styles.flex}>
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Image style={styles.image} source={Icon} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>

      {isActive && label == 'Lainnya' && (
        <Input value={other} onChangeText={onChangeText} />
      )}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  flex: {flex: 1},

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
