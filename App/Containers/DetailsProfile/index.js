import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Gap, Input, SpaceBeetwen} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {ILPorife} from '../../Images';
import {colors, fonts} from '../../Themes';

const DetailsProfile = ({navigation}) => {
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [newPassword, setNewPassword] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <Image style={styles.image} source={ILPorife} />
          <Text style={styles.name}>{'Anya Geraldin'}</Text>
        </View>

        <View style={styles.content}>
          <Input label={'Nama'} value={'Anya Geraldin'} editable={false} />
          <Gap height={18} />
          <Input label={'Email'} value={'anyagrl@gmail.com'} editable={false} />
          <Gap height={18} />
          <Input
            label={'No. Hanphone'}
            value={'+62899 8899 5623'}
            editable={false}
          />
          <Gap height={18} />
          <Input
            label={'Kata Sandi'}
            type={'password'}
            value={'12345678'}
            secureTextEntry={secureTextEntry1}
            editable={false}
            onTogglePassword={() => setSecureTextEntry1(!secureTextEntry1)}
          />
          <Gap height={18} />
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
              label={'UPDATE'}
              onPress={() => ToastAlert()}
            />
            <Gap width={16} />
            <Button
              styleButton={styles.button}
              label={'CANCEL'}
              onPress={() => navigation.goBack()}
            />
          </SpaceBeetwen>
        </View>
      </ScrollView>
    </Container>
  );
};

export default DetailsProfile;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginLeft: 8,
  },

  content: {
    padding: 16,
  },

  button: {
    flex: 1,
  },
});
