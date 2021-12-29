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
import {ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const HomePatient = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [loadingHistoryBooking, setLoadingHistoryBooking] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const [dataBooking, setDataBooking] = useState([]);
  const [dataHistoryBooking, setDataHistoryBooking] = useState([]);
  const [dataSevices, setDataSevices] = useState(null);
  const [visibelServices, setVisibelServices] = useState(false);
  const [visibleCompletenessData, setVisibleCompletenessData] = useState(false);
  const [isCompletenessData, setIsCompletenessData] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getServiceCategory();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setDataUser(res);
        checkUser(res);
        setLoadingUser(false);
      });
      getBooking();
      getHistoryBooking();
    }
  }, [isFocused]);

  const checkUser = async user => {
    try {
      await Api.get({
        url: `self/check-complete-data/${user.id}`,
      });

      setIsCompletenessData(true);
    } catch (error) {
      setIsCompletenessData(false);
      setVisibleCompletenessData(true);
    }
  };

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

      setDataBooking(res);
      setLoadingBooking(false);
    } catch (error) {
      setLoadingBooking(false);
    }
  };

  const getHistoryBooking = async () => {
    try {
      const res = await Api.get({
        url: 'admin/bookings/history',
        params: {
          type: 'pasien',
          per_page: 3,
        },
      });

      setDataHistoryBooking(res);
      setLoadingHistoryBooking(false);
    } catch (error) {
      setLoadingHistoryBooking(false);
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

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('NotificationPatient')}>
              <Image style={styles.imageNotification} source={IcNotification} />
            </TouchableOpacity> */}
          </TouchableOpacity>
        )}

        <View style={styles.containerOrder}>
          <SpaceBeetwen>
            <Text style={styles.title}>{'Jadwal Pesanan'}</Text>
            {!loadingBooking && dataBooking.length > 0 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderSchedule')}>
                <Text style={styles.showAll}>{'Lihat Semua'}</Text>
              </TouchableOpacity>
            )}
          </SpaceBeetwen>
          <Gap height={10} />

          {loadingBooking ? (
            <Loading />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              data={dataBooking}
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
            <Text style={styles.title}>{'Riwayat Pesanan'}</Text>
            {!loadingHistoryBooking && dataHistoryBooking.length > 0 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderHistoryPatient')}>
                <Text style={styles.showAll}>{'Lihat Semua'}</Text>
              </TouchableOpacity>
            )}
          </SpaceBeetwen>
          <Gap height={10} />
          {loadingHistoryBooking ? (
            <Loading />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              data={dataHistoryBooking}
              renderItem={({item}) => (
                <ItemOrderHistory navigation={navigation} data={item} />
              )}
              ListEmptyComponent={() => (
                <EmptyList desc="Belum terdapat history booking." />
              )}
            />
          )}
        </View>
        <Gap height={50} />
      </ScrollView>

      {!loading && (
        <View style={styles.containerButton}>
          <Button
            type={'circle'}
            onPress={() => {
              if (isCompletenessData) setVisibelServices(true);
              else setVisibleCompletenessData(true);
            }}
          />
        </View>
      )}

      <Modals
        type={'spinner'}
        title={'Kategori Layanan'}
        visible={visibelServices}
        data={dataSevices}
        onDismiss={() => setVisibelServices(false)}
        onSelect={value => onShowService(value)}
      />

      <Modals
        visible={visibleCompletenessData}
        title={'Kelengkapan Data'}
        desc={
          'Silahkan lengkapi data pribadi Anda terlebih dahulu untuk bisa melanjutkan fitur kami'
        }
        labelPress={'Lengkapi'}
        onDismiss={() => setVisibleCompletenessData(false)}
        onPress={() => {
          setVisibleCompletenessData(false);
          navigation.navigate('DetailsProfilePatient', {data: dataUser});
        }}
      />
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
