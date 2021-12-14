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
import {rupiah, ToastAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const HomecareSerivceDetails = ({navigation, route}) => {
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
        title={`Detail Pesanan\nHomecare`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                <ItemList style={styles.list} key={item.id} name={item.name} />
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

            <Gap height={16} />
            <Button label={'Ubah'} onPress={() => ToastAlert()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default HomecareSerivceDetails;

const styles = StyleSheet.create({
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
