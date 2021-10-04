import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../Themes';

const index = ({
  height = 1,
  backgroundColor = colors.separator.primary,
  style,
}) => {
  return (
    <View
      style={[
        style,
        {
          maxWidth: '100%',
          height,
          backgroundColor,
        },
      ]}
    />
  );
};

export default index;

const styles = StyleSheet.create({});
