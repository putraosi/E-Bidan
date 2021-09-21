import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcProfileDriverSmall, IcRightBlue, IcProfilePassengerSmall} from '../../../../assets';
import {colors, fonts} from '../../../../utils';

const ProfileHeader = ({mode, onPress}) => {
  const type = mode == 'passenger' ? 'Driver Mode' : 'Passenger Mode';

  const Icon = () => {
    if(mode == 'passenger') return <IcProfileDriverSmall />

    return <IcProfilePassengerSmall/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{'Profile'}</Text>
      </View>
      <TouchableOpacity style={styles.containerChangeMode} onPress={onPress}>
        <Icon />
        <Text style={styles.type}>{type}</Text>
        <IcRightBlue />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: colors.header.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerChangeMode: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  type: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    marginHorizontal: 4,
  },

  containerTitle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.medium,
    textAlign: 'center',
  },
});
