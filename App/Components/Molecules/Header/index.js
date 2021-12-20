import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '../..';
import {IcLeft} from '../../../Images';
import {colors, fonts} from '../../../Themes';

const Header = ({type, title, iconRight, onPress, onDismiss}) => {
  const showTitle = title ? true : false;
  let color = colors.white;
  let backgroundColor = colors.primary;

  if (type === 'white') {
    color = colors.primary;
    backgroundColor = colors.white;
  }

  return (
    <View style={styles.container(backgroundColor)}>
      <TouchableOpacity onPress={onDismiss}>
        <Image style={styles.image(color)} source={IcLeft} />
      </TouchableOpacity>
      {showTitle && <Text style={styles.title(color)}>{title}</Text>}
      {iconRight ? (
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.image} source={iconRight} />
        </TouchableOpacity>
      ) : (
        <Gap width={24} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    width: '100%',
    height: 56,
    backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  }),

  image: tintColor => ({
    width: 24,
    height: 24,
    tintColor,
  }),

  title: color => ({
    flex: 1,
    fontSize: 16,
    color,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  }),
});
