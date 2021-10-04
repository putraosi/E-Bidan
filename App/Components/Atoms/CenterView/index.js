import React from 'react';
import {StyleSheet, View} from 'react-native';

const CenterView = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default CenterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
