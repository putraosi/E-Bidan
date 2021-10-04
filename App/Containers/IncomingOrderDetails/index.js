import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Separator,
  SpaceBeetwen,
} from '../../Components';
import { ToastAlert } from '../../Helpers';
import {ILPorife} from '../../Images';
import {colors, fonts} from '../../Themes';

const IncomingOrderDetails = ({navigation}) => {
  return (
    <Container>
      <Header
        title={'Detail Pesanan Masuk'}
        onDismiss={() => navigation.goBack()}
      />
      <ScrollView>
        <Gap height={66} />
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
          <View style={styles.wrapper}>
            <Text style={styles.subTitle}>{'Keterangan'}</Text>
            <Text style={styles.desc}>
              {
                'Jadwal untuk Bidan Syantika Apriliani di jam 10.00 - 14.00 wib Telah Penuh, mohon untuk memilih di waktu berbeda'
              }
            </Text>
            <SpaceBeetwen style={styles.containerButton}>
              <Button
                styleButton={styles.flex}
                type={'white'}
                label={'Terima'}
                onPress={() => ToastAlert()}
              />
              <Gap width={16} />
              <Button
                styleButton={styles.flex}
                type={'red'}
                label={'Tolak'}
                onPress={() => ToastAlert()}
              />
            </SpaceBeetwen>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default IncomingOrderDetails;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginHorizontal: 16,
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

  containerButton: {},

  flex: {
    flex: 1,
  },

  wrapper: {
    padding: 12,
  },

  subTitle: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.bold,
  },

  desc: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginTop: 4,
    marginBottom: 16,
  },
});
