import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Container,
  EmptyList,
  Gap,
  ItemOrderHistory,
  ItemOrderSchedule,
  Loading,
  Modals,
  Row,
  SpaceBeetwen,
} from '../../Components';
import {getData, ToastAlert} from '../../Helpers';
import {IcNotification, ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const HomePatient = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrderSchedule, setLoadingOrderSchedule] = useState(true);
  const [loadingOrderHistory, setLoadingOrderHistory] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataOrderSchedule, setDataOrderSchedule] = useState([]);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const [dataSevices, setDataSevices] = useState(null);
  const [visibelServices, setVisibelServices] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    getData('user').then(res => {
      setDataUser(res);
      setLoadingUser(false);
    });

    getServiceCategory();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getBooking();
    }
  }, [isFocused]);

  const getServiceCategory = async () => {
    try {
      const res = await Api.get({
        url: 'admin/service-categories',
      });

      setDataSevices(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getBooking = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings',
        params: {
          type: 'pasien',
          per_page: 3,
        },
      });

      setDataOrderSchedule(res);
      setLoadingOrderSchedule(false);
    } catch (error) {
      setLoadingOrderSchedule(false);
    }
  };

  const onShowService = select => {
    setVisibelServices(false);

    let screen = '';
    if (select.name == 'Homecare') {
      screen = 'AddServicesHomecare';
    } else if (select.name === 'Antenatal (Pemeriksaan Kehamilan)')
      screen = 'AddServicesAntenatal';
    else if (select.name === 'Imunisasi') screen = 'AddServicesImmunization';
    else if (select.name === 'INC') screen = 'AddServicesInc';
    else if (select.name === 'Pelayanan Rujukan')
      screen = 'AddServicesReferral';
    else if (select.name === 'Lainnya') screen = 'AddServicesOther';
    else if (select.name == 'Senam Hamil')
      screen = 'AddServicesPregnancyExercise';
    else if (select.name == 'USG') screen = 'AddServicesUltrasonografi';
    else if (select.name == 'Keluarga Berencana (KB)') screen = 'AddServicesKB';

    if (!screen) return ToastAlert();

    navigation.navigate(screen, {id: select.id, userId: dataUser.id});
  };

  const photo =
    dataUser && dataUser.pasien && dataUser.pasien.photo
      ? {url: dataUser.pasien.photo}
      : ILNullPhoto;

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {loadingUser ? (
              <Loading />
            ) : (
              <TouchableOpacity
                style={styles.containerHeader}
                onPress={() =>
                  navigation.navigate('DetailsProfilePatient', {data: dataUser})
                }>
                <Row>
                  <Image style={styles.image} source={photo} />
                  <View style={styles.wrapperAccount}>
                    <Text style={styles.name}>{dataUser.name}</Text>
                    <Text style={styles.type}>{'Pasien'}</Text>
                  </View>
                </Row>

                <TouchableOpacity onPress={() => navigation.navigate('NotificationPatient')}>
                  <Image
                    style={styles.imageNotification}
                    source={IcNotification}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}

            <View style={styles.containerOrder}>
              <SpaceBeetwen>
                <Text style={styles.title}>{'Jadwal Booking'}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderSchedule')}>
                  {!loadingOrderSchedule && dataOrderSchedule.length > 0 && (
                    <Text style={styles.showAll}>{'Lihat Semua'}</Text>
                  )}
                </TouchableOpacity>
              </SpaceBeetwen>
              <Gap height={10} />

              {loadingOrderSchedule ? (
                <Loading />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  keyExtractor={item => item.id}
                  data={dataOrderSchedule}
                  renderItem={({item}) => (
                    <ItemOrderSchedule navigation={navigation} data={item} />
                  )}
                  ListEmptyComponent={() => (
                    <EmptyList desc="Belum terdapat jadwal booking." />
                  )}
                />
              )}
            </View>

            <View style={styles.containerOrder}>
              <SpaceBeetwen>
                <Text style={styles.title}>{'History Booking'}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderHistoryPatient')}>
                  {!loadingOrderHistory && dataOrderHistory.length > 0 && (
                    <Text style={styles.showAll}>{'Lihat Semua'}</Text>
                  )}
                </TouchableOpacity>
              </SpaceBeetwen>
              <Gap height={10} />
              {loadingOrderHistory ? (
                <Loading />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  keyExtractor={item => item.id}
                  data={dataOrderHistory}
                  renderItem={({item}) => (
                    <ItemOrderHistory
                      key={item.id}
                      data={item}
                      onPress={() => ToastAlert()}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <EmptyList desc="Belum terdapat history booking." />
                  )}
                />
              )}
            </View>
            <Gap height={50} />
          </ScrollView>

          <View style={styles.containerButton}>
            <Button type={'circle'} onPress={() => setVisibelServices(true)} />
          </View>

          <Modals
            type={'spinner'}
            title={'Kategori Layanan'}
            visible={visibelServices}
            data={dataSevices}
            onDismiss={() => setVisibelServices(false)}
            onSelect={value => onShowService(value)}
          />
        </>
      )}
    </Container>
  );
};

export default HomePatient;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: colors.white,
  },

  imageNotification: {
    width: 24,
    height: 24,
  },

  wrapperAccount: {
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },

  type: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary.regular,
  },

  containerOrder: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  title: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.primary.bold,
  },

  showAll: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.bold,
  },

  containerButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
