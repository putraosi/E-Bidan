import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Modals,
  Row,
  SpaceBeetwen,
} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {IcLogout, ILPorife} from '../../Images';
import {colors, fonts} from '../../Themes';

const DetailsProfilePatient = ({navigation}) => {
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [newPassword, setNewPassword] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          onDismiss={() => navigation.goBack()}
          iconRight={IcLogout}
          onPress={() => setVisibleLogout(true)}
        />
        <View style={styles.containerHeader}>
          <Image style={styles.image} source={ILPorife} />
          <Text style={styles.name}>{'Anya Geraldin'}</Text>
          <Text style={styles.email}>{'anyagrl@gmail.com'}</Text>
        </View>

        <View style={styles.content}>
          <Row>
            <Input
              style={styles.input}
              label={'Nama Depan'}
              value={'Anya'}
              editable={false}
            />
            <Gap width={16} />
            <Input
              style={styles.input}
              label={'Nama Belakang'}
              value={'Geraldin'}
              editable={false}
            />
          </Row>
          <Gap height={12} />
          <Input label={'Email'} value={'anyagrl@gmail.com'} editable={false} />
          <Gap height={12} />
          <Input
            label={'No. Hanphone'}
            value={'+62 899 8899 5623'}
            editable={false}
          />
          <Gap height={12} />
          <Input
            label={'Kata Sandi'}
            type={'password'}
            value={'12345678'}
            secureTextEntry={secureTextEntry1}
            editable={false}
            onTogglePassword={() => setSecureTextEntry1(!secureTextEntry1)}
          />
          <Gap height={12} />
          <Input
            label={'Ubah Kata Sandi'}
            type={'password'}
            value={newPassword}
            onChangeText={value => setNewPassword(value)}
            secureTextEntry={secureTextEntry2}
            onTogglePassword={() => setSecureTextEntry2(!secureTextEntry2)}
          />
          <Gap height={20} />
          <SpaceBeetwen>
            <Button
              styleButton={styles.button}
              type={'blue'}
              label={'Ubah'}
              onPress={() => ToastAlert()}
            />
            <Gap width={16} />
            <Button
              styleButton={styles.button}
              label={'Batal'}
              onPress={() => navigation.goBack()}
            />
          </SpaceBeetwen>
        </View>
      </ScrollView>

      <Modals
        visible={visibleLogout}
        desc={'Anda yakin ingin\nkeluar aplikasi ?'}
        onDismiss={() => setVisibleLogout(false)}
        labelPress={'Keluar'}
        labelCancel={'Batal'}
        onPress={() => ToastAlert()}
        onCancel={() => setVisibleLogout(false)}
      />
    </Container>
  );
};

export default DetailsProfilePatient;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: 16,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
  },

  email: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  content: {
    padding: 16,
  },

  input: {
    flex: 1,
  },

  button: {
    flex: 1,
  },
});
