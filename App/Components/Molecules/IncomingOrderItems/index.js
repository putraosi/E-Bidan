import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getBookingType, selectPageByService, ToastAlert} from '../../../Helpers';
import {IcRightArrow, ILNullPhoto} from '../../../Images';
import { moments } from '../../../Libs';
import {colors, fonts} from '../../../Themes';
import {Gap, Row, SpaceBeetwen} from '../../Atoms';

const IncomingOrderItems = ({navigation, data}) => {

  const photo = data.pasien.photo ? {uri: data.pasien.photo} : ILNullPhoto;
  const type = getBookingType(data.bookingable_type);

  const onShowDetails = () => {
    return ToastAlert();
    const screen = selectPageByService(data.bookingable_type);

    if (!screen) return ToastAlert();

    navigation.navigate(screen, {
      data: data,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onShowDetails}>
      <SpaceBeetwen>
        <Image style={styles.image} source={photo} />
        <View style={styles.containerAccount}>
          <Text style={styles.name}>{data.pasien.name}</Text>
          <Text style={styles.type}>{type}</Text>
          <Gap height={2} />
        </View>
        <Row>
          <Text style={styles.date}>{moments(data.bookingable.visit_date).format("DD MMMM YYYY")}</Text>
          <Image style={styles.arrow} source={IcRightArrow} />
        </Row>
      </SpaceBeetwen>
    </TouchableOpacity>
  );
};

export default IncomingOrderItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 6,
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
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  containerAccount: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
  },

  type: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  date: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginRight: 4,
  },

  arrow: {
    width: 14,
    height: 14,
  },
});
