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
  Container,
  Gap,
  IncomingOrderItems,
  ItemOldPatient,
  Loading,
  Row,
} from '../../Components';
import {getData, ToastAlert} from '../../Helpers';
import {IcAdd, ILNullPhoto} from '../../Images';
import {colors, fonts} from '../../Themes';

const HomeMidwife = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState(null);

  const dataIncomingOrder = [
    {id: 1, category: 'pending'},
    {id: 2, category: 'progress'},
  ];

  const dataOldPatient = [
    {id: 1, category: 'pending'},
    {id: 2, category: 'progress'},
  ];

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Container>
        <Loading />
      </Container>
    );

  const photo = dataUser.bidan.photo
    ? {url: dataUser.bidan.photo}
    : ILNullPhoto;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.containerHeader}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('DetailsProfileMidwife', {data: dataUser})
          }>
          <Image style={styles.photo} source={photo} />
          <Text style={styles.name}>{dataUser.bidan.name}</Text>
          <Text style={styles.type}>{dataUser.roles.name}</Text>
        </TouchableOpacity>
        <Gap height={16} />
        <TouchableOpacity style={styles.wrapper} onPress={() => ToastAlert()}>
          <Row>
            <View style={styles.wrapperAdd}>
              <Image style={styles.iconAdd} source={IcAdd} />
            </View>
            <Text style={styles.add}>{'Tambah Pasien Baru'} </Text>
          </Row>
        </TouchableOpacity>

        <Text style={styles.subTitle}>{'Pesanan Masuk'} </Text>

        <View style={styles.wrapper}>
          {dataIncomingOrder.map(item => (
            <IncomingOrderItems
              key={item.id}
              data={item}
              onPress={() => navigation.navigate('IncomingOrderDetails')}
            />
          ))}
          <Text
            style={styles.next}
            onPress={() => navigation.navigate('IncomingOrder')}>
            {'Selengkapnya'}{' '}
          </Text>
        </View>

        <Text style={styles.subTitle}>{'Pasien Lama'} </Text>

        <View style={styles.wrapper}>
          {dataOldPatient.map(item => (
            <ItemOldPatient
              key={item.id}
              data={item}
              onPress={() => ToastAlert()}
            />
          ))}
          <Text style={styles.next} onPress={() => ToastAlert()}>
            {'Selengkapnya'}{' '}
          </Text>
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
