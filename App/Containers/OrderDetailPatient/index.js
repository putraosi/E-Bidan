import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Container, Gap, Header, Separator} from '../../Components';
import {ILPorife} from '../../Images';
import {colors, fonts} from '../../Themes';

const OrderDetailPatient = ({navigation}) => {
  return (
    <Container>
      <Header title={'Detail Pesanan'} onDismiss={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image style={styles.image} source={ILPorife} />
          <Text style={styles.name}>{'Bd. Syantika Apriliani'}</Text>
          <Separator />
          <Gap height={16} />
          <Text style={styles.label}>{'Jenis Layanan: Konsultasi'}</Text>
          <Text style={styles.label}>{'Tanggal: 29 / 09 / 2021'}</Text>
          <Text style={styles.label}>{'Waktu: 10:00 - 14:00 WIB'}</Text>
          <Gap height={16} />
          <Separator />
          <Text style={styles.progress}>{'Proses'}</Text>
        </View>

        <Text style={styles.subTitle}>{'Keterangan'}</Text>
        <Text style={styles.desc}>{'Jadwal untuk Bidan Syantika Apriliani di jam 10.00 - 14.00 wib Telah Penuh, mohon untuk memilih di waktu berbeda'}</Text>
      </ScrollView>
    </Container>
  );
};

export default OrderDetailPatient;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },

  content: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: colors.backgroundColorGreen,
    borderRadius: 8,
    marginTop: 50,
  },

  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: -(100 / 2),
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },

  button: {
    width: 150,
    alignSelf: 'center',
    marginVertical: 16,
  },

  containerButton: {
    paddingHorizontal: 16,
  },

  flex: {
    flex: 1,
  },

  progress: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginVertical: 12,
  },

  subTitle: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.bold,
    marginTop: 16,
  },

  desc: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary.regular,
  },
});
