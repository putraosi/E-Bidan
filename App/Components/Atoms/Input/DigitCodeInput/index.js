import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useForm} from '../../../../Helpers';
import {colors, fonts} from '../../../../Themes';

const DigitCodeInput = ({onChangeText}) => {
  const refInput2 = useRef();
  const refInput3 = useRef();
  const refInput4 = useRef();
  const [form, setForm] = useForm({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  const onChangeText1 = _value => {
    if (_value) refInput2.current.focus();
    setForm('input1', _value);
    onChangeText(_value + form.input2 + form.input3 + form.input4);
  };

  const onChangeText2 = _value => {
    if (_value) refInput3.current.focus();
    setForm('input2', _value);
    onChangeText(form.input1 + _value + form.input3 + form.input4);
  };

  const onChangeText3 = _value => {
    if (_value) refInput4.current.focus();
    setForm('input3', _value);
    onChangeText(form.input1 + form.input2 + _value + form.input4);
  };

  const onChangeText4 = _value => {
    setForm('input4', _value);
    onChangeText(form.input1 + form.input2 + form.input3 + _value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={form.input1}
        onChangeText={onChangeText1}
        numberOfLines={1}
        maxLength={1}
        keyboardType={'numeric'}
        autoFocus
        returnKeyType={'next'}
        onSubmitEditing={() => {
          refInput2.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        ref={refInput2}
        style={styles.input}
        value={form.input2}
        onChangeText={onChangeText2}
        numberOfLines={1}
        keyboardType={'numeric'}
        maxLength={1}
      />
      <TextInput
        ref={refInput3}
        style={styles.input}
        value={form.input3}
        onChangeText={onChangeText3}
        numberOfLines={1}
        keyboardType={'numeric'}
        maxLength={1}
      />
      <TextInput
        ref={refInput4}
        style={styles.input}
        value={form.input4}
        onChangeText={onChangeText4}
        numberOfLines={1}
        keyboardType={'numeric'}
        maxLength={1}
      />
    </View>
  );
};

export default DigitCodeInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: 45,
    height: 50,
    textAlign: 'center',
    color: colors.text.primary,
    fontSize: 30,
    fontFamily: fonts.primary.regular,
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 0,
    margin: 0,
    marginHorizontal: 8,
  },
});
