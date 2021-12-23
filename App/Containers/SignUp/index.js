import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Gap, Input, Modals, Row} from '../../Components';
import {constants, SampleAlert, ToastAlert, useForm} from '../../Helpers';
import {ILHeader, ILLogo} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    username: '',
    email: '',
    religionWife: '',
    professionWife: '',
    educationWife: '',
    noHandphone: '',
    password: '',
    repeatPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useForm({
    _password: true,
    _repeatPassword: true,
  });
  const [visibleReligion, setVisibleReligion] = useState(false);
  const dispatch = useDispatch();

  const validation = () => {
    if (!form.name.trim()) {
      return ToastAlert('Silahkan masukan nama Anda');
    }

    if (!form.username.trim()) {
      return ToastAlert('Silahkan masukan user name Anda');
    }

    if (
      !form.email.trim() ||
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      return ToastAlert('Silahkan masukan alamat email valid Anda');
    }

    if (!form.noHandphone.trim()) {
      return ToastAlert('Silahkan masukan nomor handphone Anda');
    }

    if (
      form.noHandphone.length < 9 ||
      form.noHandphone.length > 14 ||
      form.noHandphone.charAt(0) != 0 ||
      form.noHandphone.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor handphone valid Anda');
    }

    if (!form.religionWife.trim()) {
      return ToastAlert('Silahkan pilih agama Anda');
    }

    if (!form.professionWife.trim()) {
      return ToastAlert('Silahkan masukan pekerjaan Anda');
    }

    if (!form.educationWife.trim()) {
      return ToastAlert('Silahkan masukan pendidikan terkahir Anda');
    }

    if (!form.password.trim()) {
      return ToastAlert('Silahkan masukan kata sandi');
    }

    if (form.password.length < 8) {
      return ToastAlert('Kata sandi minimal 8 karakter');
    }

    if (form.password.trim() !== form.repeatPassword.trim()) {
      return ToastAlert('Ulangi kata sandi Anda tidak sesuai');
    }

    onRegister();
  };

  const onRegister = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      await Api.post({
        url: 'auth/register',
        body: {
          name: form.name,
          username: form.username,
          email: form.email,
          phone: form.noHandphone,
          religion_wife: form.religionWife,
          profession_wife: form.professionWife,
          education_wife: form.educationWife,
          password: form.password,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      navigation.navigate('Confirmation');
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
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
        <View showsVerticalScrollIndicator={false} style={styles.wrapper}>
          <Text style={styles.title}>{'Registrasi'}</Text>
          <Input
            label={'Nama'}
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />

          <Input
            style={styles.input}
            label={'User Name'}
            value={form.username}
            onChangeText={value => setForm('username', value)}
          />

          <Input
            style={styles.input}
            label={'Alamat E-Mail'}
            value={form.email}
            onChangeText={value => setForm('email', value)}
            keyboardType={'email-address'}
          />

          <Input
            style={styles.input}
            label={'No Handphone'}
            value={form.noHandphone}
            onChangeText={value => setForm('noHandphone', value)}
            keyboardType={'phone-pad'}
          />

          <Input
            style={styles.input}
            label={'Agama'}
            value={form.religionWife}
            placeholder={'Pilih'}
            editable={false}
            onPress={() => setVisibleReligion(true)}
          />

          <Input
            style={styles.input}
            label={'Pekerjaan'}
            value={form.professionWife}
            onChangeText={value => setForm('professionWife', value)}
          />

          <Input
            style={styles.input}
            label={'Pendidikan Terakhir'}
            value={form.educationWife}
            onChangeText={value => setForm('educationWife', value)}
          />

          <Input
            style={styles.input}
            type={'password'}
            label={'Kata Sandi'}
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry={secureTextEntry._password}
            onTogglePassword={() =>
              setSecureTextEntry('_password', !secureTextEntry._password)
            }
          />

          <Input
            style={styles.input}
            type={'password'}
            label={'Ulangi Kata Sandi'}
            value={form.repeatPassword}
            onChangeText={value => setForm('repeatPassword', value)}
            secureTextEntry={secureTextEntry._repeatPassword}
            onTogglePassword={() =>
              setSecureTextEntry(
                '_repeatPassword',
                !secureTextEntry._repeatPassword,
              )
            }
          />
          <Gap height={16} />
          <Button label={'Registrasi'} onPress={validation} />
          <Row style={styles.wrapperHaveAccount}>
            <Text style={styles.label}>{'Atau sudah mempunyai akun?'}</Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.haveAccount}>{` Masuk disini`}</Text>
            </TouchableOpacity>
          </Row>
        </View>
      </ScrollView>

      <Modals
        type={'spinner'}
        title={'Pilih Agama'}
        visible={visibleReligion}
        data={constants.SELECT_RELLIGION}
        onDismiss={() => setVisibleReligion(false)}
        onSelect={value => {
          setVisibleReligion(false);
          setForm('religionWife', value.name);
        }}
      />
    </Container>
  );
};

export default SignUp;

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

  input: {
    marginTop: 12,
  },

  wrapperHaveAccount: {
    marginTop: 12,
    alignSelf: 'center',
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },

  haveAccount: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
  },
});
