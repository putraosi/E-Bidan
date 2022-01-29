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
    marginTop: 12,
  },

  containerTreatment: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  radioButton: {
    flex: 1,
    marginBottom: 4,
  },

  input: {
    marginTop: 12,
  },

  photo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },

  containerPhoto: {
    width: 60,
    height: 60,
    borderColor: colors.primary,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  change: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    marginLeft: 8
  },

  camera: {
    width: 24,
    height: 24,
  },

  desc: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
  },
});
