import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  RadioButton,
} from '../../Components';
import {ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import styles from './styles';

const AddServicesOther = ({navigation}) => {
  const [form, setForm] = useForm({
    date: new Date(),
    name: '',
    wifeName: '',
    age: '',
    husbandName: '',
    wifeAge: '',
    address: '',
    phoneNumber: '',
    diagnosis: '',
    hospital: '',
    option: 'Pendampingan',
  });

  const [formServiceType, setFormServiceType] = useForm({
    piercing: false,
    circumcision: false,
    usg: false,
    pregnancyExercise: false,
    postpartumControl: false,
    babyControl: false,
    changeBandage: false,
    consultation: false,
  });

  const [visibleDate, setVisibleDate] = useState(false);

  const renderServiceType = () => {
    return (
      <>
        <Gap height={12} />
        <Text style={styles.label}>{'Treatment'}</Text>
        <View style={styles.containerTreatment}>
          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Tindik'}
              isActive={formServiceType.piercing}
              onPress={() =>
                setFormServiceType('piercing', !formServiceType.piercing)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Sunat'}
              isActive={formServiceType.circumcision}
              onPress={() =>
                setFormServiceType(
                  'circumcision',
                  !formServiceType.circumcision,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'USG'}
              isActive={formServiceType.usg}
              onPress={() => setFormServiceType('usg', !formServiceType.usg)}
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Senam Hamil'}
              isActive={formServiceType.pregnancyExercise}
              onPress={() =>
                setFormServiceType(
                  'pregnancyExercise',
                  !formServiceType.pregnancyExercise,
                )
              }
            />
          </View>

          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Kontrol Nifas'}
              isActive={formServiceType.postpartumControl}
              onPress={() =>
                setFormServiceType(
                  'postpartumControl',
                  !formServiceType.postpartumControl,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Kontrol Bayi'}
              isActive={formServiceType.babyControl}
              onPress={() =>
                setFormServiceType('babyControl', !formServiceType.babyControl)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Ganti Perban'}
              isActive={formServiceType.changeBandage}
              onPress={() =>
                setFormServiceType(
                  'changeBandage',
                  !formServiceType.changeBandage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Konsultasi'}
              isActive={formServiceType.consultation}
              onPress={() =>
                setFormServiceType(
                  'consultation',
                  !formServiceType.consultation,
                )
              }
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input label={'Jenis Layanan'} value={'Lainnya'} editable={false} />

          <Gap height={12} />
          <Input
            label={'Nama'}
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ibu/Nama Istri'}
            value={form.wifeName}
            onChangeText={value => setForm('wifeName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Usia'}
            value={form.age}
            keyboardType={'numeric'}
            onChangeText={value => setForm('age', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ayah/Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Usia Istri'}
            value={form.wifeAge}
            keyboardType={'numeric'}
            onChangeText={value => setForm('wifeAge', value)}
          />

          <Gap height={12} />
          <Input
            label={'Alamat'}
            value={form.address}
            multiline
            onChangeText={value => setForm('address', value)}
          />

          {renderServiceType()}

          <Gap height={12} />
          <Input
            label={'No. Whatsapp'}
            value={form.phoneNumber}
            keyboardType={'numeric'}
            onChangeText={value => setForm('phoneNumber', value)}
          />

          <Gap height={12} />
          <Input
            label={'Tanggal Kunjungan Saat ini'}
            value={moments(form.date).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDate(true)}
          />

          <Gap height={20} />
          <Button label={'Submit'} onPress={() => ToastAlert()} />
        </View>
      </ScrollView>

      {visibleDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.date}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.date;
            setVisibleDate(false);
            setForm('date', currentDate);
          }}
        />
      )}
    </Container>
  );
};

export default AddServicesOther;
