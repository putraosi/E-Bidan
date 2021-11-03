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

const AddServicesImmunization = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    gender: 'Pria',
    birthday: new Date(),
    wifeName: '',
    husbandName: '',
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

  const renderTypeImmunization = () => {
    return (
      <>
        <Gap height={12} />
        <Text style={styles.label}>{'Treatment'}</Text>
        <View style={styles.containerTypeImmunization}>
          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'HB 0'}
              isActive={formTypeImmunization.HB0}
              onPress={() =>
                setFormTypeImmunization('HB0', !formTypeImmunization.HB0)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'BCG'}
              isActive={formTypeImmunization.BCG}
              onPress={() =>
                setFormTypeImmunization('BCG', !formTypeImmunization.BCG)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pentabio 1'}
              isActive={formTypeImmunization.pentabio1}
              onPress={() =>
                setFormTypeImmunization(
                  'pentabio1',
                  !formTypeImmunization.pentabio1,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pentabio 2'}
              isActive={formTypeImmunization.pentabio2}
              onPress={() =>
                setFormTypeImmunization(
                  'pentabio2',
                  !formTypeImmunization.pentabio2,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pentabio 3'}
              isActive={formTypeImmunization.pentabio3}
              onPress={() =>
                setFormTypeImmunization(
                  'pentabio3',
                  !formTypeImmunization.pentabio3,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Polio 1'}
              isActive={formTypeImmunization.polio1}
              onPress={() =>
                setFormTypeImmunization('polio1', !formTypeImmunization.polio1)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Polio 2'}
              isActive={formTypeImmunization.polio2}
              onPress={() =>
                setFormTypeImmunization('polio2', !formTypeImmunization.polio2)
              }
            />
          </View>

          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Polio 3'}
              isActive={formTypeImmunization.polio3}
              onPress={() =>
                setFormTypeImmunization('polio3', !formTypeImmunization.polio3)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Polio 4'}
              isActive={formTypeImmunization.polio4}
              onPress={() =>
                setFormTypeImmunization('polio4', !formTypeImmunization.polio4)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'IPV'}
              isActive={formTypeImmunization.IPV}
              onPress={() =>
                setFormTypeImmunization('IPV', !formTypeImmunization.IPV)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'MR'}
              isActive={formTypeImmunization.MR}
              onPress={() =>
                setFormTypeImmunization('MR', !formTypeImmunization.MR)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pentabio Booster (Ulangan)'}
              isActive={formTypeImmunization.pentabio_booster}
              onPress={() =>
                setFormTypeImmunization(
                  'pentabio_booster',
                  !formTypeImmunization.pentabio_booster,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'MR Booster (Ulangan)'}
              isActive={formTypeImmunization.MR_booster}
              onPress={() =>
                setFormTypeImmunization(
                  'MR_booster',
                  !formTypeImmunization.MR_booster,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Lainnya'}
              isActive={formTypeImmunization.other}
              onPress={() =>
                setFormTypeImmunization('other', !formTypeImmunization.other)
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
            value={form.wifeName}
            onChangeText={value => setForm('wifeName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ayah'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Tempat Lahir'}</Text>
          {constants.SELECT_BIRTHPLACE.map(item => (
            <RadioButton
              key={item.id}
              style={styles.radioButton}
              label={item.name}
              isActive={item.name == form.birthplace}
              onPress={() => setForm('birthplace', item.name)}
            />
          ))}

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

          {renderTypeImmunization()}

          <Gap height={12} />
          <Input
            label={'Tanggal Kunjungan Hari Ini'}
            value={moments(form.visitDate).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleDatePickerVisitDate(true)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Jenis Kelamin'}</Text>
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
          <Button label={'Submit'} onPress={() => ToastAlert()} />
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
    </Container>
  );
};

export default AddServicesImmunization;
