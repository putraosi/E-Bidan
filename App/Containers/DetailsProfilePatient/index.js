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
  openCamera,
  openGallery,
} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const DetailsProfilePatient = ({navigation, route}) => {
  const data = route.params.data;

  const [form, setForm] = useForm({
    photo: data.photo,
    name: data.name,
    email: data.email,
    phoneNumber: data.phone,
    address: data.address,
    spouse: data.spouse,
  });
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();

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

    try {
      const res = await Api.post({
        url: `admin/pasiens/${data.id}`,
        body: {
          name: form.name,
          photo: photo,
          spouse: form.spouse,
          address: form.address,
          _method: 'put',
        },
      });
      storeData('user', res.data);
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
    onPressFirst = () => setVisibleEdit(true);
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          onDismiss={() => navigation.goBack()}
          iconRight={IcMenu}
          onPress={() => setVisibleSelect(true)}
        />
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
        </View>

        <View style={styles.content}>
          <Input
            style={styles.input}
            label={'Nama'}
            value={form.name}
            editable={editable}
            onChangeText={value => setForm('name', value)}
          />

          <Gap height={12} />
          <Input
            style={styles.input}
            label={'Nama Pasangan'}
            value={form.spouse}
            editable={editable}
            onChangeText={value => setForm('spouse', value)}
          />

          <Gap height={12} />
          <Input
            style={styles.input}
            label={'Alamat'}
            value={form.address}
            editable={editable}
            onChangeText={value => setForm('address', value)}
          />

          <Gap height={12} />
          <Input label={'Email'} value={form.email} disable />

          <Gap height={12} />
          <Input label={'No. Hanphone'} value={form.phoneNumber} disable />
          <Gap height={20} />
          <SpaceBeetwen>
            <Button
              styleButton={styles.button}
              label={labelButtonFirst}
              onPress={onPressFirst}
            />
            {isChange && (
              <>
                <Gap width={16} />
                <Button
                  styleButton={styles.button}
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
            ToastAlert();
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
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />
    </Container>
  );
};

export default DetailsProfilePatient;

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
    flex: 1,
  },

  button: {
    flex: 1,
  },
});
