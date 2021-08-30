import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Input,
  Row,
  SpaceBeetwen,
} from '../../Components';
import {ToastAlert, useForm} from '../../Helpers';
import {IcDate, ILHeader} from '../../Images';
import {moments} from '../../Libs';
import {Colors, Fonts} from '../../Themes';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Container>
      <Image style={styles.image} source={ILHeader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}>
        <Text style={styles.title}>{'Registrasi'}</Text>
        <SpaceBeetwen>
          <Input
            style={styles.input}
            label={'Nama Depan'}
            value={form.firstName}
            onChangeText={value => setForm('firstName', value)}
          />
          <Gap width={25} />
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
          label={'Alama E-Mail'}
          value={form.email}
          onChangeText={value => setForm('email', value)}
          keyboardType={'email-address'}
        />
        <Gap height={12} />
        <Input
          label={'No Handphone'}
          iconLeft={IcDate}
          value={form.noHandphone}
          onChangeText={value => setForm('noHandphone', value)}
          keyboardType={'phone-pad'}
        />
        <Gap height={12} />
        <Input
          label={'Kata Sandi'}
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={12} />
        <Input
          label={'Ulangi Kata Sandi'}
          value={form.repeatPassword}
          onChangeText={value => setForm('repeatPassword', value)}
          secureTextEntry
        />
        <Gap height={18} />
        <Button
          type={'blue'}
          label={'REGISTRASI'}
          onPress={() => navigation.navigate('Confirmation')}
        />
        <Row style={styles.wrapperHaveAccount}>
          <Text style={styles.label}>{'Atau sudah mempunyai akun?'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.haveAccount}>{` Masuk disini`}</Text>
          </TouchableOpacity>
        </Row>
      </ScrollView>

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
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },

  wrapper: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
    marginBottom: 20,
  },

  input: {
    flex: 1,
  },

  wrapperHaveAccount: {
    marginTop: 8,
    alignSelf: 'center',
  },

  label: {
    fontSize: 9,
    color: Colors.black,
    fontFamily: Fonts.primary.regular,
  },

  haveAccount: {
    fontSize: 9,
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
  },
});
