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
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const ImmunizationSerivceDetailsMidwife = ({navigation, route}) => {
  const [form, setForm] = useForm({
    price: '',
    note: '',
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [visibleAccept, setVisibleAccept] = useState(false);
  const [visibleReject, setVisibleReject] = useState(false);
  const [visibleRejectReason, setVisibleRejectReason] = useState(false);
  const [visibleComplete, setVisibleComplete] = useState(false);

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
      await Api.post({
        url: `admin/bookings/update-status/${data.id}`,
        body: {
          status,
          remarks: reason,
        },
      });

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
        title={`Detail Pesanan\nImmunisasi`}
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
                label={'Nama'}
                value={data.bookingable.name}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Jenis Kelamin'}
                value={data.bookingable.gender}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Tanggal Lahir'}
                value={moments(data.bookingable.birth_date).format(
                  'DD MMMM YYYY',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Tempat Lahir'}
                value={'Coming Soon!'}
                editable={false}
              />

              <Text style={styles.label}>{'Jenis Immunisasi'}</Text>
              <FlatList
                data={data.bookingable.immunization_types}
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
                label={'Bidan'}
                value={data.bidan.name}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Keterangan'}
                value={data.bookingable.remarks}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Jenis Persalinan/Cara Lahir'}
                value={data.bookingable.maternity_type}
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
          ToastAlert();
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
          ToastAlert();
        }}
        onCancel={() => setVisibleComplete(false)}
      />
    </Container>
  );
};

export default ImmunizationSerivceDetailsMidwife;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  wrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },

  content: {
    padding: 16,
  },

  input: {
    marginTop: 12,
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

  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor.primary,
  },
});
