import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Container, Gap, Header, Input, Modals} from '../../Components';
import {resetPage, ToastAlert} from '../../Helpers';
import {IcEditCircle, IcLogout, ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const DetailsProfileMidwife = ({navigation, route}) => {
  const data = route.params.data;

  const [visibleLogout, setVisibleLogout] = useState(false);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();

  const photo = data.bidan.photo ? {uri: data.bidan.photo} : ILNullPhoto;
  let labelButton = 'Ubah Kata Sandi';
  let onPress = () => ToastAlert();

  if (editable) {
    labelButton = 'Simpan';
    onPress = () => setEditable(false);
  }

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

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          onDismiss={() => navigation.goBack()}
          iconRight={editable ? null : IcLogout}
          onPress={() => setVisibleLogout(true)}
        />
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={() => {
              if (editable) ToastAlert();
              else navigation.navigate('PreviewPhoto', {image: photo});
            }}>
            <Image style={styles.image} source={photo} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {!editable && (
            <TouchableOpacity
              style={styles.containerEdit}
              onPress={() => setEditable(true)}>
              <Image style={styles.edit} source={IcEditCircle} />
            </TouchableOpacity>
          )}

          <Input
            style={styles.input}
            label={'Nama'}
            value={data.bidan.name}
            editable={editable}
          />
          <Gap height={12} />
          <Input label={'Email'} value={data.bidan.email} editable={false} />
          <Gap height={12} />
          <Input
            label={'No. Hanphone'}
            value={data.bidan.phone}
            editable={editable}
          />

          <Gap height={16} />
          <Button label={labelButton} onPress={onPress} />
        </View>
      </ScrollView>

      <Modals
        visible={visibleLogout}
        desc={'Anda yakin ingin\nkeluar aplikasi ?'}
        onDismiss={() => setVisibleLogout(false)}
        labelPress={'Iya'}
        labelCancel={'Tidak'}
        onPress={onLogout}
        onCancel={() => setVisibleLogout(false)}
      />
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

  containerEdit: {
    position: 'absolute',
    top: -15,
    right: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 24 / 2,
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
