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
import { ToastAlert } from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const ImmunizationSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

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
        title={`Detail Pesanan\nImmunisasi`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
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
                <ItemList style={styles.list} key={item.id} name={item.name} />
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

            <Text>{'Hubungi Kami'}</Text>

            <Gap height={16} />
            <Button label={'Ubah'} onPress={() => ToastAlert()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default ImmunizationSerivceDetails;

const styles = StyleSheet.create({
  flex: {
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
