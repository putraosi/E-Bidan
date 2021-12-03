import DatePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
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
  SpaceBeetwen
} from '../../Components';
import { constants, SampleAlert, ToastAlert, useForm } from '../../Helpers';
import { moments } from '../../Libs';
import { Api } from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesReferral = ({navigation, route}) => {
  const [form, setForm] = useForm({
    referenceDate: new Date(),
    motherName: '',
    fatherName: '',
    motherAge: '',
    address: '',
    phoneNumber: '',
    diagnosis: '',
    hospital: '',
    visitDate: new Date(),
    option: 'Pendamping',
  });

  const [loading, setLoading] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [visibleReferenceDate, setVisibleReferenceDate] = useState(false);
  const [visibleDatePickerVisitDate, setVisibleDatePickerVisitDate] =
    useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMidwife(new Date());
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

  const validation = () => {
    if (!form.motherName) return ToastAlert('Silahkan isi nama ibu anda');
    if (!form.fatherName) return ToastAlert('Silahkan isi nama ayah anda');
    if (!form.motherAge) return ToastAlert('Silahkan isi usia ibu anda');
    if (!form.address) return ToastAlert('Silahkan isi alamat anda');
    if (
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor no. whatsapp valid Anda');
    }
    if (!form.diagnosis) return ToastAlert('Silahkan isi diagnosa anda');
    if (!form.hospital)
      return ToastAlert('Silahkan isi rumah sakit rujukan anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const res = await Api.post({
        url: 'admin/referral-services',
        body: {
          service_category_id: route.params.id,
          reference_date: moments(form.referenceDate).format('YYYY-MM-DD'),
          name: form.motherName,
          age_mom: parseInt(form.motherAge),
          spouse: form.fatherName,
          address: form.address,
          phone: form.phoneNumber,
          referral_diagnosis: form.diagnosis,
          hospital_referral: form.hospital,
          option: form.option.toLowerCase(),
          bidan_id: selectMidwife.id,
          pasien_id: route.params.userId,
          visit_date: moments(form.visitDate).format('YYYY-MM-DD'),
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
            <Input
              label={'Jenis Layanan'}
              value={'Pelayanan Rujukan'}
              disable
            />

            <Gap height={12} />
            <Input
              label={'Tanggal Persalinan'}
              value={moments(form.referenceDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleReferenceDate(true)}
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
              label={'Usia Ibu'}
              value={form.motherAge}
              keyboardType={'numeric'}
              onChangeText={value => setForm('motherAge', value)}
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
              label={'Diagnosa Masuk'}
              value={form.diagnosis}
              onChangeText={value => setForm('diagnosis', value)}
            />

            <Gap height={12} />
            <Input
              label={'Rumah Sakit Rujukan'}
              value={form.hospital}
              onChangeText={value => setForm('hospital', value)}
            />

            <Gap height={12} />
            <Input
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePickerVisitDate(true)}
            />

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
                    `Pada tanggal ${moments(form.visitDate).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  );
              }}
            />

            <Gap height={12} />
            <Text style={styles.label}>{'Opsi'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_OPTION.map(item => (
                <RadioButton
                  key={item.id}
                  style={styles.flex}
                  label={item.name}
                  isActive={item.name == form.option}
                  onPress={() => setForm('option', item.name)}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      {visibleReferenceDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.referenceDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.referenceDate;
            setVisibleReferenceDate(false);
            setForm('referenceDate', currentDate);
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
    </Container>
  );
};

export default AddServicesReferral;
