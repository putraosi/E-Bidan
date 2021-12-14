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
} from '../../Components';
import {formatSplit, ToastAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const AntenatalSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
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

  console.log('cek data', data);

  const dataLaborHistory = loading
    ? []
    : formatSplit(data.bookingable.labor_history);

  return (
    <Container>
      <Header
        title={`Detail Pesan\nAntenatal (Pemeriksaan Kehamilan)`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                'DD MMMMM YYYY',
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
                <ItemList style={styles.list} key={item.id} name={item.name} />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Text style={styles.label}>{'Riwayat Persalinan'}</Text>
            <FlatList
              data={dataLaborHistory}
              renderItem={({item}) => (
                <ItemList style={styles.list} key={item.id} name={item.name} />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Input
              style={styles.input}
              label={'Gangguan Menstruasi'}
              value={data.bookingable.menstrual_disorders}
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

            <Gap height={16} />
            <Button label={'Ubah'} onPress={() => ToastAlert()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default AntenatalSerivceDetails;

const styles = StyleSheet.create({
  flex: {flex: 1},

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
