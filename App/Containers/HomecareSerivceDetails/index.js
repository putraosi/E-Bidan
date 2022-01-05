import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  ContactUs,
  Container,
  Gap,
  Header,
  Input,
  ItemList,
  Loading,
  Modals,
  Separator,
  SpaceBeetwen,
  Status,
} from '../../Components';
import {rupiah, SampleAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onCancelService} from '../../Services';
import {colors, fonts} from '../../Themes';

const HomecareSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleCancelReason, setVisibleCancelReason] = useState(false);
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

  const onCancel = async reason => {
    setLoading(true);
    try {
      await onCancelService(data.id, reason);
      getData();
    } catch (error) {
      setLoading(false);
      SampleAlert({message: error.message});
    }
  };

  const status = data && data.request_status.name;

  return (
    <Container>
      <Header
        title={`Detail Pesanan\nHomecare`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.wrapper}>
          <Status type={status} />
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
                label={'Nama Anak'}
                value={data.bookingable.name_son}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Usia Anak'}
                value={data.bookingable.age_son.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Waktu Kunjungan'}
                value={moments(data.bookingable.implementation_date).format(
                  'DD MMMMM YYYY | HH:mm:ss',
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
                label={'Tempat Pelaksanaan'}
                value={data.bookingable.implementation_place}
                editable={false}
              />

              <Text style={styles.label}>{'Treatment'}</Text>
              <FlatList
                data={data.bookingable.treatments}
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
                label={'Biaya'}
                value={`Rp${rupiah(data.bookingable.cost)}`}
                editable={false}
              />

              {status == 'accepted' && <ContactUs />}

              {status == 'new' && (
                <>
                  <Gap height={20} />
                  <SpaceBeetwen>
                    {/* <Button
                      style={styles.flex}
                      label={'Ubah'}
                      onPress={() => ToastAlert()}
                    />
                    <Gap width={20} /> */}
                    <Button
                      style={styles.flex}
                      type={'cancel'}
                      label={'Batalkan Pesanan'}
                      onPress={() => setVisibleCancel(true)}
                    />
                  </SpaceBeetwen>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      )}

      <Modals
        visible={visibleCancel}
        title={'Batalkan Pesanan'}
        desc={'Apakah anda yakin untuk membatalkan pesanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        onDismiss={() => setVisibleCancel(false)}
        onPress={() => {
          setVisibleCancel(false);
          setVisibleCancelReason(true);
        }}
        onCancel={() => setVisibleCancel(false)}
      />

      <Modals
        visible={visibleCancelReason}
        title={'Batalkan Pesanan'}
        desc={'Silahkan beri alasan kenapa Anda membatalkan layanan ini?'}
        labelPress={'Iya'}
        labelCancel={'Kembali'}
        isReason
        onDismiss={() => setVisibleCancelReason(false)}
        onPress={reason => {
          if (!reason)
            return SampleAlert({
              message: 'Silahkan isi alasan menolak pesanan Anda',
            });

          setVisibleCancelReason(false);
          onCancel(reason);
        }}
        onCancel={() => setVisibleCancelReason(false)}
      />
    </Container>
  );
};

export default HomecareSerivceDetails;

const styles = StyleSheet.create({
  flex: {flex: 1},

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
});
