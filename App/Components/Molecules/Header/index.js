import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcLeft} from '../../../Images';
import {colors, fonts} from '../../../Themes';

const Header = ({type, title, iconRight, onPress, onDismiss}) => {
  const showTitle = title ? true : false;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDismiss}>
        <Image style={styles.image} source={IcLeft} />
      </TouchableOpacity>
      {showTitle && <Text style={styles.title}>{title}</Text>}
      {iconRight && (
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.image} source={iconRight} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  image: {
    width: 24,
    height: 24,
  },

  title: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});
