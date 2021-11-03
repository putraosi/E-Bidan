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

const AddServicesAntenatal = ({navigation}) => {
  const [form, setForm] = useForm({
    wifeName: '',
    husbandName: '',
    wifeBirthday: maximumDateWife,
    address: '',
    phoneNumber: '',
    pregnancy: '1',
    abortion: 'Tidak Pernah',
    pregnancyAge: new Date(),
    visitDate: new Date(),
    spontaneous: false,
    sectioCaesarea: false,
    k1: false,
    k2: false,
    lab: false,
  });

  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibelDatePickerWifeBirthday, setVisibelDatePickerWifeBirthday] =
    useState(false);
  const [visibelDatePickerPregnancyAge, setVisibelDatePickerPregnancyAge] =
    useState(false);
  const [visibleDatePickerVisitDate, setVisibleDatePickerVisitDate] =
    useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label={'Jenis Layanan'}
            value={'Antenatal (Pemeriksaan Kehamilan)'}
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
            label={'Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
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
            label={'Alamat'}
            value={form.address}
            multiline
            onChangeText={value => setForm('address', value)}
          />

          <Gap height={12} />
          <Input
            label={'No. Whatsapp'}
            value={form.phoneNumber}
            keyboardType={'numeric'}
            onChangeText={value => setForm('phoneNumber', value)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Kehamilan Ke'}</Text>
          {constants.SELECT_PREGNANCY.map(item => (
            <RadioButton
              key={item.id}
              style={styles.radioButton}
              label={item.name}
              isActive={item.name == form.pregnancy}
              onPress={() => setForm('pregnancy', item.name)}
            />
          ))}

          <Gap height={8} />
          <Text style={styles.label}>{'Abortus'}</Text>
          {constants.SELECT_ABORTION.map(item => (
            <RadioButton
              key={item.id}
              style={styles.radioButton}
              label={item.name}
              isActive={item.name == form.abortion}
              onPress={() => setForm('abortion', item.name)}
            />
          ))}

          <Gap height={8} />
          <Input
            label={'Perkiraan Usia Kehamilaan Saat Kunjungan'}
            value={moments(form.pregnancyAge).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibelDatePickerPregnancyAge(true)}
          />

          <Gap height={12} />
          <Input
            label={'Tanggal Kunjungan Hari Ini'}
            value={moments(form.visitDate).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDatePickerVisitDate(true)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Riwayat Persalinan'}</Text>
          <RadioButton
            type={'rounded'}
            label={'Spontan'}
            isActive={form.spontaneous}
            onPress={() => setForm('spontaneous', !form.spontaneous)}
          />
          <Gap height={4} />
          <RadioButton
            type={'rounded'}
            label={'Sectio Caesarea'}
            isActive={form.sectioCaesarea}
            onPress={() => setForm('sectioCaesarea', !form.sectioCaesarea)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Keterangan'}</Text>
          <RadioButton
            type={'rounded'}
            label={'K1'}
            isActive={form.k1}
            onPress={() => setForm('k1', !form.k1)}
          />
          <Gap height={4} />
          <RadioButton
            type={'rounded'}
            label={'K2'}
            isActive={form.k2}
            onPress={() => setForm('k2', !form.k2)}
          />
          <Gap height={4} />
          <RadioButton
            type={'rounded'}
            label={'LAB'}
            isActive={form.lab}
            onPress={() => setForm('lab', !form.lab)}
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
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.executionTime;
            setVisibleDatePicker(false);
            setForm('executionTime', currentDate);
          }}
        />
      )}

      {visibelDatePickerWifeBirthday && (
        <DatePicker
          testID="dateTimePicker"
          value={form.wifeBirthday}
          mode={'date'}
          maximumDate={maximumDateWife}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate | form.wifeBirthday;
            setVisibelDatePickerWifeBirthday(false);
            setForm('wifeBirthday', currentDate);
          }}
        />
      )}

      {visibelDatePickerPregnancyAge && (
        <DatePicker
          testID="dateTimePicker"
          value={form.pregnancyAge}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate | form.pregnancyAge;
            setVisibelDatePickerPregnancyAge(false);
            setForm('pregnancyAge', currentDate);
          }}
        />
      )}

      {visibleDatePickerVisitDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate | form.visitDate;
            setVisibleDatePickerVisitDate(false);
            setForm('visitDate', currentDate);
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

export default AddServicesAntenatal;
