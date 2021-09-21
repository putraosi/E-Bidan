import DateTimePicker from '@react-native-community/datetimepicker';
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
import {
  Button,
  Container,
  Gap,
  Input,
  Row,
  SpaceBeetwen,
} from '../../Components';
import {useForm} from '../../Helpers';
import {IcDate, IcIndonesia, ILHeader, ILLogo} from '../../Images';
import {moments} from '../../Libs';
import {colors, fonts} from '../../Themes';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    husbandName: '',
    email: '',
    noHandphone: '',
    password: '',
    repeatPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useForm({
    _password: true,
    _repeatPassword: true,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

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
          <SpaceBeetwen>
            <Input
              style={styles.input}
              label={'Nama Depan'}
              value={form.firstName}
              onChangeText={value => setForm('firstName', value)}
            />
            <Gap width={16} />
            <Input
              style={styles.input}
              label={'Nama Belakang'}
              value={form.lastName}
              onChangeText={value => setForm('lastName', value)}
            />
          </SpaceBeetwen>
          <Gap height={12} />
          <Input
            label={'Tanggal Lahir'}
            iconRight={IcDate}
            value={moments(setForm.dateOfBirth).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setShowDatePicker(true)}
          />
          <Gap height={12} />
          <Input
            label={'Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />
          <Gap height={12} />
          <Input
            label={'Alamat E-Mail'}
            value={form.email}
            onChangeText={value => setForm('email', value)}
            keyboardType={'email-address'}
          />
          <Gap height={12} />
          <Input
            label={'No Handphone'}
            iconLeft={IcIndonesia}
            value={form.noHandphone}
            onChangeText={value => setForm('noHandphone', value)}
            keyboardType={'phone-pad'}
          />
          <Gap height={12} />
          <Input
            type={'password'}
            label={'Kata Sandi'}
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry={secureTextEntry._password}
            onTogglePassword={()=> setSecureTextEntry("_password", !secureTextEntry._password)}
          />
          <Gap height={12} />
          <Input
            type={'password'}
            label={'Ulangi Kata Sandi'}
            value={form.repeatPassword}
            onChangeText={value => setForm('repeatPassword', value)}
            secureTextEntry={secureTextEntry._repeatPassword}
            onTogglePassword={()=> setSecureTextEntry("_repeatPassword", !secureTextEntry._repeatPassword)}
          />
          <Gap height={16} />
          <Button
            label={'Registrasi'}
            onPress={() => navigation.replace('Confirmation')}
          />
          <Row style={styles.wrapperHaveAccount}>
            <Text style={styles.label}>{'Atau sudah mempunyai akun?'}</Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.haveAccount}>{` Masuk disini`}</Text>
            </TouchableOpacity>
          </Row>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={form.dateOfBirth}
            mode={'date'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setForm('dateOfBirth', selectedDate);
            }}
          />
        )}
      </ScrollView>
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
    flex: 1,
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
