import React, { useEffect } from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ILLogo} from '../../Images';
import {colors} from '../../Themes';

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn')
        }, 2000);
    }, [])

  return (
    <View style={styles.contianer}>
      <Image style={styles.image} source={ILLogo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
  },
});
