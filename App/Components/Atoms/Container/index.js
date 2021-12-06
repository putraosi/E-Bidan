import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {colors} from '../../../Themes';

const Container = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.statusbar} />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  statusbar: {
    backgroundColor: colors.primary,
    height: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
});
