import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  Container,
  EmptyList,
  Header,
  IncomingOrderItems,
  Loading,
} from '../../Components';
import {Api} from '../../Services';

const OrderHistory = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings/history',
        params: {
          type: 'bidan',
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
      <Header
        title={'Daftar Histori Pesanan'}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => (
            <IncomingOrderItems navigation={navigation} data={item} />
          )}
          ListEmptyComponent={() => (
            <EmptyList desc="Belum terdapat pesanan masuk." />
          )}
        />
      )}
    </Container>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});
