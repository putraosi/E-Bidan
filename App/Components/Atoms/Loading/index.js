import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../../Themes';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
        <Text style={styles.label}>{'Loading...'}</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorModal,
  },

  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 16,
  },

  label: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
    marginTop: 12,
  },
});
