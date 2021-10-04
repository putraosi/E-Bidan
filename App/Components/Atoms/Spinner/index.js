import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcDownGreen} from '../../../Images';
import {colors, fonts} from '../../../Themes';

const Spinner = ({label, value, onPress}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <Text style={styles.value}>{value}</Text>
        <Image style={styles.image} source={IcDownGreen} />
      </TouchableOpacity>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
  },

  wrapper: {
    maxWidth: '100%',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  value: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  image: {
    width: 20,
    height: 20,
  },
});
