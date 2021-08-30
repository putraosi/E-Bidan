import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Gap} from '../../Components';
import {ILGetStarted, ILLogo} from '../../Images';
import {Colors} from '../../Themes/Colors';

const GetStarted = ({navigation}) => {
  return (
    <ImageBackground style={styles.container} source={ILGetStarted}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={ILLogo} />
        <Button
          label={'registrasi'}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Gap height={20} />
        <Button label={'masuk'} onPress={() => navigation.navigate('SignIn')} />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

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
