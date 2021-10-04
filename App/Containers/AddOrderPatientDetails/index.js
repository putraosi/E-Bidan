import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  CenterView,
  Container,
  Gap,
  Header,
  Separator,
  SpaceBeetwen,
} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {ILPorife} from '../../Images';
import {colors, fonts} from '../../Themes';

const AddOrderPatientDetails = ({navigation}) => {
  return (
    <Container>
      <Header onDismiss={() => navigation.goBack()} />
      <CenterView>
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
          <Button
            styleButton={styles.button}
            type={'white'}
            label={'Proses'}
            onPress={() => ToastAlert()}
          />
        </View>
        <Gap height={16} />
        <SpaceBeetwen style={styles.containerButton}>
          <Button
            styleButton={styles.flex}
            type={'white'}
            label={'Ok'}
            onPress={() => ToastAlert()}
          />
          <Gap width={16} />
          <Button
            styleButton={styles.flex}
            label={'Edit'}
            onPress={() => ToastAlert()}
          />
        </SpaceBeetwen>
      </CenterView>
    </Container>
  );
};

export default AddOrderPatientDetails;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: colors.backgroundColorGreen,
    borderRadius: 8,
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
});
