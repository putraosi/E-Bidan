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
  formatTreatment,
  getData,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesHomecare = ({navigation, route}) => {
  const [form, setForm] = useForm({
    childName: '',
    childAge: '',
    executionTime: new Date(),
    executionDate: new Date(),
    placeExecution: 'Klinik Bidan Amel',
    midwife: '',
    price: '0',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
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
    const currentDate = selectedDate || form.executionDate;
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
    if (!form.childAge) return ToastAlert('Silahkan isi Usia Anak Anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan anda');
    if (Object.values(selectTreatment).every(item => item.select === false))
      return ToastAlert('Silahkan pilih treatment Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    const _selectTreatment = formatSelectedId(selectTreatment);
    const implementation_place =
      form.placeExecution == 'Klinik Bidan Amel' ? 'bidan' : 'rumah';
    const implementation_date = `${moments(form.executionDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.executionTime).format('HH:mm:ss')}`;

    try {
      const res = await Api.post({
        url: 'admin/home-cares',
        body: {
          service_category_id: route.params.id,
          name_son: form.childName,
          age_son: parseInt(form.childAge),
          implementation_date,
          implementation_place,
          cost: parseInt(form.price),
          pasien_id: dataUser.id,
          bidan_id: selectMidwife.id,
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
              label={'Usia Anak'}
              value={form.childAge}
              keyboardType={'numeric'}
              onChangeText={value => setForm('childAge', value)}
            />

            <Gap height={12} />
            <Input
              label={'Tanggal Kunjungan'}
              value={moments(form.executionDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePicker(true)}
            />
            <Gap height={12} />
            <Input
              label={'Waktu Kunjungan'}
              value={moments(form.executionTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleTimePicker(true)}
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
            <Input
              label={'Bidan'}
              value={selectMidwife.name}
              editable={false}
              onPress={() => {
                if (dataMidwife && dataMidwife.length) setVisibleMidwife(true);
                else
                  SampleAlert({
                    title: 'Mohon Maaf',
                    message: `Pada tanggal ${moments(form.executionDate).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  });
              }}
            />

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

            {showDesc && (
              <Text style={styles.desc}>
                {
                  '*Untuk transport diluar biaya treatment setara tarif ojek online (PP)'
                }
              </Text>
            )}

            <Gap height={12} />
            <Input
              label={'Biaya Treatment'}
              value={form.price}
              disable
              onChangeText={value => setForm('price', value)}
            />

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.executionDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {visibleTimePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.executionTime}
          mode={'time'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.executionTime;
            setVisibleTimePicker(false);
            setForm('executionTime', currentDate);
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

export default AddServicesHomecare;
