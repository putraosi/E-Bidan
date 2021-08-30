import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../Themes';

const Input = ({
  style,
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
}) => {
  let paddingRight = 16;
  let paddingLeft = 16;

  if (iconRight) paddingRight = 40;
  if (iconLeft) paddingLeft = 40;

  const Div = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Div onPress={onPress}>
        <TextInput
          style={styles.input(paddingRight, paddingLeft)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          numberOfLines={1}
          keyboardType={keyboardType}
          editable={editable}
        />
        {iconRight && <Image style={styles.iconRight} source={iconRight} />}
        {iconLeft && <Image style={styles.iconLeft} source={iconLeft} />}
      </Div>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
  },

  label: {
    fontSize: 12,
    color: Colors.text.primary,
    fontFamily: Fonts.primary.regular,
    marginBottom: 6,
  },

  input: (paddingRight, paddingLeft) => ({
    backgroundColor: Colors.button.backgroundColor,
    paddingVertical: 4,
    borderRadius: 20,
    paddingRight,
    paddingLeft,
    fontSize: 12,
    color: Colors.text.primary,
    fontFamily: Fonts.primary.regular,
  }),

  iconRight: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    top: 6,
  },

  iconLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 10,
    top: 6,
  },
});
