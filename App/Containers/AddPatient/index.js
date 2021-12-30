import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Modals,
  ModalSelect,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {
  ageCalculationYear,
  constants,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {IcEditCircle, ILNullPhoto} from '../../Images';
import {
  checkPermissionCamera,
  checkPermissionGallery,
  moments,
  openCamera,
  openGallery,
} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const AddPatient = ({navigation}) => {
  const [form, setForm] = useForm({
    photo: '',
    username: '',
    idCard: '',
    name: '',
    gender: '',
    phoneNumber: '',

    birthPlace: '',
    birthDate: '',
    religion: '',
    email: '',
    address: '',
    lastEducation: '',
    profession: '',
    husbandName: '',
    husbandBirthDate: '',
    husbandReligion: '',
    husbandPhoneNumber: '',
    husbandLastEducation: '',
    husbandProfession: '',
  });
  const [visibleGender, setVisibleGender] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibleReligion, setVisibleReligion] = useState(false);
  const [visibleHusbandBirthDate, setVisibleHusbandBirthDate] = useState(false);
  const [visibleHusbandReligion, setVisibleHusbandReligion] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.birth_date;
    setVisibleDatePicker(false);
    setForm('birth_date', currentDate);
  };

  const validation = () => {
    if (!selectPhoto) {
      return ToastAlert('Silahkan isi photo pasien');
    }

    if (!form.username) {
      return ToastAlert('Silahkan masukan username pasien');
    }

    if (form.idCard && (form.idCard.length > 16 || form.idCard.length < 16))
      return ToastAlert('Silahkan masukan nik pasien yang valid');

    if (!form.name.trim()) {
      return ToastAlert('Silahkan masukan nama pasien');
    }

    if (!form.gender) {
      return ToastAlert('Silahkan pilih jenis kelamin pasien');
    }

    if (
      !form.phoneNumber ||
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    )
      return ToastAlert('Silahkan masukan nomor handphone pasien yang valid');

    if (!form.birthPlace) {
      return ToastAlert('Silahkan masukan tempat lahir pasien');
    }

    if (!form.birthDate) {
      return ToastAlert('Silahkan pilih tanggal lahir pasien');
    }

    if (!form.address) {
      return ToastAlert('Silahkan masukan alamat pasien');
    }

    if (!form.religion) {
      return ToastAlert('Silahkan pilih agama pasien');
    }

    if (
      form.email.trim() &&
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      return ToastAlert('Silahkan masukan alamat email valid pasien');
    }

    if (!form.lastEducation) {
      return ToastAlert('Silahkan masukan pendidikan terakhir pasien');
    }

    if (!form.profession) {
      return ToastAlert('Silahkan masukan pekerjaan pasien');
    }

    if (!form.husbandName) {
      return ToastAlert('Silahkan masukan nama suami pasien');
    }

    onRegistration();
  };

  const onRegistration = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      await Api.post({
        url: 'admin/pasiens',
        body: {
          photo: `data:${selectPhoto.type};base64, ${selectPhoto.base64}`,
          username: form.username,
          id_card: form.idCard,
          name: form.name,
          gender: form.gender.toLowerCase(),
          phone: form.phoneNumber,
          birth_place: form.birthPlace,
          birth_date: moments(form.birthDate).format('YYYY-MM-DD'),
          age: ageCalculationYear(form.birthDate),
          address: form.address,
          religion_wife: form.religion,
          email: form.email,
          education_wife: form.lastEducation,
          profession_wife: form.profession,
          spouse: form.husbandName,
          birth_date_spouse: form.husbandBirthDate
            ? moments(form.husbandBirthDate).format('YYYY-MM-DD')
            : '',
          age_spouse: form.husbandBirthDate
            ? ageCalculationYear(form.husbandBirthDate)
            : '',
          religion_husband: form.husbandReligion,
          phone_spouse: form.husbandPhoneNumber,
          education_husband: form.husbandLastEducation,
          profession_husband: form.husbandProfession,
          status: 'active',
        },
      });
      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});

      SampleAlert({message: error.message});
    }
  };

  const photo = form.photo ? {uri: form.photo} : ILNullPhoto;

  return (
    <Container>
      <Header
        type={'white'}
        title={'Tambah Pasien Baru'}
        onDismiss={validation}
        // onDismiss={() => navigation.goBack()}
      />

      <View style={styles.white}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerHeader}>
              <TouchableOpacity onPress={() => ToastAlert()}>
                <Image style={styles.image} source={photo} />
                <TouchableOpacity
                  style={styles.containerEdit}
                  onPress={() => setVisibleSelectPhoto(true)}>
                  <Image style={styles.edit} source={IcEditCircle} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <Input
              label={'Username'}
              value={form.username}
              onChangeText={value => setForm('username', value)}
            />

            <Input
              style={styles.input}
              label={'NIK'}
              value={form.idCard}
              keyboardType={'numeric'}
              onChangeText={value => setForm('idCard', value)}
            />

            <Input
              style={styles.input}
              label={'Nama'}
              value={form.name}
              onChangeText={value => setForm('name', value)}
            />

            <Text style={styles.label}>{'Jenis Kelamin'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_GENDER.map((item, index) => (
                <RadioButton
                  style={styles.radioButton}
                  key={parseInt(index + 1)}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.name == form.gender}
                  onPress={() => setForm('gender', item.name)}
                />
              ))}
            </SpaceBeetwen>

            <Input
              style={styles.input}
              label={'No. Hanphone'}
              value={form.phoneNumber}
              keyboardType={'numeric'}
              onChangeText={value => setForm('phoneNumber', value)}
            />

            <Input
              style={styles.input}
              label={'Tempat Lahir'}
              value={form.birthPlace}
              onChangeText={value => setForm('birthPlace', value)}
            />

            <Input
              style={styles.input}
              label={'Tanggal Lahir'}
              value={
                form.birthDate
                  ? moments(form.birthDate).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                setVisibleBirthDate(true);
              }}
            />

            <Input
              style={styles.input}
              label={'Umur'}
              value={
                form.birthDate
                  ? `${ageCalculationYear(form.birthDate)} Tahun`
                  : '-'
              }
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Alamat'}
              value={form.address}
              onChangeText={value => setForm('address', value)}
            />

            <Input
              style={styles.input}
              label={'Agama'}
              value={form.religion}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                setVisibleReligion(true);
              }}
            />

            <Input
              style={styles.input}
              label={'Email'}
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />

            <Input
              style={styles.input}
              label={'Pendidikan Terakhir'}
              value={form.lastEducation}
              onChangeText={value => setForm('lastEducation', value)}
            />

            <Input
              style={styles.input}
              label={'Pekerjaan'}
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />

            <Input
              style={styles.input}
              label={'Nama Suami'}
              value={form.husbandName}
              onChangeText={value => setForm('husbandName', value)}
            />

            <Input
              style={styles.input}
              label={'Tanggal Lahir Suami'}
              value={
                form.husbandBirthDate
                  ? moments(form.husbandBirthDate).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                setVisibleHusbandBirthDate(true);
              }}
            />

            <Input
              style={styles.input}
              label={'Umur Suami'}
              value={
                form.husbandBirthDate
                  ? `${ageCalculationYear(form.husbandBirthDate)} Tahun`
                  : '-'
              }
            />

            <Input
              style={styles.input}
              label={'Agama Suami'}
              value={form.husbandReligion}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                setVisibleHusbandReligion(true);
              }}
            />

            <Input
              style={styles.input}
              label={'No. Hanphone Suami'}
              value={form.husbandPhoneNumber}
              keyboardType={'numeric'}
              onChangeText={value => setForm('husbandPhoneNumber', value)}
            />

            <Input
              style={styles.input}
              label={'Pendidikan Terakhir Suami'}
              value={form.husbandLastEducation}
              onChangeText={value => setForm('husbandLastEducation', value)}
            />

            <Input
              style={styles.input}
              label={'Pekerjaan Suami'}
              value={form.husbandProfession}
              onChangeText={value => setForm('husbandProfession', value)}
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

      <Modals
        type={'spinner'}
        title={'Pilih Agama'}
        visible={visibleReligion}
        data={constants.SELECT_RELLIGION}
        onDismiss={() => setVisibleReligion(false)}
        onSelect={value => {
          setVisibleReligion(false);
          setForm('religion', value.name);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Pilih Agama'}
        visible={visibleHusbandReligion}
        data={constants.SELECT_RELLIGION}
        onDismiss={() => setVisibleHusbandReligion(false)}
        onSelect={value => {
          setVisibleHusbandReligion(false);
          setForm('husbandReligion', value.name);
        }}
      />

      <ModalSelect
        visible={visibleSelectPhoto}
        data={constants.SELECT_PHOTO}
        onDismiss={() => setVisibleSelectPhoto(false)}
        onPress={async value => {
          setVisibleSelectPhoto(false);
          if (value == 'Gallery') {
            const granted = await checkPermissionGallery();
            if (granted) {
              const callback = await openGallery();
              const item = callback.assets[0];
              setSelectPhoto(item);
              setForm('photo', item.uri);
            }
          } else {
            const granted = await checkPermissionCamera();
            if (granted) {
              const callback = await openCamera();
              const item = callback.assets[0];
              setSelectPhoto(item);
              setForm('photo', item.uri);
            }
          }
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

      {visibleBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthDate ? new Date(form.birthDate) : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setVisibleBirthDate(false);

            const currentDate = selectedDate || form.birthDate;
            setForm('birthDate', currentDate);
          }}
        />
      )}

      {visibleHusbandBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={
            form.husbandBirthDate ? new Date(form.husbandBirthDate) : new Date()
          }
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.husbandBirthDate;
            setVisibleHusbandBirthDate(false);
            setForm('husbandBirthDate', currentDate);
          }}
        />
      )}
    </Container>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: 16,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },

  containerEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 34 / 2,
    backgroundColor: colors.primary,
  },

  edit: {
    width: 30,
    height: 30,
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
    marginTop: 12,
  },

  radioButton: {
    flex: 1,
  },

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

  input: {
    marginTop: 12,
  },
});
