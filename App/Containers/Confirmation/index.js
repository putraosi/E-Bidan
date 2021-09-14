import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Gap, Input} from '../../Components';
import { ToastAlert } from '../../Helpers';
import {ILHeader} from '../../Images';
import {colors, fonts} from '../../Themes';

const Confirmation = ({navigation}) => {
  const [codeConfirmation, setCodeConfirmation] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={ILHeader} resizeMode={'stretch'} />
        <View style={styles.wrapper}>
          <Text style={styles.title}>{'Konfirmasi'}</Text>
          <Text style={styles.desc}>
            {
              'Kami telah mengirimkan kode ferifikasi ke alamat email anda, mohon untuk memasukan kedalam kolom di bawah ini'
            }
          </Text>
          <Input
            label={'Kode Verifikasi'}
            value={codeConfirmation}
            onChangeText={value => setCodeConfirmation(value)}
            keyboardType={'numeric'}
          />
          <Gap height={16} />
          <Button
            label={'Submit'}
            onPress={() => ToastAlert()}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
  },

  wrapper: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 22,
  },

  desc: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
  },
});
