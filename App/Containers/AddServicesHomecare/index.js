import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  Loading,
  Modals,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {constants, SampleAlert, ToastAlert, useForm} from '../../Helpers';
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

const AddServicesHomecare = ({navigation}) => {
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
  const [formTreatment, setFormTreatment] = useForm({
    pregnancyMassage: false,
    lactationMassage: false,
    oxytocinMassage: false,
    acupressureMassage: false,
    postpartumMassage: false,
    lactationMassageWithComplaints: false,
    babyMassage: false,
    pediatricBabyMassage: false,
    massagePackage: false,
    babyHaircut: false,
    immunization: false,
    babySpa: false,
    newBornCare: false,
    KF_KN: false,
    circumcision: false,
    pregnantControl: false,
  });
  const [loading, setLoading] = useState(true);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
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
      setLoading(false);
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
      return ToastAlert('Silahkan isi Bidan Anda');
    if (!form.phoneNumber) return ToastAlert('Silahkan isi No. Whatsapp Anda');
    if (Object.values(formTreatment).every(item => item === false))
      return ToastAlert('Silahkan pilih treatment Anda');
    if (!form.price) return ToastAlert('Silahkan isi biaya treatment-nya');

    ToastAlert();
  };

  const onSubmit = async () => {
    try {

    } catch (error) {
      console.log('cek e');
    }
  };

  const renderTreatment = () => {
    return (
      <>
        <Gap height={12} />
        <Text style={styles.label}>{'Treatment'}</Text>
        <View style={styles.containerTreatment}>
          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Pijat Hamil'}
              isActive={formTreatment.pregnancyMassage}
              onPress={() =>
                setFormTreatment(
                  'pregnancyMassage',
                  !formTreatment.pregnancyMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Laktasi'}
              isActive={formTreatment.lactationMassage}
              onPress={() =>
                setFormTreatment(
                  'lactationMassage',
                  !formTreatment.lactationMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Oksitosin'}
              isActive={formTreatment.oxytocinMassage}
              onPress={() =>
                setFormTreatment(
                  'oxytocinMassage',
                  !formTreatment.oxytocinMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Accupressure'}
              isActive={formTreatment.acupressureMassage}
              onPress={() =>
                setFormTreatment(
                  'acupressureMassage',
                  !formTreatment.acupressureMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Nifas'}
              isActive={formTreatment.postpartumMassage}
              onPress={() =>
                setFormTreatment(
                  'postpartumMassage',
                  !formTreatment.postpartumMassage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Pijat Laktasi Dengan Keluhan'}
              isActive={formTreatment.lactationMassageWithComplaints}
              onPress={() =>
                setFormTreatment(
                  'lactationMassageWithComplaints',
                  !formTreatment.lactationMassageWithComplaints,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Massage'}
              isActive={formTreatment.babyMassage}
              onPress={() =>
                setFormTreatment('babyMassage', !formTreatment.babyMassage)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Massage Pediatrik'}
              isActive={formTreatment.pediatricBabyMassage}
              onPress={() =>
                setFormTreatment(
                  'pediatricBabyMassage',
                  !formTreatment.pediatricBabyMassage,
                )
              }
            />
          </View>

          <View style={styles.flex}>
            <RadioButton
              type={'rounded'}
              label={'Paket Pijat'}
              isActive={formTreatment.massagePackage}
              onPress={() =>
                setFormTreatment(
                  'massagePackage',
                  !formTreatment.massagePackage,
                )
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Cukur Rambut Bayi'}
              isActive={formTreatment.babyHaircut}
              onPress={() =>
                setFormTreatment('babyHaircut', !formTreatment.babyHaircut)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Imunisasi'}
              isActive={formTreatment.immunization}
              onPress={() =>
                setFormTreatment('immunization', !formTreatment.immunization)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Baby Spa'}
              isActive={formTreatment.babySpa}
              onPress={() =>
                setFormTreatment('babySpa', !formTreatment.babySpa)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'New Born Care'}
              isActive={formTreatment.newBornCare}
              onPress={() =>
                setFormTreatment('newBornCare', !formTreatment.newBornCare)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'KF & KN'}
              isActive={formTreatment.KF_KN}
              onPress={() => setFormTreatment('KF_KN', !formTreatment.KF_KN)}
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Sunat'}
              isActive={formTreatment.circumcision}
              onPress={() =>
                setFormTreatment('circumcision', !formTreatment.circumcision)
              }
            />

            <Gap height={4} />
            <RadioButton
              type={'rounded'}
              label={'Kontrol Hamil'}
              isActive={formTreatment.pregnantControl}
              onPress={() =>
                setFormTreatment(
                  'pregnantControl',
                  !formTreatment.pregnantControl,
                )
              }
            />
          </View>
        </View>
      </>
    );
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

            {renderTreatment()}

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
    </Container>
  );
};

export default AddServicesHomecare;
