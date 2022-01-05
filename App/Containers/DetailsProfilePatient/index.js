import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  ModalAlert,
  Modals,
  ModalSelect,
  SpaceBeetwen,
} from '../../Components';
import {
  ageCalculationYear,
  constants,
  resetPage,
  SampleAlert,
  storeData,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {IcEditCircle, IcMenu, ILNullPhoto} from '../../Images';
import {
  checkPermissionCamera,
  checkPermissionGallery,
  moments,
  openCamera,
  openGallery,
} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const DetailsProfilePatient = ({navigation, route}) => {
  const data = route.params.data;

  const [form, setForm] = useForm({
    name: data.name,
    photo: data.photo,
    birthDate: data.birth_date,
    idCard: data.id_card,
    email: data.email,
    phoneNumber: data.phone,
    religion: data.religion_wife,
    lastEducation: data.education_wife,
    profession: data.profession_wife,
    address: data.address,
    husbandName: data.spouse,
    husbandReligion: data.religion_husband,
    husbandBirthDate: data.birth_date_spouse,
    husbandLastEducation: data.education_husband,
    husbandProfession: data.profession_husband,
  });
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibleHusbandBirthDate, setVisibleHusbandBirthDate] = useState(false);
  const [visibleReligion, setVisibleReligion] = useState(false);
  const [visibleHusbandReligion, setVisibleHusbandReligion] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();

  const validation = () => {
    if (!form.photo && !selectPhoto)
      return ToastAlert('Silahkan ubah foto profil Anda terlebih dahulu');

    if (form.idCard && (form.idCard.length > 16 || form.idCard.length < 16))
      return ToastAlert('Silahkan masukan nik Anda yang valid terlebih dahulu');

    if (!form.name)
      return ToastAlert('Silahkan masukan nama Anda terlebih dahulu');

    if (
      form.phoneNumber &&
      (form.phoneNumber.length < 9 ||
        form.phoneNumber.length > 14 ||
        form.phoneNumber.charAt(0) != 0 ||
        form.phoneNumber.charAt(1) != 8)
    )
      return ToastAlert(
        'Silahkan masukan nomor handphone Anda yang valid terlebih dahulu',
      );

    if (
      !form.email.trim() ||
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      return ToastAlert('Silahkan masukan alamat email valid Anda');
    }

    if (!form.address)
      return ToastAlert('Silahkan masukan alamat Anda terlebih dahulu');

    if (!form.husbandName)
      return ToastAlert('Silahkan masukan nama suami Anda terlebih dahulu');

    setVisibleEdit(true);
  };

  const onLogout = async () => {
    setVisibleLogout(false);
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const res = Api.post({
        url: 'auth/logout',
      });

      dispatch({type: 'SET_LOADING', value: false});
      if (res) {
        resetPage(navigation, 'SignIn');
      } else {
        ToastAlert('Silahkan coba beberapa saat lagi!');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      ToastAlert('Silahkan coba beberapa saat lagi!');
    }
  };

  const onUpdate = async () => {
    setVisibleEdit(false);
    dispatch({type: 'SET_LOADING', value: true});

    const photo = selectPhoto
      ? `data:${selectPhoto.type};base64, ${selectPhoto.base64}`
      : form.photo;
    const birth_date = form.birthDate
      ? moments(form.birthDate).format('YYYY-MM-DD')
      : '';
    const age = form.birthDate
      ? parseInt(ageCalculationYear(form.birthDate))
      : 0;
    const birth_date_spouse = form.husbandBirthDate
      ? moments(form.husbandBirthDate).format('YYYY-MM-DD')
      : '';
    const age_spouse = form.husbandBirthDate
      ? parseInt(ageCalculationYear(form.husbandBirthDate))
      : 0;

    try {
      const res = await Api.post({
        url: `admin/pasiens/${data.id}`,
        body: {
          photo: photo,
          id_card: form.idCard,
          name: form.name,
          birth_date,
          age,
          religion_wife: form.religion,
          phone: form.phoneNumber,
          email: form.email,
          address: form.address,
          education_wife: form.lastEducation,
          profession_wife: form.profession,
          spouse: form.husbandName,
          birth_date_spouse,
          age_spouse,
          religion_husband: form.husbandReligion,
          education_husband: form.husbandLastEducation,
          profession_husband: form.husbandProfession,
          _method: 'put',
        },
      });

      let newData = res;
      newData.roles = 'pasien';

      storeData('user', newData);
      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
    }
  };

  let labelButtonFirst = 'Ubah';
  let onPressFirst = () => setIsChange(true);
  const photo = form.photo ? {uri: form.photo} : ILNullPhoto;
  const editable = isChange ? true : false;

  if (isChange) {
    labelButtonFirst = 'Simpan';
    onPressFirst = () => validation();
  }

  return (
    <Container>
      <Header
        onDismiss={() => navigation.goBack()}
        title={'Detail Profil'}
        iconRight={IcMenu}
        onPress={() => setVisibleSelect(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <TouchableOpacity onPress={() => ToastAlert()}>
            <Image style={styles.image} source={photo} />
            {isChange && (
              <TouchableOpacity
                style={styles.containerEdit}
                onPress={() => setVisibleSelectPhoto(true)}>
                <Image style={styles.edit} source={IcEditCircle} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <Text style={styles.mode}>{'Pasien'}</Text>
        </View>

        <View style={styles.content}>
          <Input
            label={'NIK'}
            value={form.idCard}
            editable={editable}
            onChangeText={value => setForm('idCard', value)}
          />

          <Input
            style={styles.input}
            label={'Nama'}
            value={form.name}
            editable={editable}
            onChangeText={value => setForm('name', value)}
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
              if (editable) setVisibleBirthDate(true);
            }}
          />

          <Input
            style={styles.input}
            label={'Umur'}
            value={
              form.birthDate
                ? `${ageCalculationYear(form.birthDate)} Tahun`
                : ''
            }
            editable={false}
          />

          <Input
            style={styles.input}
            label={'Agama'}
            value={form.religion}
            placeholder={'Pilih'}
            editable={false}
            onPress={() => {
              if (editable) setVisibleReligion(true);
            }}
          />

          <Input
            style={styles.input}
            label={'No. Hanphone'}
            value={form.phoneNumber}
            editable={editable}
            onChangeText={value => setForm('phoneNumber', value)}
          />

          <Input
            style={styles.input}
            label={'Email'}
            value={form.email}
            editable={editable}
            onChangeText={value => setForm('email', value)}
          />

          <Input
            style={styles.input}
            label={'Alamat'}
            value={form.address}
            editable={editable}
            onChangeText={value => setForm('address', value)}
          />

          <Input
            style={styles.input}
            label={'Pendidikan Terakhir'}
            value={form.lastEducation}
            editable={editable}
            onChangeText={value => setForm('lastEducation', value)}
          />

          <Input
            style={styles.input}
            label={'Pekerjaan'}
            value={form.profession}
            editable={editable}
            onChangeText={value => setForm('profession', value)}
          />

          <Input
            style={styles.input}
            label={'Nama Suami'}
            value={form.husbandName}
            editable={editable}
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
              if (editable) setVisibleHusbandBirthDate(true);
            }}
          />

          <Input
            style={styles.input}
            label={'Umur Suami'}
            value={
              form.husbandBirthDate
                ? `${ageCalculationYear(form.husbandBirthDate)} Tahun`
                : ''
            }
            editable={false}
          />

          <Input
            style={styles.input}
            label={'Agama Suami'}
            value={form.husbandReligion}
            placeholder={'Pilih'}
            editable={false}
            onPress={() => {
              if (editable) setVisibleHusbandReligion(true);
            }}
          />

          <Input
            style={styles.input}
            label={'Pendidikan Terakhir Suami'}
            value={form.husbandLastEducation}
            editable={editable}
            onChangeText={value => setForm('husbandLastEducation', value)}
          />

          <Input
            style={styles.input}
            label={'Pekerjaan Suami'}
            value={form.husbandProfession}
            editable={editable}
            onChangeText={value => setForm('husbandProfession', value)}
          />

          <Gap height={20} />
          <SpaceBeetwen>
            <Button
              style={styles.button}
              label={labelButtonFirst}
              onPress={onPressFirst}
            />
            {isChange && (
              <>
                <Gap width={16} />
                <Button
                  style={styles.button}
                  type={'white'}
                  label={'Batal'}
                  onPress={() => setIsChange(false)}
                />
              </>
            )}
          </SpaceBeetwen>

          <Text
            style={styles.version}>{`Version ${DeviceInfo.getVersion()}`}</Text>
        </View>
      </ScrollView>

      <Modals
        visible={visibleLogout}
        desc={'Anda yakin ingin\nkeluar aplikasi?'}
        onDismiss={() => setVisibleLogout(false)}
        labelPress={'Keluar'}
        labelCancel={'Batal'}
        onPress={onLogout}
        onCancel={() => setVisibleLogout(false)}
      />

      <Modals
        visible={visibleEdit}
        desc={'Anda yakin ingin\nmengubah profil?'}
        onDismiss={() => setVisibleEdit(false)}
        labelPress={'Ya'}
        labelCancel={'Tidak'}
        onPress={onUpdate}
        onCancel={() => setVisibleEdit(false)}
      />

      <ModalSelect
        visible={visibleSelect}
        data={constants.MENU_ITEM_PROFILE}
        onDismiss={() => setVisibleSelect(false)}
        onPress={value => {
          setVisibleSelect(false);
          if (value == 'Keluar') {
            setVisibleLogout(true);
          } else {
            navigation.navigate('ChangePassword');
          }
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

      <ModalAlert
        visible={visibleSuccess}
        desc={'Selamat anda telah berhasil\nmendaftar di layanan kami'}
        onDismiss={() => setVisibleSuccess(false)}
        onPress={() => setVisibleSuccess(false)}
      />

      {visibleBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthDate ? new Date(form.birthDate) : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.birthDate;
            setVisibleBirthDate(false);
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
    </Container>
  );
};

export default DetailsProfilePatient;
