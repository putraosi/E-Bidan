import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Gap, Input, Modals, Row} from '../../Components';
import {
  constants,
  sampleAlert,
  storeData,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {ILHeader, ILLogo} from '../../Images';
import {Api} from '../../Services/Api';
import {colors, fonts} from '../../Themes';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    // email: '',
    // password: '',
    email: 'test9@mailinator.com',
    password: '123456789',
  });
  const [visibleForgotPassword, setVisibleForgotPassword] = useState(false);
  const dispatch = useDispatch();

  const validation = () => {
    if (
      form.email.trim() === '' ||
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      sampleAlert('Silahkan masukan alamat email valid Anda');
    } else if (form.password.trim() === '') {
      sampleAlert('Silahkan masukan kata sandi Anda');
    }

    onLogin();
  };

  const onLogin = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const res = await Api.post({
        url: 'auth/login',
        body: {
          username: form.email,
          password: form.password,
        },
      });

      if (res) {
        const {roles, token} = res;

        storeData('token', token);
        storeData('mode', roles.name);

        if (roles.name === 'bidan') {
          storeData('user', res);
          navigation.replace('HomeMidwife');
        } else {
          storeData('user', res.pasien);
          navigation.replace('HomePatient');
        }

        dispatch({type: 'SET_LOADING', value: false});
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        sampleAlert('Silahkan masukan data login Anda dengan benar');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      sampleAlert('Silahkan masukan data login Anda dengan benar');
    }
  };

  const onForgot = async email => {
    setVisibleForgotPassword(false);
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const res = await Api.post({
        url: 'auth/forgot-password',
        body: {
          username: email,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      if (res) {
        ToastAlert('Password baru sudah dikirim kan ke e-mail Anda.');
      } else {
        ToastAlert('Silahkan coba beberapa saat lagi');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      ToastAlert('Silahkan masukan email dengan benar');
    }
  };

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
            <Button label={'Masuk'} onPress={validation} />

            <Row style={styles.containerFooter}>
              <Text style={styles.labelFooter}>{'Belum punya akun?'}</Text>
              <Text
                style={styles.labelHighlight}
                onPress={() =>
                  navigation.navigate('SignUp')
                }>{` Daftar disini`}</Text>
            </Row>
          </View>
        </View>
      </ScrollView>

      <Modals
        type={'forgot-password'}
        visible={visibleForgotPassword}
        onDismiss={() => setVisibleForgotPassword(false)}
        onPress={value => onForgot(value)}
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
