import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../Themes';

const Container = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
