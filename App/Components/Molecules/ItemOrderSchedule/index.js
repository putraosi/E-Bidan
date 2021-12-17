import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gap, Notice, Row, SpaceBeetwen } from '../../../Components';
import {
  getBookingType,
  selectPageByService,
  ToastAlert
} from '../../../Helpers';
import { ILNullPhoto } from '../../../Images';
import { IcRightArrow } from '../../../Images/icon';
import { moments } from '../../../Libs';
import { colors, fonts } from '../../../Themes';

const ItemOrderSchedule = ({navigation, data}) => {
  const type = getBookingType(data.bookingable_type);

  const onShowDetails = () => {
    const screen = selectPageByService(data.bookingable_type);

    if (!screen) return ToastAlert();

    navigation.navigate(screen, {
      data: data,
    });
  };

  console.log('cek data', data);

  const photo = data.bidan.photo ? {uri: data.bidan.photo} : ILNullPhoto;

  return (
    <TouchableOpacity style={styles.container} onPress={onShowDetails}>
      <SpaceBeetwen>
        <Image style={styles.image} source={photo} />
        <View style={styles.containerAccount}>
          <Text style={styles.name}>{data.bidan.name}</Text>
          <Text style={styles.type}>{type}</Text>
          <Gap height={2} />
          <Notice category={data.request_status.name} />
        </View>
        <Row>
          <View style={styles.wrapperDateTime}>
            <Text style={styles.date}>
              {moments(data.booking_date).format('DD MMM YYYY')}
            </Text>
          </View>
          <Image style={styles.arrow} source={IcRightArrow} />
        </Row>
      </SpaceBeetwen>
    </TouchableOpacity>
  );
};

export default ItemOrderSchedule;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12,
    marginTop: 2,
    marginHorizontal: 2,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  containerAccount: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  type: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  wrapperDateTime: {
    alignItems: 'center',
    marginRight: 8,
  },

  date: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },

  time: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },

  arrow: {
    width: 14,
    height: 14,
  },
});
