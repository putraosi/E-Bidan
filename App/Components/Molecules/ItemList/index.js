import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, fonts} from '../../../Themes';

const ItemList = ({style, name}) => {
  return <Text style={[styles.name, style]}>{`• ${name}`}</Text>;
};

export default ItemList;

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },
});
