import React from 'react';
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
  SpaceBeetwen,
} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {ILPorife} from '../../Images/illustration';
import {colors, fonts} from '../../Themes';

const dataOrderSchedule = [
  {id: 1, category: 'pending'},
  {id: 2, category: 'progress'},
  {id: 3, category: 'pending'},
];
const dataOrderHistory = [
  {id: 1, category: 'accepted'},
  {id: 2, category: 'rejected'},
  {id: 3, category: 'accepted'},
  {id: 4, category: 'accepted'},
  {id: 5, category: 'rejected'},
];

const Home = ({navigation}) => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.containerHeader}
          onPress={() => navigation.navigate('DetailsProfile')}>
          <Image style={styles.image} source={ILPorife} />
          <View style={styles.wrapperAccount}>
            <Text style={styles.name}>{'Anya Geraldin'}</Text>
            <Text style={styles.email}>{'anyagrl@gmail.com'}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.containerOrder}>
          <SpaceBeetwen>
            <Text style={styles.title}>{'Jadwal Booking'}</Text>
            <TouchableOpacity onPress={() => ToastAlert()}>
              <Text style={styles.showAll}>{'Lihat Semua'}</Text>
            </TouchableOpacity>
          </SpaceBeetwen>
          <Gap height={10} />

          {dataOrderSchedule.map(item => (
            <ItemOrderSchedule key={item.id} data={item} />
          ))}
        </View>

        <View style={styles.containerOrder}>
          <SpaceBeetwen>
            <Text style={styles.title}>{'History Booking'}</Text>
            <TouchableOpacity onPress={() => ToastAlert()}>
              <Text style={styles.showAll}>{'Lihat Semua'}</Text>
            </TouchableOpacity>
          </SpaceBeetwen>
          <Gap height={10} />

          {dataOrderHistory.map(item => (
            <ItemOrderHistory key={item.id} data={item} />
          ))}
        </View>
        <Gap height={50} />
      </ScrollView>

      <View style={styles.containerButton}>
        <Button type={'circle'} onPress={() => ToastAlert()} />
      </View>
    </Container>
  );
};

export default Home;

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

  wrapperAccount: {
    marginLeft: 8,
  },

  name: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
  },

  email: {
    fontSize: 10,
    color: colors.yellow,
    fontFamily: fonts.primary.regular,
  },

  containerOrder: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  title: {
    fontSize: 15,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  showAll: {
    fontSize: 7,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  containerButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
