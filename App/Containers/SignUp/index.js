import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Image,
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
import {IcDate, IcIndonesia, ILHeader} from '../../Images';
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={ILHeader} resizeMode={'stretch'} />
        <View showsVerticalScrollIndicator={false} style={styles.wrapper}>
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
          <Gap height={16} />
          <Input
            label={'Tanggal Lahir'}
            iconRight={IcDate}
            value={moments(setForm.dateOfBirth).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setShowDatePicker(true)}
          />
          <Gap height={16} />
          <Input
            label={'Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />
          <Gap height={16} />
          <Input
            label={'Alamat E-Mail'}
            value={form.email}
            onChangeText={value => setForm('email', value)}
            keyboardType={'email-address'}
          />
          <Gap height={16} />
          <Input
            label={'No Handphone'}
            iconLeft={IcIndonesia}
            value={form.noHandphone}
            onChangeText={value => setForm('noHandphone', value)}
            keyboardType={'phone-pad'}
          />
          <Gap height={16} />
          <Input
            label={'Kata Sandi'}
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={16} />
          <Input
            label={'Ulangi Kata Sandi'}
            value={form.repeatPassword}
            onChangeText={value => setForm('repeatPassword', value)}
            secureTextEntry
          />
          <Gap height={30} />
          <Button
            label={'Registrasi'}
            onPress={() => navigation.navigate('Confirmation')}
          />
          <Row style={styles.wrapperHaveAccount}>
            <Text style={styles.label}>{'Atau sudah mempunyai akun?'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
  image: {
    width: '100%',
    height: 180,
  },

  wrapper: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 22,
  },

  input: {
    flex: 1,
  },

  wrapperHaveAccount: {
    marginTop: 12,
    alignSelf: 'center',
  },

  label: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },

  haveAccount: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
  },
});
