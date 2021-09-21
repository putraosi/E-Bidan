import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IcAdd} from '../../../../Images/icon';
import {colors} from '../../../../Themes';

const ButtonCircle = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={IcAdd} />
    </TouchableOpacity>
  );
};

export default ButtonCircle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.primary,
    padding: 8,
    borderRadius: 24,
  },

  image: {
    width: 24,
    height: 24,
  },
});
