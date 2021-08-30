import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Gap, Input} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {ILHeader} from '../../Images';
import {Colors, Fonts} from '../../Themes';

const Confirmation = () => {
  const [codeConfirmation, setCodeConfirmation] = useState('');

  return (
    <Container>
      <Image style={styles.image} source={ILHeader} />
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
        <Button type={'blue'} label={'SUBMIT'} onPress={() => ToastAlert()} />
      </View>
    </Container>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },

  wrapper: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    color: Colors.primary,
    fontFamily: Fonts.primary.regular,
    marginBottom: 20,
  },

  desc: {
    fontSize: 12,
    color: Colors.text.primary,
    fontFamily: Fonts.primary.regular,
    marginBottom: 12,
  },
});
