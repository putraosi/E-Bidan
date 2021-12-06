import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Loading,
  ModalAlert,
  Modals,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {constants, SampleAlert, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesInc = ({navigation, route}) => {
  const [form, setForm] = useForm({
    birthDate: new Date(),
    motherName: '',
    fatherName: '',
    motherAge: '',
    address: '',
    diagnosis: '',
    typeChildbirth: 'Spontan LBK',
    typeChildbirthOther: '',
    gender: 'Laki-Laki',
    time: new Date(),
    visitDate: new Date(),
    babyWeight: '',
    babyLength: '',
    description: '',
    price: '0',
  });

  const [loading, setLoading] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibelTime, setVisibelTime] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMidwife(new Date());
  }, []);

  const getMidwife = async date => {
    try {
      const res = await Api.get({
        url: 'admin/practice-schedulles',
        params: {
          now: moments(date).format('YYYY-MM-DD'),
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
      if (res && res.length) {
        setDataMidwife(res[0].bidans);
        setSelectMidwife(defalutSelectMidwife);
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      navigation.goBack();
    }
  };

  const validation = () => {
    if (!form.motherName) return ToastAlert('Silahkan isi nama ibu anda');
    if (!form.fatherName) return ToastAlert('Silahkan isi nama ayah anda');
    if (!form.motherAge) return ToastAlert('Silahkan isi usia ibu anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    if (!form.diagnosis) return ToastAlert('Silahkan isi diagnosa masuk anda');
    if (!form.babyWeight) return ToastAlert('Silahkan isi berat bayi anda');
    if (!form.babyLength) return ToastAlert('Silahkan isi panjang bayi anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan Anda');
    if (!form.description) return ToastAlert('Silahkan isi keterangan anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const other =
      form.typeChildbirth == 'Lainnya' ? form.typeChildbirthOther : '';

    try {
      const res = await Api.post({
        url: 'admin/incs',
        body: {
          companion_id: selectMidwife.id,
          birth_date: moments(form.birthDate).format('YYYY-MM-DD'),
          spouse_name: form.fatherName,
          mother_name: form.motherName,
          age_mom: parseInt(form.motherAge),
          address: form.address,
          diagnosis: form.diagnosis,
          type_of_labor: form.typeChildbirth.toLowerCase().replaceAll(' ', '_'),
          other,
          gender: form.gender.toLowerCase(),
          hour: moments(form.time).format('HH:mm'),
          baby_weight: parseFloat(form.babyWeight),
          baby_length: parseFloat(form.babyLength),
          remarks: form.description,
          amount: parseInt(form.price),
          service_category_id: route.params.id,
          pasien_id: route.params.userId,
          visit_date: moments(form.visitDate).format('YYYY-MM-DD'),
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      if (res) {
        setVisibleSuccess(true);
      } else {
        ToastAlert('Silahkan coba beberapa saat lagi');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      ToastAlert('Silahkan coba beberapa saat lagi');
    }
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input label={'Jenis Layanan'} value={'INC'} disable />

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
                  other={form.typeChildbirthOther}
                  onChangeText={value => setForm('typeChildbirthOther', value)}
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
            <Input
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePicker(true)}
            />

            <Gap height={12} />
            <Input
              label={'Bidan'}
              value={selectMidwife.name}
              editable={false}
              onPress={() => {
                if (dataMidwife && dataMidwife.length) setVisibleMidwife(true);
                else
                  SampleAlert({
                    title: 'Mohon Maaf',
                    message: `Pada tanggal ${moments(form.visitDate).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  });
              }}
            />

            <Gap height={8} />
            <Input
              label={'Keterangan'}
              value={form.description}
              onChangeText={value => setForm('description', value)}
            />

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      {visibleBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthDate}
          mode={'date'}
          maximumDate={new Date()}
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

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitDate;
            setVisibleDatePicker(false);
            dispatch({type: 'SET_LOADING', value: true});
            getMidwife(currentDate);
            setForm('visitDate', currentDate);
          }}
        />
      )}

      <Modals
        type={'spinner'}
        title={'Pilih Bidan'}
        visible={visibleMidwife}
        data={dataMidwife}
        onDismiss={() => setVisibleMidwife(false)}
        onSelect={value => {
          setVisibleMidwife(false);
          setSelectMidwife(value);
        }}
      />

      <ModalAlert
        visible={visibleSuccess}
        desc={'Selamat anda telah berhasil\nmendaftar di layanan kami'}
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />

      {isView && <View />}
    </Container>
  );
};

export default AddServicesInc;
