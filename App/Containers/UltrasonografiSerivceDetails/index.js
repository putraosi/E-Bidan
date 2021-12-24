import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Loading,
  Modals,
  SpaceBeetwen,
  Status,
} from '../../Components';
import {rupiah, SampleAlert, ToastAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onCancelService} from '../../Services';
import {colors, fonts} from '../../Themes';

const UltrasonografiSerivceDetails = ({navigation, route}) => {
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
        title={`Detail Pesanan\nUSG`}
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
                label={'Total Anak'}
                value={data.bookingable.child.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Keguguran'}
                value={
                  data.bookingable.abortus
                    ? data.bookingable.abortus.toString()
                    : 'Tidak Pernah'
                }
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

              <Input
                style={styles.input}
                label={'Jenis USG'}
                value={data.bookingable.ultrasonografi_types[0].name}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Biaya'}
                value={`Rp${rupiah(data.bookingable.cost)}`}
                editable={false}
              />

              {status == 'new' && (
                <>
                  <Gap height={20} />
                  <SpaceBeetwen>
                    <Button
                      style={styles.flex}
                      label={'Ubah'}
                      onPress={() => ToastAlert()}
                    />
                    <Gap width={20} />
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

export default UltrasonografiSerivceDetails;

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
});
