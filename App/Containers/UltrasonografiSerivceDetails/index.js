import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Container, Gap, Header, Input, Loading} from '../../Components';
import {rupiah, ToastAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const UltrasonografiSerivceDetails = ({navigation, route}) => {
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

  return (
    <Container>
      <Header
        title={`Detail Pesanan\nSenam Hamil`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
              label={'Bidan'}
              value={data.bidan.name}
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
              label={'Baiya'}
              value={`Rp${rupiah(data.bookingable.cost)}`}
              editable={false}
            />

            <Gap height={20} />
            <Button label={'Ubah'} onPress={() => ToastAlert()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default UltrasonografiSerivceDetails;

const styles = StyleSheet.create({
  flex: {flex: 1},

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
