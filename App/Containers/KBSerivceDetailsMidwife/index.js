import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  ItemList,
  Loading,
  Modals,
  Status,
} from '../../Components';
import {constants, SampleAlert, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onFinishServices, onUpdateStatusSerivces} from '../../Services';
import {colors, fonts} from '../../Themes';

const KBSerivceDetailsMidwife = ({navigation, route}) => {
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
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

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

  const onEdit = () => {
    return ToastAlert();
    navigation.navigate('AddServicesKB', {
      data: data,
      id: data.bookingable.service_category_id,
      userId: data.pasien_id,
      isEdit: true,
    });
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

  console.log('cek data', data);

  return (
    <Container>
      <Header
        title={`Detail Pesanan\nKeluarga Berencana (KB)`}
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
                label={'Jumlah Anak'}
                value={data.bookingable.total_child.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Umur Anak Terkecil'}
                value={data.bookingable.yongest_child_age.toString()}
                editable={false}
              />

              <Text style={styles.label}>{'Cara KB'}</Text>
              <FlatList
                data={data.bookingable.method_uses}
                renderItem={({item}) => (
                  <ItemList
                    style={styles.list}
                    key={item.id}
                    name={item.name}
                  />
                )}
                numColumns={2}
                scrollEnabled={false}
              />

              <Gap height={8} />
              <Input
                label={'Status Pengguna'}
                value={data.bookingable.status_use}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Tanggal Terakhir Haid'}
                value={moments(data.bookingable.date_last_haid).format(
                  'DD MMMM YYYY',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Menyusui'}
                value={data.bookingable.is_breast_feed ? 'Iya' : 'Tidak'}
                editable={false}
              />

              <Text style={styles.label}>{'Riwayat Penyakit'}</Text>
              <FlatList
                data={data.bookingable.disease_history_families}
                renderItem={({item}) => (
                  <ItemList
                    style={styles.list}
                    key={item.id}
                    name={item.name}
                  />
                )}
                numColumns={2}
                scrollEnabled={false}
                ListEmptyComponent={() => (
                  <ItemList style={styles.list} name={'Tidak Ada'} />
                )}
              />

              <Gap height={8} />
              <Input
                label={'Waktu Kunjungan'}
                value={moments(data.bookingable.visit_date).format(
                  'DD MMMM YYYY | HH:mm:ss',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Bidan'}
                value={data.bidan.name}
                editable={false}
              />

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

export default KBSerivceDetailsMidwife;

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
