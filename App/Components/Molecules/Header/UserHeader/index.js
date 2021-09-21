import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcSetupCirlce} from '../../../../assets';
import {colors, fonts} from '../../../../utils';

const User = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`Welcome, ${data?.firstName}!`}</Text>
      <TouchableOpacity onPress={onPress}>
        <IcSetupCirlce />
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: colors.header.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  name: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.medium,
    textTransform: 'capitalize',
  },
});
