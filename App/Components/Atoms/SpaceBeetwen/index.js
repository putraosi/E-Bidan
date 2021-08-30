import React from 'react';
import {StyleSheet, View} from 'react-native';

const SpaceBeetwen = ({style, children}) => {
  return <View style={[style, styles.container]}>{children}</View>;
};

export default SpaceBeetwen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
