import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Modals,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {constants, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import styles from './styles';

const userBidanDummy = [
  {id: 1, name: 'Bidan 1'},
  {id: 2, name: 'Bidan 2'},
  {id: 3, name: 'Bidan 3'},
];

const maximumDateWife = new Date(new Date().getFullYear() - 10);

const AddServices = ({navigation, route}) => {
  route.params.service;

  const [form, setForm] = useForm({
    serviceType: route.params.service,
    wifeName: '',
    wifeBirthday: maximumDateWife,
    husbandName: '',
    childName: '',
    childAge: '',
    address: '',
    executionTime: new Date(),
    placeExecution: '',
    midwife: '',
    phoneNumber: '',
    price: ''
  });
  const [formTreatment, setFormTreatment] = useForm({
    pregnancyMassage: false,
    lactationMassage: false,
    oxytocinMassage: false,
    acupressureMassage: false,
    postpartumMassage: false,
    lactationMassageWithComplaints: false,
    babyMassage: false,
    pediatricBabyMassage: false,
    massagePackage: false,
    babyHaircut: false,
    immunization: false,
    babySpa: false,
    newBornCare: false,
    KF_KN: false,
    circumcision: false,
    pregnantControl: false,
  });
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibelDatePickerWifeBirthday, setVisibelDatePickerWifeBirthday] =
    useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.executionTime;
    setVisibleDatePicker(false);
    setForm('executionTime', currentDate);
  };

  const renderTreatment = () => {
    return (
      <>
        <Gap height={12} />
        <Text style={styles.label}>{'Treatment'}</Text>
        <View style={styles.containerTreatment}>
          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Pijat Hamil'}
              isActive={formTreatment.pregnancyMassage}
              onPress={() =>
                setFormTreatment(
                  'pregnancyMassage',
                  !formTreatment.pregnancyMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Laktasi'}
              isActive={formTreatment.lactationMassage}
              onPress={() =>
                setFormTreatment(
                  'lactationMassage',
                  !formTreatment.lactationMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Oksitosin'}
              isActive={formTreatment.oxytocinMassage}
              onPress={() =>
                setFormTreatment(
                  'oxytocinMassage',
                  !formTreatment.oxytocinMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Accupressure'}
              isActive={formTreatment.acupressureMassage}
              onPress={() =>
                setFormTreatment(
                  'acupressureMassage',
                  !formTreatment.acupressureMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Nifas'}
              isActive={formTreatment.postpartumMassage}
              onPress={() =>
                setFormTreatment(
                  'postpartumMassage',
                  !formTreatment.postpartumMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Laktasi Dengan Keluhan'}
              isActive={formTreatment.lactationMassageWithComplaints}
              onPress={() =>
                setFormTreatment(
                  'lactationMassageWithComplaints',
                  !formTreatment.lactationMassageWithComplaints,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Massage'}
              isActive={formTreatment.babyMassage}
              onPress={() =>
                setFormTreatment('babyMassage', !formTreatment.babyMassage)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Massage Pediatrik'}
              isActive={formTreatment.pediatricBabyMassage}
              onPress={() =>
                setFormTreatment(
                  'pediatricBabyMassage',
                  !formTreatment.pediatricBabyMassage,
                )
              }
            />
          </View>

          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Paket Pijat'}
              isActive={formTreatment.massagePackage}
              onPress={() =>
                setFormTreatment(
                  'massagePackage',
                  !formTreatment.massagePackage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Cukur Rambut Bayi'}
              isActive={formTreatment.babyHaircut}
              onPress={() =>
                setFormTreatment('babyHaircut', !formTreatment.babyHaircut)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Imunisasi'}
              isActive={formTreatment.immunization}
              onPress={() =>
                setFormTreatment('immunization', !formTreatment.immunization)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Spa'}
              isActive={formTreatment.babySpa}
              onPress={() =>
                setFormTreatment('babySpa', !formTreatment.babySpa)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'New Born Care'}
              isActive={formTreatment.newBornCare}
              onPress={() =>
                setFormTreatment('newBornCare', !formTreatment.newBornCare)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'KF & KN'}
              isActive={formTreatment.KF_KN}
              onPress={() => setFormTreatment('KF_KN', !formTreatment.KF_KN)}
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Sunat'}
              isActive={formTreatment.circumcision}
              onPress={() =>
                setFormTreatment('circumcision', !formTreatment.circumcision)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Kontrol Hamil'}
              isActive={formTreatment.pregnantControl}
              onPress={() =>
                setFormTreatment(
                  'pregnantControl',
                  !formTreatment.pregnantControl,
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
          <Input
            label={'Jenis Layanan'}
            value={form.serviceType}
            editable={false}
          />

          <Gap height={12} />
          <Input
            label={'Nama Istri'}
            value={form.wifeName}
            onChangeText={value => setForm('wifeName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Tanggal Lahir Istri'}
            value={moments(form.wifeBirthday).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibelDatePickerWifeBirthday(true)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Anak'}
            value={form.childName}
            onChangeText={value => setForm('childName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Usia Anak'}
            value={form.childAge}
            keyboardType={'numeric'}
            onChangeText={value => setForm('childAge', value)}
          />

          <Gap height={12} />
          <Input
            label={'Alamat'}
            value={form.address}
            multiline
            onChangeText={value => setForm('address', value)}
          />

          <Gap height={12} />
          <Input
            label={'Waktu Pelaksanaan'}
            value={moments(form.executionTime).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDatePicker(true)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Tempat Pelaksanaan'}</Text>
          <SpaceBeetwen>
            {constants.SELECT_PLACE_EXECUTION.map(item => (
              <RadioButton
                key={item.id}
                style={styles.flex}
                label={item.name}
                isActive={item.name == form.placeExecution}
                onPress={() => setForm('placeExecution', item.name)}
              />
            ))}
          </SpaceBeetwen>

          <Gap height={12} />
          <Input
            label={'Bidan'}
            value={form.midwife}
            editable={false}
            onPress={() => setVisibleMidwife(true)}
          />

          <Gap height={12} />
          <Input
            label={'No. Whatsapp'}
            value={form.phoneNumber}
            keyboardType={'numeric'}
            onChangeText={value => setForm('phoneNumber', value)}
          />

          {renderTreatment()}

          <Gap height={12} />
          <Input
            label={'Biaya Treatment'}
            value={form.price}
            keyboardType={'numeric'}
            onChangeText={value => setForm('price', value)}
          />

          <Gap height={20} />
          <Button label={'Submit'} onPress={() => ToastAlert()} />
        </View>
      </ScrollView>

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.executionTime}
          mode={'date'}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {visibelDatePickerWifeBirthday && (
        <DatePicker
          testID="dateTimePicker"
          value={form.wifeBirthday}
          mode={'date'}
          maximumDate={maximumDateWife}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.wifeBirthday;
            setVisibelDatePickerWifeBirthday(false);
            setForm('wifeBirthday', currentDate);
          }}
        />
      )}

      <Modals
        type={'spinner'}
        title={'Bidan'}
        visible={visibleMidwife}
        data={userBidanDummy}
        onDismiss={() => setVisibleMidwife(false)}
        onPress={value => {
          setVisibleMidwife(false);
          setForm('midwife', value);
        }}
      />
    </Container>
  );
};

export default AddServices;
