import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Gap, Input, Modals} from '../../Components';
import {ToastAlert, useForm} from '../../Helpers';
import {ILHeader} from '../../Images';
import {colors, fonts} from '../../Themes';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const [visibleForgotPassword, setVisibleForgotPassword] = useState(false);
  const [visibleDigitCode, setVisibleDigitCode] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={ILHeader} resizeMode={'stretch'} />
        <View style={styles.wrapper}>
          <View showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{'Log In'}</Text>
            <Input
              label={'Alamat E-Mail'}
              value={form.email}
              onChangeText={value => setForm('email', value)}
              keyboardType={'email-address'}
            />
            <Gap height={20} />
            <Input
              label={'Kata Sandi'}
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />

            <Gap height={34} />
            <Button
              label={'Masuk'}
              onPress={() => navigation.navigate('Home')}
            />

            <Text
              style={styles.forgotPassword}
              onPress={() => setVisibleForgotPassword(true)}>
              {'Tidak bisa masuk? Lupa Kata Sandi'}
            </Text>
          </View>
          <Text
            style={styles.haveNotAccount}
            onPress={() =>
              navigation.navigate('SignUp')
            }>{`Belum punya akun? Daftar disini`}</Text>
        </View>
      </ScrollView>

      <Modals
        type={'forgot-password'}
        visible={visibleForgotPassword}
        onDismiss={() => setVisibleForgotPassword(false)}
        onPress={value => {
          ToastAlert(value);
          setVisibleForgotPassword(false);
          setVisibleDigitCode(true);
        }}
      />

      <Modals
        type={'digit-code'}
        visible={visibleDigitCode}
        onDismiss={() => setVisibleDigitCode(false)}
        onPress={value => ToastAlert(value)}
      />
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
  },

  wrapper: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 36,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 22,
  },

  forgotPassword: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginTop: 22,
    textAlign: 'center',
    marginBottom: 16,
  },

  haveNotAccount: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
});
