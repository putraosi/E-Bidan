import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
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
} from '../../Components';
import {getData, SampleAlert, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesOther = ({navigation, route}) => {
  const [form, setForm] = useForm({
    date: new Date(),
    name: '',
    age: '',
    motherName: '',
    fatherName: '',
    address: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [selectTreatment, setSelectTreatment] = useState(null);
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
        url: 'admin/other-services',
      });

      // if (res) {
      //   const newData = formatTreatment(res);
      //   setSelectTreatment(newData);
      //   setLoadingTreatment(false);
      // } else {
      //   navigation.goBack();
      // }
    } catch (error) {
      navigation.goBack();
    }
  };

  const validation = () => {
    if (!form.name) return ToastAlert('Silahkan isi nama anda');
    if (!form.age) return ToastAlert('Silahkan isi usia anda');
    if (!form.motherName) return ToastAlert('Silahkan isi nama ibu anda');
    if (!form.fatherName) return ToastAlert('Silahkan isi nama ayah anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    if (
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor no. whatsapp valid Anda');
    }

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const res = await Api.post({
        url: 'admin/other-services',
        body: {
          service_category_id: route.params.id,
          pasien_id: dataUser.id,
          bidan_id: selectMidwife.id,
          name: form.name,
          age: form.age,
          name_mother: form.motherName,
          spouse: form.fatherName,
          address: form.address,
          phone_wa: form.phoneNumber,
          visit_date: form.date,
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
            <Input label={'Jenis Layanan'} value={'Lainnya'} disable />

            <Gap height={12} />
            <Input
              label={'Nama'}
              value={form.name}
              onChangeText={value => setForm('name', value)}
            />

            <Gap height={12} />
            <Input
              label={'Usia'}
              value={form.age}
              keyboardType={'numeric'}
              onChangeText={value => setForm('age', value)}
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
              label={'Alamat'}
              value={form.address}
              multiline
              onChangeText={value => setForm('address', value)}
            />

            <Gap height={12} />
            <Input
              label={'No. Whatsapp'}
              value={form.phoneNumber}
              keyboardType={'numeric'}
              onChangeText={value => setForm('phoneNumber', value)}
            />

            <Gap height={12} />
            <Input
              label={'Tanggal Kunjungan'}
              value={moments(form.date).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDate(true)}
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
                    message: `Pada tanggal ${moments(form.date).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  });
              }}
            />

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
    </Container>
  );
};

export default AddServicesOther;
