import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Header, Input, ModalAlert} from '../../Components';
import {getData, SampleAlert, ToastAlert, useForm} from '../../Helpers';
import {Api} from '../../Services';

const ChangePassword = ({navigation}) => {
  const [form, setForm] = useForm({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const [formSecure, setFormSecure] = useForm({
    secureOldPassword: true,
    secureNewPassword: true,
    secureRepeatPassword: true,
  });

  const [user, setUser] = useState(null);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    });
  }, []);

  const validation = () => {
    if (!form.oldPassword) return ToastAlert('Silahkan isi kata sandi lama');
    if (!form.newPassword) return ToastAlert('Silahkan isi kata sandi baru');
    if (!form.repeatPassword)
      return ToastAlert('Silahkan isi ulangi kata sandi baru');
    if (form.newPassword != form.repeatPassword)
      return ToastAlert('Silahkan isi ulangi kata sandi baru yang sesuai');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', valu: true});
    try {
      const res = await Api.post({
        url: 'admin/change-password',
        body: {
          current_password: form.oldPassword,
          new_password: form.newPassword,
          confirmation_password: form.repeatPassword,
          user_id: user.id,
        },
      });

      dispatch({type: 'SET_LOADING', valu: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', valu: false});
      SampleAlert({message: error.message});
    }
  };

  return (
    <Container>
      <Header title={'Ubah Kata Sandi'} onDismiss={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input
          type={'password'}
          label={'Kata Sandi Lama'}
          value={form.oldPassword}
          secureTextEntry={formSecure.secureOldPassword}
          onChangeText={value => setForm('oldPassword', value)}
          onTogglePassword={() =>
            setFormSecure('oldPassword', !formSecure.oldPassword)
          }
        />

        <Input
          type={'password'}
          style={styles.input}
          label={'Kata Sandi Baru'}
          value={form.newPassword}
          secureTextEntry={formSecure.secureNewPassword}
          onChangeText={value => setForm('newPassword', value)}
          onTogglePassword={() =>
            setFormSecure('secureNewPassword', !formSecure.secureNewPassword)
          }
        />

        <Input
          type={'password'}
          style={styles.input}
          label={'Ulangi Kata Sandi Baru'}
          value={form.repeatPassword}
          secureTextEntry={formSecure.secureRepeatPassword}
          onChangeText={value => setForm('repeatPassword', value)}
          onTogglePassword={() =>
            setFormSecure('repeatPassword', !formSecure.repeatPassword)
          }
        />

        <Button
          style={styles.button}
          label={'Submit'}
          onPress={() => validation()}
        />
      </View>

      <ModalAlert
        visible={visibleSuccess}
        desc={'Selamat anda telah berhasil\n merubah kata sandi'}
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />
    </Container>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },

  input: {
    marginTop: 12,
  },

  button: {
    marginTop: 20,
  },
});
