import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Header, IncomingOrderItems, Loading} from '../../Components';
import {Api} from '../../Services';

const IncomingOrder = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings',
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
      <Header title={'Daftar Pesanan Masuk'} onDismiss={() => navigation.goBack()} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={styles.content}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <IncomingOrderItems
              key={item.id}
              navigation={navigation}
              data={item}
            />
          )}
        />
      )}
    </Container>
  );
};

export default IncomingOrder;

const styles = StyleSheet.create({
  content: {
    padding: 14,
  },
});
