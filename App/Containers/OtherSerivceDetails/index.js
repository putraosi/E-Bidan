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
import {ToastAlert} from '../../Helpers';
import { moments } from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const OtherSerivceDetails = ({navigation, route}) => {
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
        title={`Detail Pesanan\nLainnya`}
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

            <Gap height={12} />
            <Input
              label={'Usia'}
              value={data.bookingable.age.toString()}
              editable={false}
            />

            <Gap height={12} />
            <Input label={'Waktu Kunjungan'} value={moments(data.bookingable.visit_date).format('DD MMMM YYYY | HH:mm:ss')} editable={false} />

            <Gap height={12} />
            <Input label={'Bidan'} value={data.bidan.name} editable={false} />

            <Gap height={12} />
            <Text style={styles.label}>{'Treatment'}</Text>
            <FlatList
              data={data.bookingable.other_service_other_category_services}
              renderItem={({item}) => (
                <ItemList style={styles.list} key={item.id} name={item.name} />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Gap height={16} />
            <Button label={'Ubah'} onPress={() => ToastAlert()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default OtherSerivceDetails;

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
  },

  list: {
    flex: 1,
    marginBottom: 4,
  },
});
