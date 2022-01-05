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
import {colors, fonts} from '../../Themes';

const DetailsProfileMidwife = ({navigation, route}) => {
  const data = route.params.data;

  const [form, setForm] = useForm({
    photo: data.photo,
    name: data.name,
    title: data.gelar,
    gender: data.gender,
    birthPlace: data.birth_place,
    birthDate: data.birth_date,
    email: data.email,
    phoneNumber: data.phone,
    description: data.description,
  });
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [visibleGender, setVisibleGender] = useState(false);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const dispatch = useDispatch();

  const onLogout = async () => {
    setVisibleLogout(false);
    dispatch({type: 'SET_LOADING', value: true});
    try {
      Api.post({
        url: 'auth/logout',
      });

      dispatch({type: 'SET_LOADING', value: false});
      resetPage(navigation, 'SignIn');
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
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

    try {
      const res = await Api.post({
        url: `admin/bidans/${data.id}`,
        body: {
          name: form.name,
          email: form.email,
          photo: photo,
          phone: form.phoneNumber,
          birth_place: form.birthPlace,
          birth_date,
          gender: form.gender,
          description: form.description,
          gelar: form.title,
          _method: 'put',
        },
        showLog: true,
      });

      let newData = res;
      newData.roles = 'bidan';

      storeData('user', newData);
      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
    }
  };

  const validation = () => {
    if (
      !form.email.trim() ||
      !constants.REGEX_EMAIL.test(form.email.trim().toLowerCase())
    ) {
      return ToastAlert(
        'Silahkan masukan alamat email valid Anda terlebih dahulu',
      );
    }

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

    if (!form.description)
      return ToastAlert('Silahkan masukan deskripsi Anda terlebih dahulu');

    setVisibleEdit(true);
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

          <Text style={styles.mode}>{'Bidan'}</Text>
        </View>

        <View style={styles.content}>
          <Input
            label={'Nama'}
            value={form.name}
            editable={editable}
            onChangeText={value => setForm('name', value)}
          />

          <Input
            style={styles.input}
            label={'Gelar'}
            value={form.title}
            editable={editable}
            onChangeText={value => setForm('title', value)}
          />

          <Input
            style={styles.input}
            label={'Jenis Kelamin'}
            value={form.gender}
            placeholder={'Pilih'}
            editable={false}
            onPress={() => {
              if (editable) {
                setVisibleGender(true);
              }
            }}
          />

          <Input
            style={styles.input}
            label={'Tempat Lahir'}
            value={form.birthPlace}
            editable={editable}
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
              if (editable) {
                setVisibleBirthDate(true);
              }
            }}
          />

          <Input style={styles.input} label={'Email'} value={form.email} />

          <Input
            style={styles.input}
            label={'No. Hanphone'}
            value={form.phoneNumber}
          />

          <Input
            style={styles.input}
            label={'Deskripsi'}
            value={form.description}
            editable={editable}
            onChangeText={value => setForm('description', value)}
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
        desc={'Anda yakin ingin\nkeluar aplikasi ?'}
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

      <ModalAlert
        visible={visibleSuccess}
        desc={'Selamat anda telah berhasil\nmendaftar di layanan kami'}
        onDismiss={() => setVisibleSuccess(false)}
        onPress={() => setVisibleSuccess(false)}
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
        visible={visibleGender}
        data={constants.SELECT_GENDER}
        onDismiss={() => setVisibleGender(false)}
        onPress={value => {
          setVisibleGender(false);
          setForm('gender', value);
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
    </Container>
  );
};

export default DetailsProfileMidwife;

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

  mode: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
    textAlign: 'center',
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
    width: 24,
    height: 24,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
  },

  email: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  version: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    marginTop: 16,
  },

  content: {
    padding: 16,
  },

  input: {
    marginTop: 12,
  },

  button: {
    flex: 1,
  },
});
