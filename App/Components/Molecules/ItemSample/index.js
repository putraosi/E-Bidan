import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Separator} from '../..';
import {colors, fonts} from '../../../Themes';

const ItemSample = ({value, isLast, onPress}) => {
  return (
    <>
      <Text style={styles.label} onPress={() => onPress(value)}>
        {value}
      </Text>
      {!isLast && <Separator style={styles.separator} />}
    </>
  );
};

export default ItemSample;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    paddingVertical: 8,
  },

  separator: {
    marginHorizontal: 100,
  },
});
