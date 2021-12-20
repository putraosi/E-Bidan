import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Gap, Input, SpaceBeetwen} from '../..';
import {colors, fonts} from '../../../Themes';
import DigitCodeModal from './DigitCodeModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';
import SpinnerModal from './SpinnerModal';

const Modals = ({
  type,
  visible,
  title,
  isReason,
  labelPress,
  labelCancel,
  desc,
  onDismiss,
  onPress,
  onCancel,
  onSelect,
  data,
}) => {
  const [reason, setReason] = useState('');

  if (type == 'forgot-password')
    return (
      <ForgotPasswordModal
        visible={visible}
        onDismiss={onDismiss}
        onPress={onPress}
      />
    );

  if (type == 'digit-code')
    return <DigitCodeModal visible={visible} onPress={onPress} />;

  if (type == 'reset-password')
    return (
      <ResetPasswordModal
        visible={visible}
        onDismiss={onDismiss}
        onPress={onPress}
      />
    );
  if (type == 'spinner')
    return (
      <SpinnerModal
        visible={visible}
        data={data}
        title={title}
        onDismiss={onDismiss}
        onPress={onPress}
        onSelect={onSelect}
      />
    );

  const showTitle = title ? true : false;
  const showDesc = desc ? true : false;
  const showReason = isReason ? true : false;
  const showButtonPress = labelPress ? true : false;
  const showButtonCancel = labelCancel ? true : false;

  const Div = onDismiss ? TouchableOpacity : View;

  return (
    <Modal
      animationType={'fade'}
      visible={visible}
      onRequestClose={onDismiss}
      transparent={true}>
      <Div style={styles.container} onPress={onDismiss}>
        <TouchableOpacity
          style={styles.wrapper}
          activeOpacity={1}
          onPress={() => null}>
          {showTitle && <Text style={styles.title}>{title}</Text>}
          {showDesc && <Text style={styles.desc}>{desc}</Text>}
          {showReason && (
            <Input
              style={styles.input}
              value={reason}
              multiline={true}
              onChangeText={value => setReason(value)}
            />
          )}
          <Gap height={20} />
          <SpaceBeetwen style={styles.wrapperButton}>
            {showButtonPress && (
              <Button
                type={'modal'}
                label={labelPress}
                onPress={() => {
                  onPress(reason);
                  setReason('');
                }}
              />
            )}
            {showButtonPress && showButtonCancel && <Gap width={8} />}
            {showButtonCancel && (
              <Button
                type={'modal-white'}
                label={labelCancel}
                onPress={onCancel}
              />
            )}
          </SpaceBeetwen>
        </TouchableOpacity>
      </Div>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColorModal,
  },

  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 20,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  },

  desc: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },

  wrapperButton: {
    alignSelf: 'center',
  },

  input: {
    marginTop: 10,
  },
});
