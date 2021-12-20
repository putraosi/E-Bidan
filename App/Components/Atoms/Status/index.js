import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { constants } from '../../../Helpers';
import { colors, fonts } from '../../../Themes';

const Status = ({type, mode}) => {
  let label = 'Pesanan Baru';
  let backgroundColor = colors.notice.progress.backgroundColor;
  let color = colors.notice.progress.color;

  if (type == 'cancel') {
    label = 'Pesanan Anda Telah Dibatalkan';
    backgroundColor = colors.notice.rejected.backgroundColor;
    color = colors.notice.rejected.color;
  } else if (type == 'rejected') {
    label =
      mode == constants.MIDWIFE
        ? 'Pesanan Sudah Anda Tolak'
        : 'Pesanan Anda Telah Ditolak';
    backgroundColor = colors.notice.rejected.backgroundColor;
    color = colors.notice.rejected.color;
  } else if (type == 'accepted') {
    label = 'Pesanan Anda Telah Diterima';
    label =
      mode == constants.MIDWIFE
        ? 'Pesanan Sedang Diproses'
        : 'Pesanan Anda Telah Diterima';
  } else if (type == 'on progress') {
    label = 'Pesanan Anda dalam Proses';
  } else if (type == 'booking') {
    label = 'Pesanan Anda Telah Dipesan';
  } else if (type == 'finish') {
    label = 'Pesanan Anda Sudah Selesai';
    backgroundColor = colors.notice.completed.backgroundColor;
    color = colors.notice.completed.color;
  }

  return (
    <View style={styles.container(backgroundColor)}>
      <Text style={styles.status(color)}>{label}</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor,
  }),

  status: color => ({
    fontSize: 14,
    color,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  }),
});
