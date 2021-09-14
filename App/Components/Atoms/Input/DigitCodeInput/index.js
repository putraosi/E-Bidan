import React, {useRef} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {Gap, Row} from '../..';
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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal>
      <Row>
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
        <Gap width={22} />
        <TextInput
          ref={refInput2}
          style={styles.input}
          value={form.input2}
          onChangeText={onChangeText2}
          numberOfLines={1}
          keyboardType={'numeric'}
          maxLength={1}
        />
        <Gap width={22} />
        <TextInput
          ref={refInput3}
          style={styles.input}
          value={form.input3}
          onChangeText={onChangeText3}
          numberOfLines={1}
          keyboardType={'numeric'}
          maxLength={1}
        />
        <Gap width={22} />
        <TextInput
          ref={refInput4}
          style={styles.input}
          value={form.input4}
          onChangeText={onChangeText4}
          numberOfLines={1}
          keyboardType={'numeric'}
          maxLength={1}
        />
      </Row>
    </ScrollView>
  );
};

export default DigitCodeInput;

const styles = StyleSheet.create({
  input: {
    width: 74,
    height: 88,
    textAlign: 'center',
    color: colors.text.primary,
    fontSize: 50,
    fontFamily: fonts.primary.regular,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
});
