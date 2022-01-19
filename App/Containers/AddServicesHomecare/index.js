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
import {
  ageCalculation,
  constants,
  formatMidwife,
  formatMidwifeTime,
  formatSelectedId,
  formatTreatment,
  getData,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defaultEmpty = {
  id: 0,
  name: 'Pilih',
};

const AddServicesHomecare = ({navigation, route}) => {
  const [form, setForm] = useForm({
    childName: '',
    childBirthDate: '',
    executionTime: new Date(),
    visitDate: new Date(),
    placeExecution: 'Klinik Bidan Amel',
    midwife: '',
    price: '0',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibleChildBirthDate, setVisibleChildBirthDate] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [dataMidwifeTime, setDataMidwifeTime] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defaultEmpty);
  const [selectMidwifeTime, setSelectMidwifeTime] = useState(defaultEmpty);
  const [selectTreatment, setSelectTreatment] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
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
      const res = await Api.post({
        url: 'self/show-schedules',
        body: {
          visit_date: moments(date).format('YYYY-MM-DD'),
        },
      });

      const newData = formatMidwife(res);
      setDataMidwife(newData);
      setSelectMidwife(defaultEmpty);
      setSelectMidwifeTime(defaultEmpty);
      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
      setDataMidwife([]);
      setSelectMidwife(defaultEmpty);
      setSelectMidwifeTime(defaultEmpty);
    }
  };

  const getMidwfieTime = async id => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const res = await Api.post({
        url: 'self/show-schedule-times',
        body: {
          detail_id: id,
        },
      });

      const newData = formatMidwifeTime(res);
      setDataMidwifeTime(newData);
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setDataMidwifeTime([]);
    }
  };

  const getTreatments = async () => {
    try {
      const res = await Api.get({
        url: 'admin/treatments',
      });

      if (res) {
        const newData = formatTreatment(res);
        setSelectTreatment(newData);
        setLoadingTreatment(false);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      navigation.goBack();
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.visitDate;
    setVisibleDatePicker(false);
    dispatch({type: 'SET_LOADING', value: true});
    getMidwife(currentDate);
    setForm('executionDate', currentDate);
  };

  const onChangeTreatmentFee = item => {
    let price = 0;
    item.map(check => {
      if (check.select) {
        price += check.price;
      }
    });

    setForm('price', price.toString());
  };

  const validation = () => {
    if (!form.childName) return ToastAlert('Silahkan isi Nama Anak Anda');
    if (!form.childBirthDate)
      return ToastAlert('Silahkan pilih tanggal lahir anak terkecil Anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan anda');
    if (!selectMidwifeTime.name)
      return ToastAlert('Silahkan pilih waktu kunjungan Anda');
    if (Object.values(selectTreatment).every(item => item.select === false))
      return ToastAlert('Silahkan pilih treatment Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    const _selectTreatment = formatSelectedId(selectTreatment);
    const implementation_place =
      form.placeExecution == 'Klinik Bidan Amel' ? 'bidan' : 'rumah';
    const implementation_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${selectMidwifeTime.name}`;

    try {
      const res = await Api.post({
        url: 'admin/home-cares',
        body: {
          service_category_id: route.params.id,
          name_son: form.childName,
          birth_date: moments(form.childBirthDate).format('YYYY-MM-DD'),
          implementation_date,
          implementation_place,
          cost: parseInt(form.price),
          pasien_id: dataUser.id,
          practice_schedule_time_id: selectMidwifeTime.id,
          treatments: _selectTreatment,
          is_new: false,
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
            <Input label={'Jenis Layanan'} value={'Homecare'} disable />

            <Gap height={12} />
            <Input
              label={'Nama Anak'}
              value={form.childName}
              onChangeText={value => setForm('childName', value)}
            />

            <Gap height={12} />
            <Input
              style={styles.input}
              label={'Tanggal Lahir Anak Terkecil'}
              value={
                form.childBirthDate
                  ? moments(form.childBirthDate).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              onPress={() => setVisibleChildBirthDate(true)}
              editable={false}
            />

            <Gap height={12} />
            <Input
              label={'Usia Anak'}
              value={form.childAge}
              value={
                form.childBirthDate ? ageCalculation(form.childBirthDate) : '-'
              }
              editable={false}
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

            <Gap height={12} />
            <Input
              label={'Waktu Kunjungan'}
              value={selectMidwifeTime.name}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                if (dataMidwifeTime && dataMidwifeTime.length)
                  setVisibleVisitTime(true);
                else
                  SampleAlert({
                    title: 'Mohon Maaf',
                    message: `Silahkan pilih bidan terlebih dahulu`,
                  });
              }}
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
                  onPress={() => {
                    setForm('placeExecution', item.name);

                    if (item.name == 'Rumah Pasien') setShowDesc(true);
                    else setShowDesc(false);
                  }}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={12} />
            <Text style={styles.label}>{'Treatment'}</Text>
            <FlatList
              data={selectTreatment}
              renderItem={({item}) => (
                <RadioButton
                  key={item.id}
                  type={'rounded'}
                  style={styles.treatment}
                  label={item.name}
                  isActive={item.select}
                  onPress={() => {
                    const position = selectTreatment.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectTreatment[position].select =
                      !selectTreatment[position].select;
                    setIsView(!isView);
                    onChangeTreatmentFee(selectTreatment);
                    setSelectTreatment(selectTreatment);
                  }}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Gap height={12} />
            <Input
              label={'Biaya Treatment'}
              value={form.price}
              disable
              onChangeText={value => setForm('price', value)}
            />

            {showDesc && (
              <Text style={styles.desc}>
                {
                  '*Untuk transport diluar biaya treatment setara tarif ojek online (PP)'
                }
              </Text>
            )}

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {visibleChildBirthDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.childBirthDate ? form.childBirthDate : new Date()}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.childBirthDate;
            setVisibleChildBirthDate(false);
            setForm('childBirthDate', currentDate);
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
          getMidwfieTime(value.id);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Pilih Waktu Kunjungan'}
        visible={visibleVisitTime}
        data={dataMidwifeTime}
        onDismiss={() => setVisibleVisitTime(false)}
        onSelect={value => {
          setVisibleVisitTime(false);
          setSelectMidwifeTime(value);
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

export default AddServicesHomecare;
