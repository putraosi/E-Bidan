import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {constants, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import styles from './styles';

const AddServicesImmunization = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    gender: 'Pria',
    birthday: new Date(),
    motherName: '',
    fatherName: '',
    birthplace: 'RS',
    address: '',
    phoneNumber: '',
    visitDate: new Date(),
    typeDescription: 'Hygea',
  });

  const [formTypeImmunization, setFormTypeImmunization] = useForm({
    HB0: false,
    BCG: false,
    pentabio1: false,
    pentabio2: false,
    pentabio3: false,
    polio1: false,
    polio2: false,
    polio3: false,
    polio4: false,
    IPV: false,
    MR: false,
    pentabio_booster: false,
    MR_booster: false,
    other: false,
  });

  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleDatePickerVisitDate, setVisibleDatePickerVisitDate] =
    useState(false);
  const [selectTypeImmunization, setSelectTypeImmunization] = useState(
    constants.SELECT_TYPE_IMMUNIZATION,
  );
  const [isView, setIsView] = useState(false);

  const validation = () => {
    if (!form.name) return ToastAlert('Silahkan isi nama anda');
    if (!form.motherName) return ToastAlert('Silahkan isi nama ibu anda');
    if (!form.fatherName) return ToastAlert('Silahkan isi nama ayah anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    else if (
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor no. whatsapp valid Anda');
    }
    if (
      Object.values(selectTypeImmunization).every(item => item.select === false)
    )
      return ToastAlert('Silahkan pilih jenis imunisasi anda');

    ToastAlert();
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input label={'Jenis Layanan'} value={'Imunisasi'} editable={false} />

          <Gap height={12} />
          <Input
            label={'Nama'}
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Jenis Kelamin'}</Text>
          <SpaceBeetwen>
            {constants.SELECT_GENDER.map(item => (
              <RadioButton
                key={item.id}
                style={styles.flex}
                label={item.name}
                isActive={item.name == form.gender}
                onPress={() => setForm('gender', item.name)}
              />
            ))}
          </SpaceBeetwen>

          <Gap height={12} />
          <Input
            label={'Tanggal Lahir'}
            value={moments(form.birthday).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDatePicker(true)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ibu'}
            value={form.motherName}
            onChangeText={value => setForm('motherName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ibu'}
            value={form.fatherName}
            onChangeText={value => setForm('fatherName', value)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Tempat Lahir'}</Text>
          <FlatList
            data={constants.SELECT_BIRTHPLACE}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                style={styles.radioButton}
                label={item.name}
                isActive={item.name == form.birthplace}
                onPress={() => setForm('birthplace', item.name)}
              />
            )}
            scrollEnabled={false}
            numColumns={2}
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
          <Text style={styles.label}>{'Jenis Immunisasi'}</Text>
          <FlatList
            data={selectTypeImmunization}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                type={'rounded'}
                style={styles.radioButton}
                label={item.name}
                isActive={item.select}
                onPress={() => {
                  const position = selectTypeImmunization.findIndex(
                    obj => obj.id == item.id,
                  );
                  selectTypeImmunization[position].select =
                    !selectTypeImmunization[position].select;
                  setIsView(!isView);
                  setSelectTypeImmunization(selectTypeImmunization);
                }}
              />
            )}
            numColumns={2}
            scrollEnabled={false}
          />

          <Gap height={8} />
          <Input
            label={'Tanggal Kunjungan Hari Ini'}
            value={moments(form.visitDate).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDatePickerVisitDate(true)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Keterangan'}</Text>
          <SpaceBeetwen>
            {constants.SELECT_TYPE_DESCRIPTION.map(item => (
              <RadioButton
                key={item.id}
                style={styles.flex}
                label={item.name}
                isActive={item.name == form.typeDescription}
                onPress={() => setForm('typeDescription', item.name)}
              />
            ))}
          </SpaceBeetwen>

          <Gap height={20} />
          <Button label={'Submit'} onPress={validation} />
        </View>
      </ScrollView>

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthday}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.birthday;
            setVisibleDatePicker(false);
            setForm('birthday', currentDate);
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

      {isView && <View />}
    </Container>
  );
};

export default AddServicesImmunization;
