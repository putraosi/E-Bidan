import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, ItemOrderHistory } from '../../Components';

const OrderHistoryPatient = ({navigation}) => {
  const dataOrderHistory = [
    {id: 1, category: 'accepted'},
    {id: 2, category: 'rejected'},
    {id: 3, category: 'accepted'},
    {id: 4, category: 'accepted'},
    {id: 5, category: 'rejected'},
  ];

  return (
    <Container>
      <Header title={'Riwayat Pesanan'} onDismiss={() => navigation.goBack()} />
      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={dataOrderHistory}
        renderItem={({item}) => (
          <ItemOrderHistory
            key={item.id}
            data={item}
            onPress={() => navigation.navigate('OrderDetailPatient')}
          />
        )}
      />
    </Container>
  );
};

export default OrderHistoryPatient;

const styles = StyleSheet.create({
  content: {
    padding: 14,
  },
});
