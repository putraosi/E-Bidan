import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
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
  const [selectHistory, setSelectHistory] = useState(
    constants.SELECT_ANTENATAL_HISTORY,
  );
  const [selectInformation, setSelectInformation] = useState(
    constants.SELECT_ANTENATAL_INFORMATION,
  );
  const [isView, setIsView] = useState(false);

  const validation = () => {
    if (!form.wifeName) return ToastAlert('Silahkan isi nama istri anda');
    if (!form.husbandName) return ToastAlert('Silahkan isi nama suami anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    else if (
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor no. whatsapp valid Anda');
    }
    if (Object.values(selectHistory).every(item => item.select === false))
      return ToastAlert('Silahkan pilih riwayat persalinan anda');
    if (Object.values(selectInformation).every(item => item.select === false))
      return ToastAlert('Silahkan pilih keterangan anda');

    ToastAlert();
  };

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
          <FlatList
            data={constants.SELECT_PREGNANCY}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                style={styles.radioButton}
                label={item.name}
                isActive={item.name == form.pregnancy}
                onPress={() => setForm('pregnancy', item.name)}
              />
            )}
            scrollEnabled={false}
            numColumns={2}
          />

          <Gap height={8} />
          <Text style={styles.label}>{'Abortus'}</Text>
          <FlatList
            data={constants.SELECT_ABORTION}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                style={styles.radioButton}
                label={item.name}
                isActive={item.name == form.abortion}
                onPress={() => setForm('abortion', item.name)}
              />
            )}
            scrollEnabled={false}
            numColumns={2}
          />

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
          <FlatList
            data={selectHistory}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                type={'rounded'}
                style={styles.radioButton}
                label={item.name}
                isActive={item.select}
                onPress={() => {
                  const position = selectHistory.findIndex(
                    obj => obj.id == item.id,
                  );
                  selectHistory[position].select =
                    !selectHistory[position].select;
                  setIsView(!isView);
                  setSelectHistory(selectHistory);
                }}
              />
            )}
            scrollEnabled={false}
          />

          <Gap height={8} />
          <Text style={styles.label}>{'Keterangan'}</Text>
          <FlatList
            data={selectInformation}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                type={'rounded'}
                style={styles.radioButton}
                label={item.name}
                isActive={item.select}
                onPress={() => {
                  const position = selectInformation.findIndex(
                    obj => obj.id == item.id,
                  );
                  selectInformation[position].select =
                    !selectInformation[position].select;
                  setIsView(!isView);
                  setSelectInformation(selectInformation);
                }}
              />
            )}
            numColumns={3}
            scrollEnabled={false}
          />

          <Gap height={16} />
          <Button label={'Submit'} onPress={validation} />
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

      {isView && <View />}
    </Container>
  );
};

export default AddServicesAntenatal;
