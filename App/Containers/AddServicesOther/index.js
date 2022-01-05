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
  ageCalculation,
  formatSelect,
  formatSelectedId,
  getData,
  onPrice,
  rupiah,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: '',
};

const AddServicesOther = ({navigation, route}) => {
  const [form, setForm] = useForm({
    date: new Date(),
    name: '',
    birthDate: '',
    age: '',
    visitTime: new Date(),
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibelBirthDate, setVisibelBirthDate] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [selectTreatment, setSelectTreatment] = useState(null);
  const [price, setPrice] = useState(0);
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
    });

    getMidwife(new Date());
    getTreatments();
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
      } else {
        setDataMidwife([]);
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      navigation.goBack();
    }
  };

  const getTreatments = async () => {
    try {
      const res = await Api.get({
        url: 'admin/other-category-services',
      });

      if (res) {
        const formated = formatSelect(res, true);

        setSelectTreatment(formated);
        setLoadingTreatment(false);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      navigation.goBack();
    }
  };

  const validation = () => {
    if (!form.name) return ToastAlert('Silahkan isi nama anda');
    if (!form.birthDate) return ToastAlert('Silahkan pilih tanggal lahir anda');
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');
    if (Object.values(selectTreatment).every(item => item.select === false))
      return ToastAlert('Silahkan pilih treatment Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const visit_date = `${moments(form.date).format('YYYY-MM-DD')} ${moments(
      form.visitTime,
    ).format('HH:mm:ss')}`;
    const other_category_service_ids = formatSelectedId(selectTreatment);

    try {
      await Api.post({
        url: 'admin/other-services',
        body: {
          service_category_id: route.params.id,
          name: form.name,
          age: ageCalculation(form.birthDate),
          other_category_service_ids,
          bidan_id: selectMidwife.id,
          pasien_id: dataUser.id,
          visit_date,
          cost: parseInt(price || 0),
        },
        showLog: true,
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
    }
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      {loading || loadingTreatment ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input label={'Jenis Layanan'} value={'Lainnya'} disable />

            <Gap height={12} />
            <Input
              label={'Nama'}
              value={form.name}
              onChangeText={value => setForm('name', value)}
            />

            <Input
              style={styles.input}
              label={'Tanggal Lahir'}
              value={
                form.birthDate
                  ? moments(form.birthDate).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibelBirthDate(true)}
            />

            <Input
              style={styles.input}
              label={'Umur'}
              value={form.birthDate ? ageCalculation(form.birthDate) : ''}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Tanggal Kunjungan'}
              value={moments(form.date).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDate(true)}
            />

            <Input
              style={styles.input}
              label={'Bidan'}
              value={selectMidwife.name}
              placeholder={'Bidan'}
              editable={false}
              onPress={() => {
                if (dataMidwife && dataMidwife.length) setVisibleMidwife(true);
                else
                  SampleAlert({
                    title: 'Mohon Maaf',
                    message: `Pada tanggal ${moments(form.date).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  });
              }}
            />

            <Input
              style={styles.input}
              label={'Waktu Kunjungan'}
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleTimePicker(true)}
            />

            <Text style={styles.label}>{'Treatment'}</Text>
            <FlatList
              data={selectTreatment}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  onPress={() => {
                    const position = selectTreatment.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectTreatment[position].select =
                      !selectTreatment[position].select;

                    setIsView(!isView);
                    const _price = onPrice(selectTreatment);
                    setPrice(_price || 0);
                    setSelectTreatment(selectTreatment);
                  }}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Gap height={8} />
            <Input label={'Biaya'} value={`Rp${rupiah(price)}`} disable />

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      {visibleDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.date}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.date;
            setVisibleDate(false);
            dispatch({type: 'SET_LOADING', value: true});
            getMidwife(currentDate);
            setForm('date', currentDate);
          }}
        />
      )}

      {visibleTimePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitTime}
          mode={'time'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitTime;
            setVisibleTimePicker(false);
            setForm('visitTime', currentDate);
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

      {visibelBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.birthDate ? form.birthDate : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.birthDate;
            setVisibelBirthDate(false);
            setForm('birthDate', currentDate);
          }}
        />
      )}

      {isView && <View />}
    </Container>
  );
};

export default AddServicesOther;
