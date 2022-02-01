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
  formatSelect,
  formatSelectedId,
  rupiah,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defaultEmpty = {
  id: 0,
  name: '',
};

const AddServicesKB = ({navigation, route}) => {
  const oldData = route.params.data;
  const [form, setForm] = useForm({
    child: oldData ? oldData.bookingable.total_child.toString() : '',
    childBirthDate: oldData
      ? new Date(moments(oldData.bookingable.birth_date).format('YYYY-MM-DD'))
      : '',
    status: oldData ? oldData.bookingable.status_use : '',
    method: oldData ? oldData.bookingable.method_use : '',
    breastfeed: oldData ? oldData.bookingable.is_breast_feed == 1 : '',
    otherDiseaseHistory: '',
    lastDateMenstruation: oldData
      ? new Date(
          moments(oldData.bookingable.date_last_haid).format('YYYY-MM-DD'),
        )
      : '',
    visitDate: oldData ? new Date(oldData.bookingable.visit_date) : new Date(),
    isUpdate: route.params.data ? true : false,
  });

  const [loading, setLoading] = useState(true);
  const [loadingTypeKB, setLoadingTypeKB] = useState(true);
  const [loadingDiseaseHistory, setLoadingDiseaseHistory] = useState(true);
  const [visibleChildBirthDate, setVisibleChildBirthDate] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleLastDateMenstruation, setVisibleLastDateMenstruation] =
    useState(false);
  const [visibleVisitDate, setVisibleVisitDate] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [dataMidwifeTime, setDataMidwifeTime] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defaultEmpty);
  const [selectMidwifeTime, setSelectMidwifeTime] = useState(defaultEmpty);
  const [selectDiseaseHistory, setSelectDiseaseHistory] = useState([]);
  const [price, setPrice] = useState('');
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.data) {
      const item = route.params.data;

      const midwfie = {
        id: item.practice_schedule_time.practice_schedule_detail.id,
        name: item.practice_schedule_time.practice_schedule_detail.bidan.name,
      };

      const time = {
        id: item.practice_schedule_time.id,
        name: item.practice_schedule_time.practice_time,
      };

      getMidwife(item.bookingable.visit_date, true);
      getMidwifeTime(item.practice_schedule_time.practice_schedule_detail.id);
      setSelectMidwife(midwfie);
      setSelectMidwifeTime(time);
    } else {
      getMidwife(new Date());
    }

    getDiseasehistory();
    getTypeKB();
  }, []);

  const getMidwife = async (date, isPrevious) => {
    try {
      const res = await Api.post({
        url: 'self/show-schedules',
        body: {
          visit_date: moments(date).format('YYYY-MM-DD'),
        },
      });

      const newData = formatMidwife(res);
      setDataMidwife(newData);

      if (!isPrevious) {
        setSelectMidwife(defaultEmpty);
        setSelectMidwifeTime(defaultEmpty);
      }

      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
      setDataMidwife([]);

      if (!isPrevious) {
        setSelectMidwife(defaultEmpty);
        setSelectMidwifeTime(defaultEmpty);
      }
    }
  };

  const getMidwifeTime = async id => {
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

  const getTypeKB = async () => {
    try {
      const res = await Api.get({
        url: 'self/method-uses',
      });

      // if (route.params.data) {
      //   const position = formated.findIndex(
      //     obj => obj.id == route.params.data.bookingable.method_use_ids,
      //   );
      //   formated[position].select = !formated[position].select;
      //   onChangePrice(formated);
      // }

      let formated = formatSelect(res);
      setSelectType(formated);
      setLoadingTypeKB(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const getDiseasehistory = async () => {
    try {
      const res = await Api.get({
        url: 'self/disease-histories',
      });

      if (res) {
        const formated = formatSelect(res, true);
        setSelectDiseaseHistory(formated);
        setLoadingDiseaseHistory(false);
      } else setLoadingDiseaseHistory(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const validation = () => {
    const position = selectDiseaseHistory.findIndex(
      obj => obj.name == 'Lainnya',
    );

    if (!form.child) return ToastAlert('Silahkan isi jumlah anak  Anda');
    if (!form.childBirthDate)
      return ToastAlert('Silahkan pilih tanggal lahir anak terkecil Anda');
    if (Object.values(selectType).every(item => item.select === false))
      return ToastAlert('Silahkan pilih cara KB Anda');
    if (!form.status) return ToastAlert('Silahkan pilih status pengguna Anda');
    if (selectDiseaseHistory[position].select && !form.otherDiseaseHistory) {
      return ToastAlert('Silahkan isi riwayat penyakit Anda');
    }
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');
    if (!selectMidwifeTime.name)
      return ToastAlert('Silahkan pilih waktu kunjungan Anda');

    setBody();
  };

  const setBody = () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const visit_date = `${moments(form.visitDate).format('YYYY-MM-DD')} ${
        selectMidwifeTime.name
      }`;
      let disease_history_family_name = form.otherDiseaseHistory;
      const disease_history_family_ids = formatSelectedId(selectDiseaseHistory);
      const method_use_ids = formatSelectedId(selectType);
      const date_last_haid = form.lastDateMenstruation
        ? moments(form.lastDateMenstruation).format('YYYY-MM-DD')
        : '';
      const is_breast_feed = form.breastfeed ? true : false;

      if (disease_history_family_ids.length == 0)
        disease_history_family_name = '';

      const body = {
        service_category_id: route.params.id,
        disease_history_family_ids,
        date_last_haid,
        total_child: parseInt(form.child),
        status_use: form.status,
        birth_date: moments(form.childBirthDate).format('YYYY-MM-DD'),
        method_use_ids,
        is_breast_feed,
        practice_schedule_time_id: selectMidwifeTime.id,
        pasien_id: route.params.userId,
        visit_date,
        disease_history_family_name,
        cost: parseInt(price),
      };

      if (form.isUpdate) {
        onUpdate(body);
      } else onSubmit(body);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
    }
  };

  const onSubmit = async body => {
    try {
      await Api.post({
        url: 'admin/family-plannings',
        body,
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert(error.message);
    }
  };

  const onUpdate = async body => {
    try {
      await Api.put({
        url: `admin/family-plannings/${route.params.data.bookingable.id}`,
        body,
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert(error.message);
    }
  };

  const onChangePrice = item => {
    let _price = 0;
    item.map(check => {
      if (check.select) {
        _price += check.price;
      }
    });

    setPrice(_price.toString());
  };

  // User Interface
  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      {loading || loadingDiseaseHistory || loadingTypeKB ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={'Jenis Layanan'}
              value={'Keluraga Berencana (KB)'}
              disable
            />

            <Input
              style={styles.input}
              label={'Jumlah Anak'}
              value={form.child}
              keyboardType={'numeric'}
              onChangeText={value => setForm('child', value)}
            />

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

            <Input
              style={styles.input}
              label={'Umur Anak Terkecil'}
              value={
                form.childBirthDate ? ageCalculation(form.childBirthDate) : '-'
              }
              editable={false}
            />

            <Text style={styles.label}>{'Cara KB'}</Text>
            <FlatList
              data={selectType}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  onPress={() => {
                    const position = selectType.findIndex(
                      obj => obj.id == item.id,
                    );

                    selectType[position].select = !selectType[position].select;
                    onChangePrice(selectType);
                    setSelectType(selectType);
                  }}
                />
              )}
              scrollEnabled={false}
              numColumns={2}
            />

            <Input
              style={styles.inputSecond}
              label={'Biaya'}
              value={`Rp${rupiah(price)}`}
              disable
            />

            <Text style={styles.label}>{'Status Pengguna'}</Text>
            <FlatList
              data={constants.SELECT_STATUS_KB}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.status}
                  onPress={() => setForm('status', item.name)}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Input
              style={styles.inputSecond}
              label={'Tanggal Terakhir Haid'}
              value={
                form.lastDateMenstruation
                  ? moments(form.lastDateMenstruation).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleLastDateMenstruation(true)}
            />

            <Text style={styles.label}>{'Menyusui'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_YES_OR_NO.map(item => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.value == form.breastfeed}
                  onPress={() => setForm('breastfeed', item.value)}
                />
              ))}
            </SpaceBeetwen>

            <Text style={styles.label}>{'Riwayat Penyakit'}</Text>
            <FlatList
              data={selectDiseaseHistory}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  other={form.otherDiseaseHistory}
                  onChangeText={value => setForm('otherDiseaseHistory', value)}
                  onPress={() => {
                    const position = selectDiseaseHistory.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectDiseaseHistory[position].select =
                      !selectDiseaseHistory[position].select;
                    setIsView(!isView);
                    setSelectDiseaseHistory(selectDiseaseHistory);
                  }}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
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
              label={'Bidan'}
              value={selectMidwife.name}
              placeholder={'Pilih'}
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

            <Input
              style={styles.input}
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

            <Gap height={20} />
            <Button
              label={form.isUpdate ? 'Simpan Perubahan' : 'Submit'}
              onPress={validation}
            />
          </View>
        </ScrollView>
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
          getMidwifeTime(value.id);
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
        desc={
          form.isUpdate
            ? 'Selamat anda telah berhasil\nmemperbaharui layanan'
            : 'Selamat anda telah berhasil\nmendaftar di layanan kami'
        }
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />

      {visibleLastDateMenstruation && (
        <DatePicker
          testID="dateTimePicker"
          value={
            form.lastDateMenstruation ? form.lastDateMenstruation : new Date()
          }
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.lastDateMenstruation;
            setVisibleLastDateMenstruation(false);
            setForm('lastDateMenstruation', currentDate);
          }}
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

      {visibleVisitDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setVisibleVisitDate(false);

            if (event.type == 'set') {
              const currentDate = selectedDate || form.visitDate;
              dispatch({type: 'SET_LOADING', value: true});
              getMidwife(currentDate);
              setForm('visitDate', currentDate);
            }
          }}
        />
      )}

      {isView && <View />}
    </Container>
  );
};

export default AddServicesKB;
