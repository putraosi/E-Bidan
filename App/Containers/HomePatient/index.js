import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
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
  Gap,
  ItemOrderHistory,
  ItemOrderSchedule,
  Loading,
  Modals,
  SpaceBeetwen,
} from '../../Components';
import {getData, ToastAlert} from '../../Helpers';
import {ILNullPhoto} from '../../Images';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';
const dataOrderHistory = [
  {id: 1, category: 'accepted'},
  {id: 2, category: 'rejected'},
  {id: 3, category: 'accepted'},
  {id: 4, category: 'accepted'},
  {id: 5, category: 'rejected'},
];

const HomePatient = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrderSchedule, setLoadingOrderSchedule] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const [dataOrderSchedule, setDataOrderSchedule] = useState([]);
  const [dataSevices, setDataSevices] = useState(null);
  const [visibelServices, setVisibelServices] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
      setLoadingUser(false);
    });

    getServiceCategory();
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('focused');
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
        showLog: true,
      });

      setDataOrderSchedule(res);
      setLoadingOrderSchedule(false);
    } catch (error) {
      setLoadingOrderSchedule(false);
    }
  };

  const onShowService = select => {
    setVisibelServices(false);

    let screen = 'AddServicesHomecare';
    if (select.name === 'Antenatal (Pemeriksaan Kehamilan)')
      screen = 'AddServicesAntenatal';
    else if (select.name === 'Imunisasi') screen = 'AddServicesImmunization';
    else if (select.name === 'INC') screen = 'AddServicesInc';
    else if (select.name === 'Pelayanan Rujukan')
      screen = 'AddServicesReferral';
    else if (select.name === 'Lainnya') screen = 'AddServicesOther';

    navigation.navigate(screen, {id: select.id, userId: dataUser.id});
  };

  const photo = ILNullPhoto;

  // console.log('cek user', dataUser);
  // console.log('cek booking', dataOrderSchedule);

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
                <Image style={styles.image} source={photo} />
                <View style={styles.wrapperAccount}>
                  <Text style={styles.name}>{dataUser.name}</Text>
                  <Text style={styles.email}>{dataUser.email}</Text>
                </View>
              </TouchableOpacity>
            )}
            <View style={styles.slider}>
              <Text>{'Coming Soon'}</Text>
            </View>

            <View style={styles.containerOrder}>
              <SpaceBeetwen>
                <Text style={styles.title}>{'Jadwal Booking'}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderSchedule')}>
                  {!loadingOrderSchedule && (
                    <Text style={styles.showAll}>{'Lihat Semua'}</Text>
                  )}
                </TouchableOpacity>
              </SpaceBeetwen>
              <Gap height={10} />

              {loadingOrderSchedule ? (
                <Loading />
              ) : (
                dataOrderSchedule.map(item => (
                  <ItemOrderSchedule
                    key={item.id}
                    data={item}
                    onPress={() => ToastAlert()}
                  />
                ))
              )}
            </View>

            <View style={styles.containerOrder}>
              <SpaceBeetwen>
                <Text style={styles.title}>{'History Booking'}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderHistoryPatient')}>
                  <Text style={styles.showAll}>{'Lihat Semua'}</Text>
                </TouchableOpacity>
              </SpaceBeetwen>
              <Gap height={10} />

              {dataOrderHistory.map(item => (
                <ItemOrderHistory
                  key={item.id}
                  data={item}
                  onPress={() => navigation.navigate('OrderDetailPatient')}
                />
              ))}
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
    padding: 16,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: colors.white,
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

  email: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  slider: {
    width: '100%',
    height: 176,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
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
