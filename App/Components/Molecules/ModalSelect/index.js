import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Separator} from '../..';
import {colors, fonts} from '../../../Themes';

const ModalSelect = ({visible, data, onPress, onDismiss}) => {
  const RenderItem = ({label, isLast, onPress}) => {
    return (
      <View>
        <Text style={styles.label} onPress={onPress}>
          {label}
        </Text>
        {!isLast && (
          <Separator
            style={styles.separator}
            backgroundColor={colors.primary}
          />
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onDismiss}>
      <TouchableOpacity style={styles.container} onPress={onDismiss}>
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          {data.map((item, index) => {
            return (
              <RenderItem
                key={item.id}
                label={item.name}
                isLast={index == data.length - 1}
                onPress={() => onPress(item.name)}
              />
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalSelect;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: colors.backgroundColorModal,
  },

  content: {
    width: SCREEN_WIDTH - 180,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 4,
  },

  desc: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.regular,
    marginBottom: 20,
    textAlign: 'center',
  },

  containerButton: {
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary.regular,
  },

  separator: {
    marginVertical: 16,
  },
});
