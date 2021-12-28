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
  Separator,
  SpaceBeetwen,
  Status,
} from '../../Components';
import {formatSplit, SampleAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onCancelService} from '../../Services';
import {colors, fonts} from '../../Themes';

const AntenatalSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleCancelReason, setVisibleCancelReason] = useState(false);
  const [data, setData] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getData();
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

  const dataLaborHistory = loading
    ? []
    : formatSplit(data.bookingable.labor_history);

  const status = data && data.request_status.name;

  return (
    <Container>
      <Header
        title={`Detail Pesanan\nAntenatal (Pemeriksaan Kehamilan)`}
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
                label={'Kehamilan Ke'}
                value={data.bookingable.pregnancy.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Keguguran'}
                value={
                  data.bookingable.abortus
                    ? data.bookingable.abortus.toString
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
                label={'Bidan'}
                value={data.bidan.name}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Hari Pertaman Haid Terakhir (HPHT)'}
                value={moments(data.bookingable.date_last_haid).format(
                  'DD MMMM YYYY',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Hari Perkiraan Lahir (HPL)'}
                value={moments(data.bookingable.date_estimate_birth).format(
                  'DD MMMM YYYY',
                )}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Usia Kehamilan'}
                value={data.bookingable.gestational_age}
                editable={false}
              />

              <Text style={styles.label}>{'Riwayat Penyakit'}</Text>
              <FlatList
                data={data.bookingable.disease_histories}
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

              <Text style={styles.label}>{'Riwayat Persalinan'}</Text>
              <FlatList
                data={dataLaborHistory}
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
                label={'Gangguan Menstruasi'}
                value={
                  data.bookingable.menstrual_disorders
                    ? data.bookingable.menstrual_disorders
                    : 'Tidak Ada'
                }
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Tempat Persalinan'}
                value={data.bookingable.maternity_plan}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Golongan Darah'}
                value={data.bookingable.blood_group}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Total Nikah Istri'}
                value={data.bookingable.marital_status_wife.toString()}
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Total Nikah Suami'}
                value={data.bookingable.marital_status_husband.toString()}
                editable={false}
              />

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

export default AntenatalSerivceDetails;

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
