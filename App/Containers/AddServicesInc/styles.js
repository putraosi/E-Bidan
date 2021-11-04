import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../Themes';

export default StyleSheet.create({
  flex: {flex: 1},

  content: {
    backgroundColor: colors.white,
    padding: 16,
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
  },

  radioTypeChildbirth:{
    flex: 1,
    marginBottom: 4
  },

  containerCompanionMidwife:{
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});
