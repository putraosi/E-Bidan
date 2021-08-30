import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const Row = ({type, style, children, action, onPress}) => {
  const Div = action ? TouchableOpacity : View;

  if (type == 'free')
    return (
      <Div style={[style, styles.containerFree]} onPress={onPress}>
        {children}
      </Div>
    );

  return (
    <Div style={[style, styles.container]} onPress={onPress}>
      {children}
    </Div>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerFree: {
    flexDirection: 'row',
  },
});
