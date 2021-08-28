import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Gap} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {ILGetStarted, ILLogo} from '../../Images';
import {Colors} from '../../Themes/Colors';

const SignIn = () => {
  return (
    <ImageBackground style={styles.container} source={ILGetStarted}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={ILLogo} />
        <Button label={'registrasi'} onPress={() => ToastAlert()} />
        <Gap height={20} />
        <Button label={'log in'} onPress={() => ToastAlert()} />
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  wrapper: {
    flex: 1,
    backgroundColor: Colors.backgroundColorBlue,
    justifyContent: 'center',
    paddingHorizontal: 65,
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 60,
  },
});
