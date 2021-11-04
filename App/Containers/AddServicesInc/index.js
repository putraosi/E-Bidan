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

const AddServicesInc = ({navigation}) => {
  const [form, setForm] = useForm({
    birthDate: new Date(),
    wifeName: '',
    husbandName: '',
    wifeAge: '',
    address: '',
    diagnosis: '',
    typeChildbirth: 'Spontan LBK',
    gender: 'Pria',
    time: new Date(),
    babyWeight: '',
    babyLength: '',
    description: '',
    price: '',
  });

  const [formCompanionMidwife, setFormCompanionMidwife] = useForm({
    amel: false,
    nisa: false,
    syifa: false,
    dwi: false,
    rani: false,
    iwana: false,
    ningsih: false,
    hansa: false,
  });

  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibelTime, setVisibelTime] = useState(false);

  const renderCompanionMidwife = () => {
    return (
      <>
        <Gap height={12} />
        <Text style={styles.label}>{'Bidan Pendamping'}</Text>
        <View style={styles.containerCompanionMidwife}>
          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Bidan Amel'}
              isActive={formCompanionMidwife.amel}
              onPress={() =>
                setFormCompanionMidwife('amel', !formCompanionMidwife.amel)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Nisa'}
              isActive={formCompanionMidwife.nisa}
              onPress={() =>
                setFormCompanionMidwife('nisa', !formCompanionMidwife.nisa)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Syifa'}
              isActive={formCompanionMidwife.syifa}
              onPress={() =>
                setFormCompanionMidwife('syifa', !formCompanionMidwife.syifa)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Dwi'}
              isActive={formCompanionMidwife.dwi}
              onPress={() =>
                setFormCompanionMidwife('dwi', !formCompanionMidwife.dwi)
              }
            />
          </View>

          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Bidan Rani'}
              isActive={formCompanionMidwife.rani}
              onPress={() =>
                setFormCompanionMidwife('rani', !formCompanionMidwife.rani)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Iwana'}
              isActive={formCompanionMidwife.iwana}
              onPress={() =>
                setFormCompanionMidwife('iwana', !formCompanionMidwife.iwana)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Ningsih'}
              isActive={formCompanionMidwife.ningsih}
              onPress={() =>
                setFormCompanionMidwife('ningsih', !formCompanionMidwife.ningsih)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Bidan Hansa'}
              isActive={formCompanionMidwife.hansa}
              onPress={() =>
                setFormCompanionMidwife('hansa', !formCompanionMidwife.hansa)
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
          <Input label={'Jenis Layanan'} value={'INC'} editable={false} />

          <Gap height={12} />
          <Input
            label={'Tanggal Persalinan'}
            value={moments(form.birthDate).format('DD MMMM YYYY')}
            editable={false}
            onPress={() => setVisibleBirthDate(true)}
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

          <Gap height={12} />
          <Input
            label={'Diagnosa Masuk'}
            value={form.diagnosis}
            onChangeText={value => setForm('diagnosis', value)}
          />

          <Gap height={12} />
          <Text style={styles.label}>{'Jenis Persalinan'}</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={constants.SELECT_TYPE_CHILDBIRTH}
            renderItem={({item, index}) => (
              <RadioButton
                style={styles.radioTypeChildbirth}
                label={item.name}
                isActive={item.name == form.typeChildbirth}
                onPress={() => setForm('typeChildbirth', item.name)}
              />
            )}
            numColumns={2}
          />

          <Gap height={8} />
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
            label={'Jam'}
            value={moments(form.time).format('hh:mm')}
            editable={false}
            onPress={() => setVisibelTime(true)}
          />

          <Gap height={12} />
          <Input
            label={'Berat Bayi Baru Lahir'}
            value={form.babyWeight}
            keyboardType={'numeric'}
            onChangeText={value => setForm('babyWeight', value)}
          />

          <Gap height={12} />
          <Input
            label={'Panjang Bayi Baru Lahir'}
            value={form.babyLength}
            keyboardType={'numeric'}
            onChangeText={value => setForm('babyLength', value)}
          />

          {renderCompanionMidwife()}

          <Gap height={12} />
          <Input
            label={'Keterangan'}
            value={form.description}
            onChangeText={value => setForm('description', value)}
          />

          <Gap height={12} />
          <Input
            label={'Biaya'}
            value={form.price}
            keyboardType={'numeric'}
            onChangeText={value => setForm('price', value)}
          />

          <Gap height={20} />
          <Button label={'Submit'} onPress={() => ToastAlert()} />
        </View>
      </ScrollView>

      {visibleBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.birthDate;
            setVisibleBirthDate(false);
            setForm('birthDate', currentDate);
          }}
        />
      )}

      {visibelTime && (
        <DatePicker
          testID="dateTimePicker"
          value={form.time}
          mode={'time'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.time;
            setVisibelTime(false);
            setForm('time', currentDate);
          }}
        />
      )}
    </Container>
  );
};

export default AddServicesInc;
