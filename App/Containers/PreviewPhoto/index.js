import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {IcEditCircle} from '../../Images';
import {colors} from '../../Themes';

const PreviewPhoto = ({navigation, route}) => {
  const photo = route.params.image;
  return (
    <View style={styles.container}>
      <Header onDismiss={() => navigation.goBack()} />
      <View style={styles.content}>
        <View>
          <Image style={styles.image} source={photo} />
          <TouchableOpacity
            style={styles.containerEdit}
            onPress={() => ToastAlert()}>
            {/* <Image style={styles.edit} source={IcEditCircle} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PreviewPhoto;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH - 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },

  containerEdit: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  edit: {
    width: 30,
    height: 30,
  },
});
