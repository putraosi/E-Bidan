import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../Themes';
import LoadingModal from './LoadingModal';

const Loading = ({type}) => {
  if (type == 'modal') return <LoadingModal />;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
      <Text style={styles.label}>{'Loading...'}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  label: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
  },
});
