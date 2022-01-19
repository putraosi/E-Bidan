import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../Themes';

export default StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: 16,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 1,
    borderColor: colors.white,
  },

  mode: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginTop: 12,
    textAlign: 'center',
  },

  containerEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 34 / 2,
    backgroundColor: colors.primary,
  },

  edit: {
    width: 30,
    height: 30,
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

  version: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    marginTop: 16,
  },

  content: {
    padding: 16,
  },

  input: {
    marginTop: 12,
  },

  button: {
    flex: 1,
  },
});
