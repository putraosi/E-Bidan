import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../Themes';
import NoticeRounded from './NoticeRounded';

const Notice = ({type, category}) => {
  if (type == 'rounded') return <NoticeRounded category={category} />;

  let label = 'Proses';
  let backgroundColor = colors.notice.progress.backgroundColor;
  let color = colors.notice.progress.color;

  if (category == 'pending') {
    label = 'Tertunda';
    backgroundColor = colors.notice.pending.backgroundColor;
    color = colors.notice.pending.color;
  }

  return (
    <View style={styles.container(backgroundColor)}>
      <Text style={styles.label(color)}>{label}</Text>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    width: 56,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    borderRadius: 2,
  }),

  label: color => ({
    fontSize: 6,
    color,
    fontFamily: fonts.primary.regular,
    textTransform: 'capitalize',
  }),
});
