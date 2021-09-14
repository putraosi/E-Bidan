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
  onPress,
  onTogglePassword,
}) => {
  let paddingRight = 16;
  let paddingLeft = 16;

  if (iconRight) paddingRight = 40;
  if (iconLeft) paddingLeft = 48;

  let colorLabel = colors.black;
  let backgroundColor = colors.input.backgroundColor;

  if (type) {
    if (type.includes('digit-code'))
      return <DigitCodeInput onChangeText={onChangeText} />;
    if (type.includes('white')) {
      colorLabel = colors.white;
      backgroundColor = colors.white;
    }
  }

  const showPassword = type == 'password';
  const Div = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label(colorLabel)}>{label}</Text>
      <Div onPress={onPress}>
        <TextInput
          style={styles.input(paddingRight, paddingLeft, backgroundColor)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          numberOfLines={1}
          keyboardType={keyboardType}
          editable={editable}
        />
        {iconRight && <Image style={styles.iconRight} source={iconRight} />}
        {iconLeft && <Image style={styles.iconLeft} source={iconLeft} />}
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
    fontSize: 15,
    color,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
  }),

  input: (paddingRight, paddingLeft, backgroundColor) => ({
    backgroundColor,
    paddingVertical: 6,
    borderRadius: 15,
    paddingRight,
    paddingLeft,
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  }),

  iconRight: {
    width: 22,
    height: 26,
    position: 'absolute',
    right: 10,
    top: 7,
  },

  iconLeft: {
    width: 28,
    height: 26,
    position: 'absolute',
    left: 10,
    top: 7,
  },

  containerPassword: {
    position: 'absolute',
    right: 16,
    top: 10,
  },

  password: {
    width: 16,
    height: 16,
  },
});
