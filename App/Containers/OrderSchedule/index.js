import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Container,
  EmptyList,
  Header,
  ItemOrderSchedule,
  Loading,
} from '../../Components';
import {Api} from '../../Services';

const OrderSchedule = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings',
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
      <Header title={'Jadwal Booking'} onDismiss={() => navigation.goBack()} />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item}) => (
              <ItemOrderSchedule navigation={navigation} data={item} />
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

export default OrderSchedule;

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});
