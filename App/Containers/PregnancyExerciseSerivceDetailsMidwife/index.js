import React, {useEffect, useState} from 'react';
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
  Header,
  Input,
  Loading,
  Modals,
  Status,
} from '../../Components';
import {constants, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onFinishServices, onUpdateStatusSerivces} from '../../Services';
import {colors, fonts} from '../../Themes';

const PregnancyExerciseSerivceDetailsMidwife = ({navigation, route}) => {
  const [form, setForm] = useForm({
    price: '',
    note: '',
  });

  const [loading, setLoading] = useState(true);
  const [visibleAccept, setVisibleAccept] = useState(false);
  const [visibleReject, setVisibleReject] = useState(false);
  const [visibleRejectReason, setVisibleRejectReason] = useState(false);
  const [visibleComplete, setVisibleComplete] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: `admin/bookings/${route.params.data.id}`,
      });

      setData(res);
      setLoading(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const onUpdateOrderStatus = async (status, reason) => {
    setLoading(true);
    try {
      await onUpdateStatusSerivces(data.id, status, reason);
      getData();
    } catch (error) {
      setLoading(false);
      SampleAlert({message: error.message});
    }
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      await onFinishServices(data.id, form.price, form.note);
      getData();
    } catch (error) {
      setLoading(false);
      SampleAlert({message: error.message});
    }
  };

  const validation = () => {
    if (!form.price)
      return ToastAlert('Silahkan isi total harga terlebih dahulu');
    if (!form.note) return ToastAlert('Silahkan isi catatan terlebih dahulu');

    setVisibleComplete(true);
  };

  const status = data && data.request_status.name;
  let showButtonFooter = status == 'new';
  let showInput = false;
  let label = 'Terima Pesanan';
  let onPress = () => setVisibleAccept(true);

  if (status == 'accepted') {
    showButtonFooter = true;
    showInput = true;

    label = 'Selesaikan Pesananan';
    onPress = () => validation();
  }

  return (
    <Container>
      <Header
        title={`Detail Pesanan\nSenam Hamil`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.wrapper}>
          <Status type={status} mode={constants.MIDWIFE} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Input
                label={'Kehamilan Ke'}
                value={data.bookingable.pregnancy.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Waktu Kunjungan'}
                value={moments(data.bookingable.visit_date).format(
                  'DD MMMM YYYY | HH:mm:ss',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Hari Pertama Haid Terakhir (HPHT)'}
                value={data.bookingable.date_last_haid}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Hari Perkiraan Lahir (HPL)'}
                value={data.bookingable.date_estimate_birth}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Usia Kehamilan'}
                value={data.bookingable.gestational_age}
                editable={false}
              />

              <Text style={styles.label}>{'Bukti Transfer'}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PreviewPhoto', {
                    image: {uri: data.bookingable.file_upload},
                  })
                }>
                <Image
                  style={styles.photo}
                  source={{uri: data.bookingable.file_upload}}
                />
              </TouchableOpacity>

              {showInput && (
                <>
                  <Input
                    style={styles.input}
                    label={'Total Harga'}
                    value={form.price}
                    keyboardType={'numeric'}
                    onChangeText={value => setForm('price', value)}
                  />

                  <Input
                    style={styles.input}
                    label={'Catatan'}
                    value={form.note}
                    multiline
                    onChangeText={value => setForm('note', value)}
                  />
                </>
              )}

              {status == 'new' && (
                <>
                  <Gap height={20} />
                  <Button
                    type={'reject'}
                    label={'Tolak Pesanan'}
                    onPress={() => setVisibleReject(true)}
                  />
                </>
              )}
            </View>
          </ScrollView>

          {showButtonFooter && (
            <View style={styles.button}>
              <Button label={label} onPress={onPress} />
            </View>
          )}
        </View>
      )}

      <Modals
        visible={visibleAccept}
        title={'Terima Pesanan'}
        desc={'Apakah anda yakin untuk menerima pesanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        onDismiss={() => setVisibleAccept(false)}
        onPress={() => {
          setVisibleAccept(false);

          onUpdateOrderStatus(3, '');
        }}
        onCancel={() => setVisibleAccept(false)}
      />

      <Modals
        visible={visibleReject}
        title={'Tolak Pesanan'}
        desc={'Apakah anda yakin untuk menolak pesanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        onDismiss={() => setVisibleReject(false)}
        onPress={() => {
          setVisibleReject(false);
          setVisibleRejectReason(true);
        }}
        onCancel={() => setVisibleReject(false)}
      />

      <Modals
        visible={visibleRejectReason}
        title={'Tolak Pesanan'}
        desc={'Apakah anda yakin untuk menolak pesanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        isReason
        onDismiss={() => setVisibleRejectReason(false)}
        onPress={reason => {
          if (!reason)
            return SampleAlert({
              message: 'Silahkan isi alasan menolak pesanan Anda',
            });

          setVisibleRejectReason(false);
          onUpdateOrderStatus(4, reason);
        }}
        onCancel={() => setVisibleRejectReason(false)}
      />

      <Modals
        visible={visibleComplete}
        title={'Selesaikan Pesanan'}
        desc={'Apakah anda yakin untuk menyelesaikan pesanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        onDismiss={() => setVisibleComplete(false)}
        onPress={() => {
          setVisibleComplete(false);
          onFinish();
        }}
        onCancel={() => setVisibleComplete(false)}
      />
    </Container>
  );
};

export default PregnancyExerciseSerivceDetailsMidwife;

const styles = StyleSheet.create({
  flex: {flex: 1},

  wrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },

  cancel: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    padding: 16,
  },

  content: {
    padding: 16,
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
    marginTop: 12,
  },

  list: {
    flex: 1,
    marginBottom: 4,
  },

  input: {
    marginTop: 12,
  },

  photo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor.primary,
  },
});
