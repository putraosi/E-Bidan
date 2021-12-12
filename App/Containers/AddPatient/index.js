import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Gap, Header, Input, Modals} from '../../Components';
import {constants, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors} from '../../Themes';

const AddPatient = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    gender: '',
    birth_place: '',
    birth_date: new Date(),
    email: '',
    noHandphone: '',
    address: '',
    spouse: '',
  });
  const [visibleGender, setVisibleGender] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.birth_date;
    setVisibleDatePicker(false);
    setForm('birth_date', currentDate);
  };

  const validation = () => {
    if (!form.name.trim()) {
      return ToastAlert('Silahkan masukan nama pasien');
    } else if (!form.gender.trim()) {
      return ToastAlert('Silahkan pilih jenis kelamin pasien');
    } else if (!form.birth_place.trim()) {
      return ToastAlert('Silahkan masukan tempat lahir pasien');
    } else if (
      !form.email.trim() ||
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      return ToastAlert('Silahkan masukan alamat email valid');
    } else if (!form.noHandphone.trim()) {
      return ToastAlert('Silahkan masukan nomor handphone');
    } else if (
      form.noHandphone.length < 9 ||
      form.noHandphone.length > 14 ||
      form.noHandphone.charAt(0) != 0 ||
      form.noHandphone.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor handphone valid');
    } else if (!form.address.trim()) {
      return ToastAlert('Silahkan masukan alamat pasien');
    } else if (!form.spouse.trim()) {
      return ToastAlert('Silahkan masukan nama suami pasien');
    }

    onRegistration(true);
  };

  const onRegistration = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const res = await Api.post({
        url: 'admin/pasiens',
        body: {
          name: form.name,
          email: form.email,

          gender: form.gender.toLowerCase(),
          birth_place: form.birth_place,
          birth_date: moments(form.birth_date).format("YYYY-MM-DD"),
          phone: form.noHandphone,
          address: form.address,
          spouse: form.spouse,
          status: 'active',
        },
      });
      dispatch({type: 'SET_LOADING', value: false});
      if (res) {
        setVisibleSuccess(true);
      } else {
        ToastAlert('Silahkan coba beberapa saat lagi!');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      ToastAlert('Silahkan coba beberapa saat lagi!');
    }
  };

  return (
    <Container>
      <Header
        type={'white'}
        title={'Tambah Pasien Baru'}
        onDismiss={() => navigation.goBack()}
      />

      <View style={styles.white}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              type={'white'}
              label={'Nama Pasien'}
              value={form.name}
              onChangeText={value => setForm('name', value)}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'Jenis Kelamin Pasien'}
              editable={false}
              value={form.gender}
              onPress={() => setVisibleGender(true)}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'Tempat Lahir Pasien'}
              value={form.birth_place}
              onChangeText={value => setForm('birth_place', value)}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'Tanggal Lahir Pasien'}
              value={moments(form.birth_date).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePicker(true)}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'E-Mail Pasien'}
              value={form.email}
              onChangeText={value => setForm('email', value)}
              keyboardType={'email-address'}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'No Handphone Pasien'}
              value={form.noHandphone}
              onChangeText={value => setForm('noHandphone', value)}
              keyboardType={'phone-pad'}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'Alamat Pasien'}
              multiline
              value={form.address}
              onChangeText={value => setForm('address', value)}
            />

            <Gap height={12} />
            <Input
              type={'white'}
              label={'Nama Suami Pasien'}
              multiline
              value={form.spouse}
              onChangeText={value => setForm('spouse', value)}
            />

            <Gap height={20} />
            <Button label={'Tambah'} onPress={validation} />
            <Gap height={20} />
          </ScrollView>
        </View>
      </View>

      <Modals
        type={'spinner'}
        title={'Jenis Kelamin'}
        visible={visibleGender}
        data={constants.SELECT_GENDER}
        onDismiss={() => setVisibleGender(false)}
        onPress={value => {
          setVisibleGender(false);
          setForm('gender', value);
        }}
      />

      <Modals
        visible={visibleSuccess}
        desc={'Selamat Anda berhasil menambahkan pasien'}
        labelPress={'Ok'}
        onPress={() => {
          setVisibleSuccess(false);
          navigation.goBack();
        }}
      />

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birth_date}
          mode={'date'}
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
    </Container>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  white: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
