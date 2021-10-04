import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcRightArrow} from '../../../Images/icon';
import {ILPorife} from '../../../Images/illustration';
import {colors, fonts} from '../../../Themes';
import {Gap, Notice, Row, SpaceBeetwen} from '../../Atoms';

const ItemOrderSchedule = ({data, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SpaceBeetwen>
        <Image style={styles.image} source={ILPorife} />
        <View style={styles.containerAccount}>
          <Text style={styles.name}>{'Bd. Syantika Apriliani'}</Text>
          <Text style={styles.type}>{'Imunisasi'}</Text>
          <Gap height={2} />
          <Notice category={data.category} />
        </View>
        <Row>
          <View style={styles.wrapperDateTime}>
            <Text style={styles.date}>{'30 Agustus 2021'}</Text>
            <Text style={styles.time}>{'10.00 - 13.00'}</Text>
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
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
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

  wrapperDateTime: {
    alignItems: 'center',
    marginRight: 8,
  },

  date: {
    fontSize: 12,
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
