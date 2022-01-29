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
  formatMidwife,
  formatMidwifeTime,
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

const defaultEmpty = {
  id: 0,
  name: '',
};

const AddServicesOther = ({navigation, route}) => {
  const [form, setForm] = useForm({
    date: route.params.data
      ? new Date(
          moments(route.params.data.bookingable.visit_date).format(
            'YYYY-MM-DD',
          ),
        )
      : new Date(),
    name: route.params.data ? route.params.data.bookingable.name : '',
    birthDate: route.params.data
      ? route.params.data.bookingable.birth_date
      : '',
    isUpdate: route.params.data ? true : false,
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibelBirthDate, setVisibelBirthDate] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [dataMidwifeTime, setDataMidwifeTime] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defaultEmpty);
  const [selectMidwifeTime, setSelectMidwifeTime] = useState(defaultEmpty);
  const [selectTreatment, setSelectTreatment] = useState(null);
  const [price, setPrice] = useState(0);
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
    });
    getTreatments();

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
        url: 'admin/other-category-services',
      });

      if (res) {
        const oldData = route.params.data
          ? route.params.data.bookingable.other_service_other_category_services
          : null;

        const formated = formatSelect(res, true, oldData);

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
    if (!selectMidwifeTime.name)
      return ToastAlert('Silahkan pilih waktu kunjungan Anda');
    if (Object.values(selectTreatment).every(item => item.select === false))
      return ToastAlert('Silahkan pilih treatment Anda');

    setBody();
  };

  const setBody = () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const visit_date = `${moments(form.date).format('YYYY-MM-DD')} ${
        selectMidwifeTime.name
      }`;
      const other_category_service_ids = formatSelectedId(selectTreatment);

      const body = {
        service_category_id: route.params.id,
        name: form.name,
        age: ageCalculation(form.birthDate),
        other_category_service_ids,
        practice_schedule_time_id: selectMidwifeTime.id,
        pasien_id: dataUser.id,
        visit_date,
        cost: parseInt(price || 0),
        birth_date: moments(form.birthDate).format('YYYY-MM-DD'),
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
        url: 'admin/other-services',
        body,
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
    }
  };

  const onUpdate = async body => {
    try {
      await Api.put({
        url: `admin/other-services/${route.params.data.bookingable.id}`,
        body,
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
            <Button
              label={form.isUpdate ? 'Simpan Perubahan' : 'Submit'}
              onPress={validation}
            />
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
            setVisibleDate(false);

            if (event.type == 'set') {
              const currentDate = selectedDate || form.date;
              dispatch({type: 'SET_LOADING', value: true});
              getMidwife(currentDate);
              setForm('date', currentDate);
            }
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
          dispatch({type: 'SET_LOADING', value: true});
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
