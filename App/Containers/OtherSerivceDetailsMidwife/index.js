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
  Separator,
  Status,
} from '../../Components';
import {constants, SampleAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onFinishServices, onUpdateStatusSerivces} from '../../Services';
import {colors, fonts} from '../../Themes';

const OtherSerivceDetailsMidwife = ({navigation, route}) => {
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
        title={`Detail Pesanan\nLainnya`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.wrapper}>
          <Status type={status} mode={constants.MIDWIFE} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.remarks && (
              <>
                <Text
                  style={
                    styles.cancel
                  }>{`Alasan Dibatalkan:\n${data.remarks}`}</Text>
                <Separator backgroundColor={colors.primary} />
              </>
            )}

            <View style={styles.content}>
              <Input
                label={'Nama'}
                value={data.bookingable.name}
                editable={false}
              />

              <Gap height={12} />
              <Input
                label={'Usia'}
                value={data.bookingable.age.toString()}
                editable={false}
              />

              <Gap height={12} />
              <Input
                label={'Waktu Kunjungan'}
                value={moments(data.bookingable.visit_date).format(
                  'DD MMMM YYYY | HH:mm:ss',
                )}
                editable={false}
              />

              <Gap height={12} />
              <Input label={'Bidan'} value={data.bidan.name} editable={false} />

              <Gap height={12} />
              <Text style={styles.label}>{'Treatment'}</Text>
              <FlatList
                data={data.bookingable.other_service_other_category_services}
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

export default OtherSerivceDetailsMidwife;

const styles = StyleSheet.create({
  flex: {flex: 1},

  wrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },

  content: {
    padding: 16,
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
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
