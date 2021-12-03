import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../Themes';
import NoticeRounded from './NoticeRounded';

const Notice = ({type, category}) => {
  if (type == 'rounded') return <NoticeRounded category={category} />;

  let label = 'Baru';
  let backgroundColor = colors.notice.progress.backgroundColor;
  let color = colors.notice.progress.color;

  if (category == 'pending') {
    label = 'Tertunda';
    backgroundColor = colors.notice.pending.backgroundColor;
    color = colors.notice.pending.color;
  }else if(category == 'reject') {
    label = 'Tolak';
    backgroundColor = colors.notice.rejected.backgroundColor;
    color = colors.notice.rejected.color;
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
    width: 70,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    borderRadius: 4,
  }),

  label: color => ({
    fontSize: 12,
    color,
    fontFamily: fonts.primary.regular,
    textTransform: 'capitalize',
  }),
});
