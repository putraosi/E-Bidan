import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../Themes';

const EmptyList = ({type, desc}) => {
  let backgroundColor = colors.white;
  let color = colors.text.primary;

  if (type == 'secondary') {
    backgroundColor = colors.transparent;
    color = colors.white;
  }
  
  return (
    <View style={styles.container(backgroundColor)}>
      <Text style={styles.desc(color)}>{desc}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    maxWidth: '100%',
    padding: 20,
    backgroundColor,
  }),

  desc: color => ({
    fontSize: 12,
    color,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  }),
});
