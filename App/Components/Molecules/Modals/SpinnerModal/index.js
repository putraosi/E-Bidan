import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ItemSample} from '../..';
import {colors, fonts} from '../../../../Themes';

const SpinnerModal = ({visible, title, data, onDismiss, onPress, onSelect}) => {
  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onDismiss}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onDismiss}>
        <TouchableOpacity
          style={styles.wrapper}
          activeOpacity={1}
          onPress={() => null}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
              <ItemSample
                key={item.id}
                data={item}
                value={item.name}
                isLast={index == data.length - 1}
                onPress={onPress}
                onSelect={onSelect}
              />
            ))}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SpinnerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorModal,
  },

  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    maxHeight: 200,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
});
