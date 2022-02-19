import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Provider} from 'react-redux';
import { constants } from '../Helpers';
import AppNavigation from '../Navigation';
import store from '../Redux/create_store';
import { colors, fonts } from '../Themes';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />

      {constants.CLUSTER == 'staging' && (
        <View style={styles.wrapper}>
          <Text style={styles.staging}>{constants.CLUSTER}</Text>
        </View>
      )}
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 2,
    alignItems: 'center',
  },

  staging: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 99,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});