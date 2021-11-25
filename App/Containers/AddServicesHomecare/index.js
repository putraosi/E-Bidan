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

const userBidanDummy = [
  {id: 1, name: 'Bidan 1'},
  {id: 2, name: 'Bidan 2'},
  {id: 3, name: 'Bidan 3'},
];

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesHomecare = ({navigation, route}) => {
  const [form, setForm] = useForm({
    motherName: '',
    childName: '',
    childAge: '',
    address: '',
    executionTime: new Date(),
    placeExecution: 'Klinik Bidan Amel',
    midwife: '',
    phoneNumber: '',
    price: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [selectTreatment, setSelectTreatment] = useState(null);
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
    const currentDate = selectedDate || form.executionTime;
    setVisibleDatePicker(false);
    dispatch({type: 'SET_LOADING', value: true});
    getMidwife(currentDate);
    setForm('executionTime', currentDate);
  };

  const validation = () => {
    if (!form.motherName) return ToastAlert('Silahkan isi Nama Ibu Anda');
    if (!form.childName) return ToastAlert('Silahkan isi Nama Anak Anda');
    if (!form.childAge) return ToastAlert('Silahkan isi Usia Anak Anda');
    if (!form.address) return ToastAlert('Silahkan isi Alamat Anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan anda');
    if (!form.phoneNumber) return ToastAlert('Silahkan isi No. Whatsapp Anda');
    if (Object.values(selectTreatment).every(item => item.select === false))
      return ToastAlert('Silahkan pilih treatment Anda');
    if (!form.price) return ToastAlert('Silahkan isi biaya treatment-nya');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    const _selectTreatment = formatSelectedId(selectTreatment);
    const implementation_place =
      form.placeExecution == 'Klinik Bidan Amel' ? 'bidan' : 'rumah';

    try {
      const res = await Api.post({
        url: 'admin/home-cares',
        body: {
          service_category_id: route.params.id,
          pasien_id: dataUser.id,
          bidan_id: selectMidwife.id,
          name_mother: form.motherName,
          name_son: form.childName,
          age_son: parseInt(form.childAge),
          address: form.address,
          implementation_date: moments(form.executionTime).format('YYYY-MM-DD'),
          implementation_place,
          phone: form.phoneNumber,
          cost: parseInt(form.price),
          treatments: _selectTreatment,
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
      {loading || loadingTreatment ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={'Jenis Layanan'}
              value={'Homecare'}
              editable={false}
            />

            <Gap height={12} />
            <Input
              label={'Nama Ibu'}
              value={form.motherName}
              onChangeText={value => setForm('motherName', value)}
            />

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
              label={'Alamat'}
              value={form.address}
              multiline
              onChangeText={value => setForm('address', value)}
            />

            <Gap height={12} />
            <Input
              label={'Waktu Pelaksanaan'}
              value={moments(form.executionTime).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePicker(true)}
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
                  onPress={() => setForm('placeExecution', item.name)}
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
                  SampleAlert(
                    'Mohon Maaf',
                    `Pada tanggal ${moments(form.executionTime).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  );
              }}
            />

            <Gap height={12} />
            <Input
              label={'No. Whatsapp'}
              value={form.phoneNumber}
              keyboardType={'numeric'}
              onChangeText={value => setForm('phoneNumber', value)}
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
              keyboardType={'numeric'}
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
          value={form.executionTime}
          mode={'date'}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <Modals
        type={'spinner'}
        title={'Bidan'}
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
