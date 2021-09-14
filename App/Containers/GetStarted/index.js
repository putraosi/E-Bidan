import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Gap} from '../../Components';
import {ILLogo} from '../../Images';
import {colors} from '../../Themes';

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={ILLogo} />
      <Button
        label={'Registrasi'}
        onPress={() => navigation.navigate('SignUp')}
      />
      <Gap height={26} />
      <Button label={'Log In'} onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding:60
  },

  image: {
    width: 296,
    height: 296,
    alignSelf: 'center',
    marginBottom: 50,
  },
});
