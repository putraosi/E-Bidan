import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Input,
  Modals,
  SpaceBeetwen,
  Spinner,
} from '../../Components';
import {useForm} from '../../Helpers';
import {ILMidwife} from '../../Images';
import {moments} from '../../Libs';
import {colors, fonts} from '../../Themes';

const AddOrderPatient = ({navigation}) => {
  const [form, setForm] = useForm({
    service_type: 'Pilih',
    midwife: 'Pilih',
    date: new Date(),
    time: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [visibleServiceType, setVisibleServiceType] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const dataServiceType = [
    {id: 1, type: 'Konsultasi'},
    {id: 2, type: 'Konsultasi'},
    {id: 3, type: 'Konsultasi'},
    {id: 4, type: 'Konsultasi'},
    {id: 5, type: 'Konsultasi'},
    {id: 6, type: 'Konsultasi'},
    {id: 7, type: 'Konsultasi'},
    {id: 8, type: 'Konsultasi'},
  ];
  const dataMidwife = [
    {id: 1, type: 'Bd. Syantika Apriliani'},
    {id: 2, type: 'Bd. Syantika Apriliani'},
    {id: 3, type: 'Bd. Syantika Apriliani'},
    {id: 4, type: 'Bd. Syantika Apriliani'},
    {id: 5, type: 'Bd. Syantika Apriliani'},
    {id: 6, type: 'Bd. Syantika Apriliani'},
    {id: 7, type: 'Bd. Syantika Apriliani'},
    {id: 8, type: 'Bd. Syantika Apriliani'},
  ];
  return (
    <Container>
      <Image style={styles.image} source={ILMidwife} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={200}/>
        <View style={styles.content}>
        <Text style={styles.title}>{'Pasien Baru'}</Text>
        <Spinner
          label={'Jenis Layanan'}
          value={form.service_type}
          onPress={() => setVisibleServiceType(true)}
        />
        <Gap height={12} />
        <Spinner
          label={'Bidan'}
          value={form.midwife}
          onPress={() => setVisibleMidwife(true)}
        />
        <Gap height={12} />
        <Input
          type={'white'}
          label={'Tanggal'}
          value={moments(form.date).format('DD MMMM YYYY')}
          editable={false}
          onPress={() => setShowDatePicker(true)}
        />
        <Gap height={12} />
        <Input
          type={'white'}
          label={'Waktu'}
          value={moments(form.time).format('HH:mm:ss')}
          editable={false}
          onPress={() => setShowTimePicker(true)}
        />
        <Gap height={20} />
        <SpaceBeetwen>
          <Button
            styleButton={styles.flex}
            label={'Simpan'}
            onPress={() => setVisibleInfo(true)}
          />
          <Gap width={16} />
          <Button
            type={'white'}
            styleButton={styles.flex}
            label={'Batal'}
            onPress={() => navigation.goBack()}
          />
        </SpaceBeetwen>

        </View>
      </ScrollView>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={form.date}
          mode={'date'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setForm('date', selectedDate);
          }}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={form.time}
          mode={'time'}
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) setForm('time', selectedDate);
          }}
        />
      )}

      <Modals
        type={'spinner'}
        title={'Jenis Layanan'}
        visible={visibleServiceType}
        data={dataServiceType}
        onDismiss={() => setVisibleServiceType(false)}
        onPress={value => {
          setVisibleServiceType(false);
          setForm('service_type', value);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Bidan'}
        visible={visibleMidwife}
        data={dataMidwife}
        onDismiss={() => setVisibleMidwife(false)}
        onPress={value => {
          setVisibleMidwife(false);
          setForm('midwife', value);
        }}
      />

      <Modals
        visible={visibleInfo}
        desc={'Selamat anda telah\nberhasil mendaftar\ndi layanan kami'}
        labelPress={'Oke'}
        onDismiss={() => setVisibleInfo(false)}
        onPress={() => navigation.replace('AddOrderPatientDetails')}
      />
    </Container>
  );
};

export default AddOrderPatient;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  image: {
    width: SCREEN_WIDTH,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  content: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.primary,
    padding: 16,
  },

  title: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    marginBottom: 16,
  },
});
