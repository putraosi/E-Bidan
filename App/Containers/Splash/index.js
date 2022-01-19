import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getData} from '../../Helpers';
import {ILLogo} from '../../Images';
import {colors} from '../../Themes';

const Splash = ({navigation}) => {
  // useEffect(() => {
  //   getData('user').then(res => {
  //     if (res) {
  //       const {roles} = res;

  //       if (roles === 'bidan') {
  //         navigation.replace('HomeMidwife');
  //       } else {
  //         navigation.replace('HomePatient');
  //       }
  //     } else {
  //       navigation.replace('SignIn');
  //     }
  //   });
  // }, []);

  useEffect(() => {
    let timer1 = setTimeout(
      () =>
        getData('user')
          .then(res => {
            if (res) {
              const {roles} = res;

              if (roles === 'bidan') {
                navigation.replace('HomeMidwife');
              } else {
                navigation.replace('HomePatient');
              }
            } else {
              navigation.replace('SignIn');
            }
          })
          .catch(error => navigation.replace('SignIn')),
      0,
    );

    return () => {
      clearTimeout(timer1);
    };
  }, []);

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
