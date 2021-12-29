import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
  EmptyList,
  Gap,
  IncomingOrderItems,
  ItemOldPatient,
  ItemOrderHistory,
  Loading,
  Row,
} from '../../Components';
import {getData} from '../../Helpers';
import {IcAdd, ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const HomeMidwife = ({navigation}) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingIncomingOrder, setLoadingIncomingOrder] = useState(true);
  const [loadingOrderHistory, setLoadingOrderHistory] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const [dataIncomingOrder, setDataIncomingOrder] = useState([]);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const isFocused = useIsFocused();

  const dataOldPatient = [];

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
      setLoadingUser(false);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getBooking();
      getHistory();
    }
  }, [isFocused]);

  const getBooking = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings',
        params: {
          type: 'bidan',
          per_page: 3,
        },
      });

      setDataIncomingOrder(res);
      setLoadingIncomingOrder(false);
    } catch (error) {
      setLoadingIncomingOrder(false);
    }
  };

  const getHistory = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings/history',
        params: {
          type: 'bidan',
          per_page: 3,
        },
      });

      setDataOrderHistory(res);
      setLoadingOrderHistory(false);
    } catch (error) {
      setLoadingOrderHistory(false);
    }
  };

  const photo =
    dataUser && dataUser.bidan && dataUser.bidan.photo
      ? {url: dataUser.bidan.photo}
      : ILNullPhoto;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loadingUser ? (
          <Loading />
        ) : (
          <TouchableOpacity
            style={styles.containerHeader}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('DetailsProfileMidwife', {data: dataUser})
            }>
            <Image style={styles.photo} source={photo} />
            <Text style={styles.name}>{dataUser.name}</Text>
            <Text style={styles.type}>{'Bidan'}</Text>
          </TouchableOpacity>
        )}
        <Gap height={16} />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => navigation.navigate('AddPatient')}>
          <Row>
            <View style={styles.wrapperAdd}>
              <Image style={styles.iconAdd} source={IcAdd} />
            </View>
            <Text style={styles.add}>{'Tambah Pasien Baru'} </Text>
          </Row>
        </TouchableOpacity>

        <Text style={styles.subTitle}>{'Pesanan Masuk'} </Text>

        <View style={styles.wrapper}>
          {loadingIncomingOrder ? (
            <Loading type={'secondary'} />
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={dataIncomingOrder}
                renderItem={({item}) => (
                  <IncomingOrderItems navigation={navigation} data={item} />
                )}
                ListEmptyComponent={() => (
                  <EmptyList
                    type={'secondary'}
                    desc="Belum terdapat pesanan masuk."
                  />
                )}
              />
              {dataIncomingOrder.length > 0 && (
                <Text
                  style={styles.next}
                  onPress={() => navigation.navigate('IncomingOrder')}>
                  {'Selengkapnya'}
                </Text>
              )}
            </>
          )}
        </View>

        <Text style={styles.subTitle}>{'Histori Pesanan'} </Text>

        <View style={styles.wrapper}>
          {loadingOrderHistory ? (
            <Loading type={'secondary'} />
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={dataOrderHistory}
                renderItem={({item}) => (
                  <IncomingOrderItems navigation={navigation} data={item} />
                )}
                ListEmptyComponent={() => (
                  <EmptyList
                    type={'secondary'}
                    desc="Belum terdapat histori pesanan."
                  />
                )}
              />
              {dataOrderHistory.length > 0 && (
                <Text
                  style={styles.next}
                  onPress={() => navigation.navigate('OrderHistory')}>
                  {'Selengkapnya'}
                </Text>
              )}
            </>
          )}
        </View>
        <Gap height={16} />
      </ScrollView>
    </Container>
  );
};

export default HomeMidwife;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 16,
  },

  photo: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 70 / 2,
    borderColor: colors.white,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    marginTop: 4,
  },

  type: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.regular,
  },

  wrapper: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 24,
  },

  wrapperAdd: {
    padding: 4,
    backgroundColor: colors.backgroundColorGreen,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30 / 2,
  },

  iconAdd: {
    width: 20,
    height: 20,
  },

  add: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    marginLeft: 8,
  },

  subTitle: {
    fontSize: 14,
    color: colors.text.green,
    fontFamily: fonts.primary.bold,
    marginVertical: 16,
    marginLeft: 16,
  },

  next: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    textAlign: 'right',
  },
});
