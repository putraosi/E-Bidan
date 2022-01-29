import {useIsFocused} from '@react-navigation/native';
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
import {SampleAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api, onCancelService} from '../../Services';
import {colors, fonts} from '../../Themes';

const ImmunizationSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleCancelReason, setVisibleCancelReason] = useState(false);
  const [data, setData] = useState(null);
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

  const onShowUpdate = () => {
    navigation.navigate('AddServicesImmunization', {
      id: data.bookingable.service_category_id,
      data: data,
    });
  };

  const status = data && data.request_status.name;

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
                value={data.bookingable.place.name}
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
                value={
                  data.practice_schedule_time.practice_schedule_detail.bidan
                    .name
                }
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Keterangan'}
                value={
                  data.bookingable.remarks
                    ? data.bookingable.remarks
                    : 'Tidak Ada'
                }
                editable={false}
              />

              <Input
                style={styles.input}
                label={'Jenis Persalinan/Cara Lahir'}
                value={data.bookingable.maternity_type}
                editable={false}
              />

              {status == 'accepted' && (
                <>
                  <Gap height={16} />
                  <ContactUs />
                </>
              )}

              {status == 'new' && (
                <>
                  <Gap height={20} />
                  <SpaceBeetwen>
                    <Button
                      style={styles.flex}
                      label={'Ubah'}
                      onPress={onShowUpdate}
                    />
                    <Gap width={16} />
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

export default ImmunizationSerivceDetails;

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
});
