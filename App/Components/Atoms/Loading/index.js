import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../Themes';
import LoadingModal from './LoadingModal';

const Loading = ({type}) => {
  let backgroundColor = colors.white;
  let loadingColor = colors.primary;

  if (type == 'modal') return <LoadingModal />;

  if (type == 'secondary') {
    backgroundColor = colors.transparent;
    loadingColor = colors.white;
  }

  return (
    <View style={styles.container(backgroundColor)}>
      <ActivityIndicator size={'large'} color={loadingColor} />
      <Text style={styles.label}>{'Loading...'}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    padding: 16,
  }),

  label: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
  },
});
