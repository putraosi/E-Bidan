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
  formatSelectedId,
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
    visitTime: new Date(),
    typeDescription: '',
    birthType: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTypeImmunization, setLoadingTypeImmunization] = useState(true);
  const [loadingMidwife, setLoadingMidwife] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  const [visibleDatePickerVisitDate, setVisibleDatePickerVisitDate] =
    useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectTypeImmunization, setSelectTypeImmunization] = useState(
    constants.SELECT_TYPE_IMMUNIZATION,
  );
  const [selectBirthPlace, setSelectBirthPlace] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
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
        url: 'admin/immunization-types',
      });

      if (res) {
        let newData = res;
        newData.push({
          id: 999,
          name: 'Lainnya',
        });

        newData = newData.map(item => {
          let newItem = item;
          newItem.select = false;
          return newItem;
        });

        setSelectTypeImmunization(newData);
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
      const res = await Api.get({
        url: 'admin/practice-schedulles',
        params: {
          now: moments(date).format('YYYY-MM-DD'),
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setLoadingMidwife(false);
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

    const position = selectTypeImmunization.findIndex(
      obj => obj.name == 'Lainnya',
    );

    if (selectTypeImmunization[position].select && !form.immunizationTypeName) {
      return ToastAlert('Silahkan isi jenis imunisasi Anda');
    }

    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');
    if (!form.birthType)
      return ToastAlert('Silahkan pilih jenis persalinan Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const position = selectTypeImmunization.findIndex(
      obj => obj.name == 'Lainnya',
    );

    const immunizationId = formatSelectedId(selectTypeImmunization);
    const _birthPlaceName =
      form.birthPlace.name == 'Lainnya' ? form.birthPlaceName : '';
    const immunization_type_name = selectTypeImmunization[position].select
      ? form.immunizationTypeName
      : '';
    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;

    const body = {
      name: form.name,
      gender: form.gender.toLowerCase(),
      birth_date: moments(form.birthday).format('YYYY-MM-DD'),
      birth_place_id: parseInt(form.birthPlace.id),
      birth_weight: form.birthWeight,
      visit_date,
      pasien_id: route.params.userId,
      bidan_id: selectMidwife.id,
      service_category_id: route.params.id,
      immunization_types: immunizationId,
      birth_place_name: _birthPlaceName,
      immunization_type_name,
      maternity_type: form.birthType,
      is_new: true,
    };

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
          bidan_id: selectMidwife.id,
          service_category_id: route.params.id,
          immunization_types: immunizationId,
          birth_place_name: _birthPlaceName,
          immunization_type_name,
          maternity_type: form.birthType.toLowerCase(),
          is_new: true,
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
              label={'Berat Lahir'}
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
                    setSelectTypeImmunization(selectTypeImmunization);
                  }}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Gap height={8} />
            <Input
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePickerVisitDate(true)}
            />

            <Gap height={12} />
            <Input
              label={'Waktu Kunjungan'}
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleTimePicker(true)}
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
            const currentDate = selectedDate || form.visitDate;
            setVisibleDatePickerVisitDate(false);
            dispatch({type: 'SET_LOADING', value: true});
            getMidwife(currentDate);
            setForm('visitDate', currentDate);
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

      {isView && <View />}
    </Container>
  );
};

export default AddServicesImmunization;
