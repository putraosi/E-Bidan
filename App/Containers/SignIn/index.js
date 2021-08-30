import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Gap, Input, Row} from '../../Components';
import {ToastAlert, useForm} from '../../Helpers';
import {ILHeader} from '../../Images';
import {Colors, Fonts} from '../../Themes';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  return (
    <Container>
      <Image style={styles.image} source={ILHeader} />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>{'Masuk'}</Text>
          <Input
            label={'Alama E-Mail'}
            value={form.email}
            onChangeText={value => setForm('email', value)}
            keyboardType={'email-address'}
          />
          <Input
            label={'Kata Sandi'}
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />

          <Gap height={16} />
          <Button type={'blue'} label={'MASUK'} onPress={() => ToastAlert()} />
        </View>
        <Row style={styles.wrapperHaveNotAccount}>
          <Text style={styles.label}>{'Belum punya akun?'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.haveNotAccount}>{` Daftar disini`}</Text>
          </TouchableOpacity>
        </Row>
      </View>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
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
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
    marginBottom: 20,
  },

  wrapperHaveNotAccount: {
    marginTop: 8,
    alignSelf: 'center',
  },

  label: {
    fontSize: 9,
    color: Colors.black,
    fontFamily: Fonts.primary.regular,
  },

  haveNotAccount: {
    fontSize: 9,
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
  },
});
