import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Header, ItemOrderSchedule} from '../../Components';

const OrderSchedule = ({navigation}) => {
  const dataOrderSchedule = [
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
      <Header title={'Jadwal Pesanan'} onDismiss={() => navigation.goBack()} />
      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={dataOrderSchedule}
        renderItem={({item}) => <ItemOrderSchedule key={item.id} data={item} onPress={() => navigation.navigate('OrderDetailPatient')} />}
      />
    </Container>
  );
};

export default OrderSchedule;

const styles = StyleSheet.create({
  content: {
    padding: 14,
  },
});
