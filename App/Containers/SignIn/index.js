import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Container, Gap, Input, Modals, Row} from '../../Components';
import {ToastAlert, useForm} from '../../Helpers';
import {ILHeader, ILLogo} from '../../Images';
import {colors, fonts} from '../../Themes';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const [visibleForgotPassword, setVisibleForgotPassword] = useState(false);
  const [visibleDigitCode, setVisibleDigitCode] = useState(false);
  const [visibleResetPassword, setVisibleResetPassword] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.wrapperImage}
          source={ILHeader}
          resizeMode={'stretch'}>
          <Image style={styles.image} source={ILLogo} />
        </ImageBackground>
        <View style={styles.wrapper}>
          <View showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{'Log In'}</Text>
            <Input
              label={'Alamat E-Mail'}
              value={form.email}
              onChangeText={value => setForm('email', value)}
              keyboardType={'email-address'}
            />
            <Gap height={12} />
            <Input
              label={'Kata Sandi'}
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />

            <Gap height={12} />

            <Text
              style={styles.labelHighlight}
              onPress={() =>
                setVisibleForgotPassword(true)
              }>{`Lupa Kata Sandi`}</Text>

            <Gap height={16} />
            <Button
              label={'Masuk'}
              onPress={() => navigation.replace('Home')}
            />

            <Row style={styles.containerFooter}>
              <Text style={styles.labelFooter}>{'Belum punya akun?'}</Text>
              <Text
                style={styles.labelHighlight}
                onPress={() =>
                  navigation.replace('SignUp')
                }>{` Daftar disini`}</Text>
            </Row>
          </View>
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
        onPress={value => {
          ToastAlert(value);
          setVisibleDigitCode(false);
          setVisibleResetPassword(true);
        }}
      />

      <Modals
        type={'reset-password'}
        visible={visibleResetPassword}
        onDismiss={() => setVisibleResetPassword(false)}
        onPress={value => {
          setVisibleResetPassword(false);
          ToastAlert(value);
        }}
      />
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  wrapperImage: {
    width: '100%',
    height: 120,
  },

  image: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 16,
    right: 16,
  },

  wrapper: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
  },

  forgotPassword: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'right',
    marginBottom: 16,
  },

  containerFooter: {
    marginTop: 20,
    alignSelf: 'center',
  },

  labelFooter: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },

  labelHighlight: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'right',
  },
});
