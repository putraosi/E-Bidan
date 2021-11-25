import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcHidePassword, IcShowPassword} from '../../../Images';
import {colors, fonts} from '../../../Themes';
import DigitCodeInput from './DigitCodeInput';

const Input = ({
  style,
  type,
  label,
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
  keyboardType,
  iconRight,
  iconLeft,
  editable = true,
  multiline,
  disable,
  onPress,
  onTogglePassword,
}) => {
  let paddingRight = 10;
  let paddingLeft = 10;

  if (iconRight) paddingRight = 34;
  if (iconLeft) paddingLeft = 34;

  let colorLabel = colors.black;
  let backgroundColor = colors.white;
  // let backgroundColor = colors.input.backgroundColor.primary;

  if (type) {
    if (type.includes('digit-code'))
      return <DigitCodeInput onChangeText={onChangeText} />;
    if (type.includes('white')) {
      colorLabel = colors.white;
      backgroundColor = colors.input.backgroundColor.secondary;
    }
  }

  const showPassword = type && type.includes('password');
  const shoeLabel = label ? true : false;
  const Div = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, style]}>
      {shoeLabel && <Text style={styles.label(colorLabel)}>{label}</Text>}
      <Div style={styles.wrapper(backgroundColor)} onPress={onPress}>
        {iconLeft && (
          <Image
            style={styles.iconLeft}
            source={iconLeft}
            resizeMode={'stretch'}
          />
        )}
        <TextInput
          style={styles.input(paddingRight, paddingLeft)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          numberOfLines={1}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
        />
        {iconRight && (
          <Image
            style={styles.iconRight}
            source={iconRight}
            resizeMode={'stretch'}
          />
        )}
        {showPassword && (
          <TouchableOpacity
            style={styles.containerPassword}
            onPress={onTogglePassword}>
            <Image
              style={styles.password}
              source={!secureTextEntry ? IcHidePassword : IcShowPassword}
            />
          </TouchableOpacity>
        )}
        {disable && <View style={styles.disable} />}
      </Div>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
  },

  label: color => ({
    fontSize: 12,
    color,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
  }),

  wrapper: backgroundColor => ({
    backgroundColor,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor.primary,
  }),

  input: (paddingRight, paddingLeft) => ({
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  }),

  iconRight: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  iconLeft: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },

  containerPassword: {},

  password: {
    width: 16,
    height: 16,
    marginRight: 8,
  },

  disable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.disable,
  },
});
