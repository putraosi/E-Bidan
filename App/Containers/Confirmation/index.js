import React, {useState} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Gap, Input} from '../../Components';
import {ILHeader, ILLogo} from '../../Images';
import {colors, fonts} from '../../Themes';

const Confirmation = ({navigation}) => {
  const [codeConfirmation, setCodeConfirmation] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
          style={styles.wrapperImage}
          source={ILHeader}
          resizeMode={'stretch'}>
          <Image style={styles.image} source={ILLogo} />
        </ImageBackground>
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
            onPress={() => navigation.replace('SignIn')}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  wrapperImage: {
    width: '100%',
    height: 120,
  },

  image: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 16,
    right: 16,
  },

  wrapper: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
  },

  desc: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    marginBottom: 12,
  },
});
