import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../../Themes';

const NoticeRounded = ({category}) => {
  let label = 'Selesai';
  let backgroundColor = colors.notice.completed.backgroundColor;
  let color = colors.notice.completed.color;

  if (category == 'rejected') {
    label = 'Ditolak';
    backgroundColor = colors.notice.rejected.backgroundColor;
    color = colors.notice.rejected.color;
  }

  return (
    <View style={styles.container(backgroundColor)}>
      <Text style={styles.label(color)}>{label}</Text>
    </View>
  );
};

export default NoticeRounded;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    width: 70,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    borderRadius: 17 / 2,
  }),

  label: color => ({
    fontSize: 8,
    color,
    fontFamily: fonts.primary.regular,
    textTransform: 'capitalize',
  }),
});
