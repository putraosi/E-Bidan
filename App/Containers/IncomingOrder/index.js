import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Header, IncomingOrderItems} from '../../Components';
import { ToastAlert } from '../../Helpers';

const IncomingOrder = ({navigation}) => {
  const dataIncomingOrder = [
    {id: 1, category: 'pending'},
    {id: 2, category: 'progress'},
    {id: 3, category: 'pending'},
    {id: 4, category: 'reject'},
    {id: 5, category: 'progress'},
    {id: 6, category: 'pending'},
    {id: 7, category: 'pending'},
    {id: 8, category: 'progress'},
    {id: 9, category: 'pending'},
  ];
  return (
    <Container>
      <Header title={'Pesanan Masuk'} onDismiss={() => navigation.goBack()} />
      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={dataIncomingOrder}
        renderItem={({item}) => (
          <IncomingOrderItems
            key={item.id}
            data={item}
            onPress={() => navigation.navigate('IncomingOrderDetails')}
          />
        )}
      />
    </Container>
  );
};

export default IncomingOrder;

const styles = StyleSheet.create({
  content: {
    padding: 14,
  },
});
