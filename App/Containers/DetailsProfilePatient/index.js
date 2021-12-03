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
  Modals,
  ModalSelect,
  SpaceBeetwen,
} from '../../Components';
import {constants, resetPage, ToastAlert} from '../../Helpers';
import {IcEditCircle, IcMenu, ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const DetailsProfilePatient = ({navigation, route}) => {
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [newPassword, setNewPassword] = useState('');
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

  const data = route.params.data;

  let labelButtonFirst = 'Ubah';
  let onPressFirst = () => setIsChange(true);
  // console.log('cek user', data);
  const photo = data.photo ? {uri: data.photo} : ILNullPhoto;
  const editable = isChange ? true : false;

  if (isChange) {
    labelButtonFirst = 'Simpan';
    onPressFirst = () => ToastAlert();
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
                onPress={() => ToastAlert()}>
                <Image style={styles.edit} source={IcEditCircle} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Input
            style={styles.input}
            label={'Nama'}
            value={data.name}
            editable={editable}
          />

          <Gap height={12} />
          <Input label={'Email'} value={'anyagrl@gmail.com'} editable={false} />

          <Gap height={12} />
          <Input label={'No. Hanphone'} value={data.phone} editable={false} />
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
        desc={'Anda yakin ingin\nkeluar aplikasi ?'}
        onDismiss={() => setVisibleLogout(false)}
        labelPress={'Keluar'}
        labelCancel={'Batal'}
        onPress={onLogout}
        onCancel={() => setVisibleLogout(false)}
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
    borderRadius: 24 / 2,
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
    flex: 1,
  },

  button: {
    flex: 1,
  },
});
