import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Gap, Input, Modals} from '../../Components';
import {constants, resetPage, ToastAlert} from '../../Helpers';
import {ILHeader, ILLogo} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const Confirmation = ({navigation}) => {
  const [codeConfirmation, setCodeConfirmation] = useState('');
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [labelTime, setLabelTime] = useState('Kirim Ulang dalam 01:00');
  const [counter, setCounter] = useState(60);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval =
      counter > 0 &&
      setInterval(() => {
        onCounter();
      }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const onCounter = () => {
    const remaining = counter - 1;
    let m = Math.floor(remaining / 60);
    let s = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    setCounter(remaining);
    if (remaining) {
      setLabelTime(`Kirim Ulang dalam ${m}:${s}`);
    } else {
      setLabelTime(`Kirim Ulang`);
    }
  };

  const validation = () => {
    if (codeConfirmation.length > 6 || codeConfirmation.length < 6) {
      return ToastAlert('Mohon maaf maksimal kode verifikasi tidak sesuai');
    }

    onVerify();
  };

  const onVerify = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      Api.post({
        url: 'auth/verify',
        body: {
          verification_code: codeConfirmation,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      ToastAlert('Silahkan coba beberapa saat lagi!');
    }
  };

  const onRequestOTP = async email => {
    if (!constants.REGEX_EMAIL.test(email.trim().toLowerCase()))
      return ToastAlert('Silahkan masukan email yang valid');

    setVisibleEmail(false);
    setCounter(60);
    setLabelTime('Resend in 01:00');

    try {
      Api.post({
        url: 'auth/resend-code',
        body: {
          username: email.trim(),
        },
      });
    } catch (error) {}
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
          <Text style={styles.title}>{'Konfirmasi'}</Text>
          <Text style={styles.desc}>
            {
              'Kami telah mengirimkan kode ferifikasi ke alamat email anda, mohon untuk memasukan kedalam kolom di bawah ini'
            }
          </Text>
          <Input
            label={'Kode Verifikasi'}
            value={codeConfirmation}
            onChangeText={value => setCodeConfirmation(value)}
            keyboardType={'numeric'}
          />
          <Gap height={16} />
          <Button label={'Submit'} onPress={validation} />

          <Text style={styles.resend}>
            {"Didn't get the verification code?"}
            <Text
              style={styles.resendTime(labelTime)}
              onPress={() => {
                if (labelTime == 'Kirim Ulang') {
                  setVisibleEmail(true);
                }
              }}>{` ${labelTime}`}</Text>
          </Text>
        </View>
      </ScrollView>

      <Modals
        visible={visibleSuccess}
        desc={
          'Selamat Anda telah  berhasil mendaftarkan akun\n\nSilahkan hubungi admin kami untuk mengaktifkan akun Anda.'
        }
        labelPress={'Ok'}
        onDismiss={() => resetPage(navigation, 'SignIn')}
        onPress={() => resetPage(navigation, 'SignIn')}
      />

      <Modals
        visible={visibleEmail}
        title={'Kirim Ulang'}
        desc={'Silahkan masukan email Anda untuk menerima kode OTP terbaru'}
        isReason={true}
        labelPress={'Submit'}
        labelCancel={'Batal'}
        onDismiss={() => setVisibleEmail(false)}
        onCancel={() => setVisibleEmail(false)}
        onPress={value => onRequestOTP(value)}
      />
    </Container>
  );
};

export default Confirmation;

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

  desc: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    marginBottom: 12,
  },

  resend: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    marginTop: 20,
  },

  resendTime: type => ({
    fontSize: 12,
    color: type != 'Kirim Ulang' ? colors.text.secondary : colors.primary,
    fontFamily:
      type != 'Kirim Ulang' ? fonts.primary.regular : fonts.primary.bold,
  }),
});
