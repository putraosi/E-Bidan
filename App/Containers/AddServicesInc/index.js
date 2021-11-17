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
    motherName: '',
    fatherName: '',
    motherAge: '',
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
  const [selectCompanionMidwife, setSelectCompanionMidwife] = useState(
    constants.SELECT_COMPANINON_MIDWIFE,
  );
  const [isView, setIsView] = useState(false);

  const validation = () => {
    if (!form.motherName) return ToastAlert('Silahkan isi nama ibu anda');
    if (!form.fatherName) return ToastAlert('Silahkan isi nama ayah anda');
    if (!form.motherAge) return ToastAlert('Silahkan isi usia ibu anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    if (!form.diagnosis) return ToastAlert('Silahkan isi diagnosa masuk anda');
    if (!form.babyWeight) return ToastAlert('Silahkan isi berat bayi anda');
    if (!form.babyLength) return ToastAlert('Silahkan isi panjang bayi anda');
    if (
      Object.values(selectCompanionMidwife).every(item => item.select === false)
    )
      return ToastAlert('Silahkan pilih bidan pendamping anda');
    if (!form.description) return ToastAlert('Silahkan isi keterangan anda');
    if (!form.price) return ToastAlert('Silahkan isi biaya anda');

    ToastAlert();
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
            label={'Nama Ibu'}
            value={form.motherName}
            onChangeText={value => setForm('motherName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Ayah'}
            value={form.fatherName}
            onChangeText={value => setForm('fatherName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Usia Ibu'}
            value={form.motherAge}
            keyboardType={'numeric'}
            onChangeText={value => setForm('motherAge', value)}
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

          <Gap height={12} />
          <Text style={styles.label}>{'Bidan Pedamping'}</Text>
          <FlatList
            data={selectCompanionMidwife}
            renderItem={({item}) => (
              <RadioButton
                key={item.id}
                type={'rounded'}
                style={styles.radioButton}
                label={item.name}
                isActive={item.select}
                onPress={() => {
                  const position = selectCompanionMidwife.findIndex(
                    obj => obj.id == item.id,
                  );
                  selectCompanionMidwife[position].select =
                    !selectCompanionMidwife[position].select;
                  setIsView(!isView);
                  setSelectCompanionMidwife(selectCompanionMidwife);
                }}
              />
            )}
            numColumns={2}
            scrollEnabled={false}
          />

          <Gap height={8} />
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
          <Button label={'Submit'} onPress={validation} />
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
      {isView && <View />}
    </Container>
  );
};

export default AddServicesInc;
