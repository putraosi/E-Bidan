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
import {
  constants,
  formatSelectedGrouped,
  SampleAlert,
  ToastAlert,
  useForm
} from '../../Helpers';
import { moments } from '../../Libs';
import { Api } from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: 'Pilih',
};

const AddServicesAntenatal = ({navigation, route}) => {
  const [form, setForm] = useForm({
    phoneNumber: '',
    pregnancy: 'Pilih',
    abortion: 'Pilih',
    pregnancyAge: '1 Minggu',
    visitDate: new Date(),
    remark: 'K1',
  });

  const [loading, setLoading] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [visiblePregnancy, setVisiblePregnancy] = useState(false);
  const [visibleAbortion, setVisibleAbortion] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibelPregnancyAge, setVisibelPregnancyAge] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectHistory, setSelectHistory] = useState(
    constants.SELECT_ANTENATAL_HISTORY,
  );
  const [selectInformation, setSelectInformation] = useState(
    constants.SELECT_ANTENATAL_INFORMATION,
  );
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [isView, setIsView] = useState(false);
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
    if (
      form.phoneNumber.length < 9 ||
      form.phoneNumber.length > 14 ||
      form.phoneNumber.charAt(0) != 0 ||
      form.phoneNumber.charAt(1) != 8
    ) {
      return ToastAlert('Silahkan masukan nomor no. whatsapp valid Anda');
    }
    if (form.pregnancy == 'Pilih')
      return ToastAlert('Silahkan pilih kehamilan ke berapa Anda');
    if (form.abortion == 'Pilih')
      return ToastAlert('Silahkan pilih abortus Anda');
    if (selectMidwife.name == 'Pilih')
      return ToastAlert('Silahkan pilih bidan Anda');
    if (Object.values(selectHistory).every(item => item.select === false))
      return ToastAlert('Silahkan pilih riwayat persalinan Anda');
    if (Object.values(selectInformation).every(item => item.select === false))
      return ToastAlert('Silahkan pilih keterangan Anda');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    let abortus = form.abortion;
    const labor_history = formatSelectedGrouped(selectHistory);
    const remarks = formatSelectedGrouped(selectInformation);

    if (abortus == 'Tidak Pernah') abortus = 0;

    try {
      const res = await Api.post({
        url: 'admin/antenatals',
        body: {
          service_category_id: route.params.id,
          pasien_id: route.params.userId,
          bidan_id: selectMidwife.id,
          phone_wa: form.phoneNumber,
          pregnancy: parseInt(form.pregnancy),
          abortus: parseInt(abortus),
          gestational_age: form.pregnancyAge,
          visit_date: moments(form.visitDate).format('YYYY-MM-DD'),
          labor_history,
          remarks,
        },
        showLog: true,
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
              value={'Antenatal (Pemeriksaan Kehamilan)'}
              editable={false}
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
              label={'Kehamilan Ke'}
              value={form.pregnancy}
              editable={false}
              onPress={() => setVisiblePregnancy(true)}
            />

            <Gap height={8} />
            <Input
              label={'Abortus'}
              value={form.abortion}
              editable={false}
              onPress={() => setVisibleAbortion(true)}
            />

            <Gap height={8} />
            <Input
              label={'Perkiraan Usia Kehamilaan Saat Kunjungan'}
              value={form.pregnancyAge}
              editable={false}
              onPress={() => setVisibelPregnancyAge(true)}
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
                  SampleAlert(
                    'Mohon Maaf',
                    `Pada tanggal ${moments(form.visitDate).format(
                      'DD MMMM YYYY',
                    )} tidak ada jadwal praktek.\n\nSilahkan pilih tanggal yang lain.`,
                  );
              }}
            />

            <Gap height={12} />
            <Text style={styles.label}>{'Riwayat Persalinan'}</Text>
            <SpaceBeetwen>
              {selectHistory.map(item => (
                <RadioButton
                  key={item.id}
                  style={styles.flex}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  onPress={() => {
                    const position = selectHistory.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectHistory[position].select =
                      !selectHistory[position].select;
                    setIsView(!isView);
                    setSelectHistory(selectHistory);
                  }}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={12} />
            <Text style={styles.label}>{'Keterangan'}</Text>
            <SpaceBeetwen>
              {selectInformation.map(item => (
                <RadioButton
                  key={item.id}
                  style={styles.flex}
                  type={'rounded'}
                  label={item.name}
                  isActive={item.select}
                  onPress={() => {
                    const position = selectInformation.findIndex(
                      obj => obj.id == item.id,
                    );
                    selectInformation[position].select =
                      !selectInformation[position].select;
                    setIsView(!isView);
                    setSelectInformation(selectInformation);
                  }}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      <Modals
        type={'spinner'}
        title={'Kehamilan Ke'}
        visible={visiblePregnancy}
        data={constants.SELECT_PREGNANCY}
        onDismiss={() => setVisiblePregnancy(false)}
        onSelect={value => {
          setVisiblePregnancy(false);
          setForm('pregnancy', value.name);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Abortus'}
        visible={visibleAbortion}
        data={constants.SELECT_ABORTION}
        onDismiss={() => setVisibleAbortion(false)}
        onSelect={value => {
          setVisibleAbortion(false);
          setForm('abortion', value.name);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Perkiraan Usi Kehamilan'}
        visible={visibelPregnancyAge}
        data={constants.SELECT_GESTATIONAL_AGE}
        onDismiss={() => setVisibelPregnancyAge(false)}
        onSelect={value => {
          setVisibelPregnancyAge(false);
          setForm('pregnancyAge', value.name);
        }}
      />

      {visibleDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitDate;
            setVisibleDatePicker(false);
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

      {isView && <View />}
    </Container>
  );
};

export default AddServicesAntenatal;
