import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  getBookingType,
  selectPageByServiceMidwife,
  ToastAlert,
} from '../../../Helpers';
import {ILNullPhoto} from '../../../Images';
import {IcRightArrow} from '../../../Images/icon';
import {moments} from '../../../Libs';
import {colors, fonts} from '../../../Themes';
import {Gap, Notice, Row, SpaceBeetwen} from '../../Atoms';

const ItemOldPatient = ({navigation, data}) => {
  const photo = data.pasien.photo ? {uri: data.pasien.photo} : ILNullPhoto;
  const type = getBookingType(data.bookingable_type);

  const onShowDetails = () => {
    const screen = selectPageByServiceMidwife(data.bookingable_type);

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
          <Notice category={data.request_status.name} />
        </View>
        <Row>
          <Text style={styles.date}>
            {moments(data.bookingable.visit_date).format('DD MMMM YYYY')}
          </Text>
          <Image style={styles.arrow} source={IcRightArrow} />
        </Row>
      </SpaceBeetwen>
    </TouchableOpacity>
  );
};

export default ItemOldPatient;

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
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },

  containerAccount: {
    flex: 1,
    marginLeft: 8,
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
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginRight: 4,
  },

  arrow: {
    width: 14,
    height: 14,
  },
});
