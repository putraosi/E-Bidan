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
} from '../../Components';
import {
  constants,
  hplCalculation,
  rupiah,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';
const AddServicesUltrasonografi = ({navigation, route}) => {
  const [form, setForm] = useForm({
    child: '',
    abortion: '',
    hpht: '',
    visitDate: new Date(),
    visitTime: new Date(),
    type: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(true);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleChild, setVisibleChild] = useState(false);
  const [visibleAbortion, setVisibleAbortion] = useState(false);
  const [visibleDatePickerHPHT, setVisibleDatePickerHPHT] = useState(false);
  const [visibleVisitDate, setVisibleVisitDate] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [dataType, setDataType] = useState([]);
  const [gestationalAge, setGestationalAge] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getType();
    setLoading(false);
  }, []);

  const getType = async () => {
    try {
      const res = await Api.get({
        url: 'admin/ultrasonografi-types',
      });

      setDataType(res);
      setLoadingType(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const validation = () => {
    if (!form.child) return ToastAlert('Silahkan pilih total anak');
    if (!form.abortion) return ToastAlert('Silahkan pilih keguguran');
    if (!form.type) return ToastAlert('Silahkan pilih jenis USG Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    let abortus = form.abortion;
    const ultrasonografi_types = [form.type.id];
    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;
    const date_last_haid = '';
    const date_estimate_birth = '';

    if (form.hpht) {
      date_last_haid = moments(form.hpht).format('YYYY-MM-DD');
      date_estimate_birth = moments(form.hpht)
        .add(40, 'weeks')
        .format('YYYY-MM-DD');
    }

    if (abortus == 'Tidak Pernah') abortus = '0';

    try {
      const res = await Api.post({
        url: 'admin/ultrasonografis',
        body: {
          service_category_id: route.params.id,
          ultrasonografi_types,
          date_last_haid,
          child: form.child,
          abortus,
          cost: parseInt(price),
          pasien_id: route.params.userId,
          visit_date,
          gestational_age: gestationalAge,
          date_estimate_birth,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert(error.message);
    }
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      {loading || loadingType ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={'Jenis Layanan'}
              value={'Ultrasonografi (USG)'}
              disable
            />

            <Input
              style={styles.input}
              label={'Total Anak'}
              value={form.child}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleChild(true)}
            />

            <Input
              style={styles.input}
              label={'Keguguran'}
              value={form.abortion}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleAbortion(true)}
            />

            <Input
              style={styles.input}
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleVisitDate(true)}
            />

            <Input
              style={styles.input}
              label={'Waktu Kunjungan'}
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleVisitTime(true)}
            />

            <Input
              style={styles.input}
              label={'Hari Pertama Haid Terakhir (HPHT)'}
              value={form.hpht ? moments(form.hpht).format('DD MMMM YYYY') : ''}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleDatePickerHPHT(true)}
            />

            <Input
              style={styles.input}
              label={'Hari Perkiraan Lahir (HPL)'}
              value={
                form.hpht
                  ? moments(form.hpht).add(40, 'weeks').format('DD MMMM YYYY')
                  : ''
              }
              disable
            />

            <Input
              style={styles.input}
              label={'Usia Kehamilan'}
              value={gestationalAge}
              disable
            />

            <Text style={styles.label}>{'Jenis USG'}</Text>
            <FlatList
              data={dataType}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.type.name}
                  onPress={() => {
                    setForm('type', item);
                    setPrice(item.cost);
                  }}
                />
              )}
              scrollEnabled={false}
              numColumns={2}
            />

            <Gap height={8} />
            <Input label={'Biaya'} value={`Rp${rupiah(price)}`} disable />

            <Text style={styles.desc}>{'*Coming Soon!'}</Text>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      <Modals
        type={'spinner'}
        title={'Pilih Anak'}
        visible={visibleChild}
        data={constants.SELECT_PREGNANCY}
        onDismiss={() => setVisibleChild(false)}
        onSelect={value => {
          setVisibleChild(false);
          setForm('child', value.name);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Pilih Keguguran'}
        visible={visibleAbortion}
        data={constants.SELECT_ABORTION}
        onDismiss={() => setVisibleAbortion(false)}
        onSelect={value => {
          setVisibleAbortion(false);
          setForm('abortion', value.name);
        }}
      />

      <ModalAlert
        visible={visibleSuccess}
        desc={'Selamat anda telah berhasil\nmendaftar di layanan kami'}
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />

      {visibleDatePickerHPHT && (
        <DatePicker
          testID="dateTimePicker"
          value={form.hpht ? form.hpht : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.hpht;
            setVisibleDatePickerHPHT(false);
            const calculation = hplCalculation(form.visitDate, currentDate);
            setGestationalAge(calculation);
            setForm('hpht', currentDate);
          }}
        />
      )}

      {visibleVisitDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitDate;
            setVisibleVisitDate(false);
            const calculation = hplCalculation(form.visitDate, currentDate);
            setGestationalAge(calculation);
            setForm('visitDate', currentDate);
          }}
        />
      )}

      {visibleVisitTime && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitTime}
          mode={'time'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitTime;
            setVisibleVisitTime(false);
            setForm('visitTime', currentDate);
          }}
        />
      )}
    </Container>
  );
};

export default AddServicesUltrasonografi;
