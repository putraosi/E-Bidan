import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Container,
  EmptyList,
  Header,
  ItemOrderHistory,
  Loading,
} from '../../Components';
import {Api} from '../../Services';

const OrderHistoryPatient = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings/history',
        params: {
          type: 'pasien',
        },
      });

      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title={'Riwayat Pesanan'} onDismiss={() => navigation.goBack()} />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item}) => (
              <ItemOrderHistory navigation={navigation} data={item} />
            )}
            ListEmptyComponent={() => (
              <EmptyList desc="Belum terdapat jadwal booking." />
            )}
          />
        </View>
      )}
    </Container>
  );
};

export default OrderHistoryPatient;

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});
