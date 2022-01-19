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
  constants,
  formatMidwife,
  formatMidwifeTime,
  formatSelect,
  formatSelectedId,
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

const AddServicesImmunization = ({navigation, route}) => {
  const [form, setForm] = useForm({
    name: '',
    gender: 'Laki-Laki',
    birthday: new Date(),
    birthPlace: {
      id: 0,
      name: '',
    },
    birthPlaceName: '',
    birthWeight: '',
    immunizationTypeName: '',
    visitDate: new Date(),
    typeDescription: '',
    birthType: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTypeImmunization, setLoadingTypeImmunization] = useState(true);
  const [loadingMidwife, setLoadingMidwife] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [dataMidwifeTime, setDataMidwifeTime] = useState([]);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [visibleDatePickerVisitDate, setVisibleDatePickerVisitDate] =
    useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectTypeImmunization, setSelectTypeImmunization] = useState(
    constants.SELECT_TYPE_IMMUNIZATION,
  );
  const [selectBirthPlace, setSelectBirthPlace] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defaultEmpty);
  const [selectMidwifeTime, setSelectMidwifeTime] = useState(defaultEmpty);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [price, setPrice] = useState(0);
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getBirthPlace();
    getTypeImmunization();
    getMidwife(new Date());
  }, []);

  const getBirthPlace = async () => {
    try {
      const res = await Api.get({
        url: 'admin/birth-places',
      });

      if (res) {
        let newData = res;
        newData.push({
          id: 999,
          name: 'Lainnya',
        });

        setSelectBirthPlace(newData);
        setLoading(false);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      navigation.goBack();
    }
  };

  const getTypeImmunization = async () => {
    try {
      const res = await Api.get({
        url: 'self/immunization-types',
      });

      if (res) {
        const formated = formatSelect(res, false);

        setSelectTypeImmunization(formated);
        setLoadingTypeImmunization(false);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      navigation.goBack();
    }
  };

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
      setLoadingMidwife(false);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setLoadingMidwife(false);
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

  const validation = () => {
    if (!form.name) return ToastAlert('Silahkan isi nama Anda');
    if (
      !form.birthPlace.name ||
      (form.birthPlace.name == 'Lainnya' && !form.birthPlaceName)
    )
      return ToastAlert('Silahkan pilih atau isi tempat lahir Anda');
    if (!form.birthWeight)
      return ToastAlert('Silahkan isi berat lahir bayi Anda');
    if (
      Object.values(selectTypeImmunization).every(item => item.select === false)
    )
      return ToastAlert('Silahkan pilih jenis imunisasi Anda');
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');
    if (!selectMidwifeTime.name)
      return ToastAlert('Silahkan pilih waktu kunjungan Anda');
    if (!form.birthType)
      return ToastAlert('Silahkan pilih jenis persalinan Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const immunizationId = formatSelectedId(selectTypeImmunization);
    const _birthPlaceName =
      form.birthPlace.name == 'Lainnya' ? form.birthPlaceName : '';
    const visit_date = `${moments(form.visitDate).format('YYYY-MM-DD')} ${
      selectMidwifeTime.name
    }`;

    try {
      await Api.post({
        url: 'admin/immunizations',
        body: {
          name: form.name,
          gender: form.gender.toLowerCase(),
          birth_date: moments(form.birthday).format('YYYY-MM-DD'),
          birth_place_id: parseInt(form.birthPlace.id),
          birth_weight: form.birthWeight,
          visit_date,
          pasien_id: route.params.userId,
          practice_schedule_time_id: selectMidwifeTime.id,
          service_category_id: route.params.id,
          immunization_types: immunizationId,
          birth_place_name: _birthPlaceName,
          immunization_type_name: '',
          maternity_type: form.birthType.toLowerCase(),
          is_new: false,
        },
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
      {loading || loadingTypeImmunization || loadingMidwife ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input label={'Jenis Layanan'} value={'Imunisasi'} disable />

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
            <Text style={styles.label}>{'Tempat Lahir'}</Text>
            <FlatList
              data={selectBirthPlace}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.birthPlace.name}
                  other={form.birthPlaceName}
                  onChangeText={value => setForm('birthPlaceName', value)}
                  onPress={() => setForm('birthPlace', item)}
                />
              )}
              scrollEnabled={false}
              numColumns={2}
            />

            <Gap height={12} />
            <Input
              label={'Berat Lahir (Kg)'}
              value={form.birthWeight}
              keyboardType={'numeric'}
              onChangeText={value => setForm('birthWeight', value)}
            />

            <Gap height={12} />
            <Text style={styles.label}>{'Jenis Immunisasi'}</Text>
            <FlatList
              data={selectTypeImmunization}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  other={form.immunizationTypeName}
                  onChangeText={value => setForm('immunizationTypeName', value)}
                  onPress={() => {
                    const position = selectTypeImmunization.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectTypeImmunization[position].select =
                      !selectTypeImmunization[position].select;
                    setIsView(!isView);
                    const _price = onPrice(selectTypeImmunization);
                    setPrice(_price);
                    setSelectTypeImmunization(selectTypeImmunization);
                  }}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Gap height={8} />
            <Input label={'Biaya'} value={`Rp${rupiah(price)}`} disable />

            <Input
              style={styles.input}
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePickerVisitDate(true)}
            />

            <Gap height={12} />
            <Input
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

            <Gap height={12} />
            <Text style={styles.label}>{'Jenis Persalinan/Cara Lahir'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_BIRTH_TYPE.map(item => (
                <RadioButton
                  key={item.id}
                  style={styles.flex}
                  label={item.name}
                  isActive={item.name == form.birthType}
                  onPress={() => setForm('birthType', item.name)}
                />
              ))}
            </SpaceBeetwen>

            <Text style={styles.desc}>{'*Coming Soon!'}</Text>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

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
            setVisibleDatePickerVisitDate(false);

            if (event.type == 'set') {
              const currentDate = selectedDate || form.visitDate;
              dispatch({type: 'SET_LOADING', value: true});
              getMidwife(currentDate);
              setForm('visitDate', currentDate);
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

export default AddServicesImmunization;
