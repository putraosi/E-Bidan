import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../Themes';

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

  containerTreatment: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  radioButton: {
    flex: 1,
    marginBottom: 4,
  },

  desc: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
  },
});
