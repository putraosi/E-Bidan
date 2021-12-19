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
  formatSelect,
  formatSelectedGrouped,
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

const AddServicesAntenatal = ({navigation, route}) => {
  const [form, setForm] = useForm({
    pregnancy: '',
    abortion: '',
    visitDate: new Date(),
    visitTime: new Date(),
    hpht: new Date(),
    menstrualDisorders: '',
    remark: 'K1',
    otherDiseaseHistory: '',
    historyPlaceBirth: '',
    otherHistoryPlaceBirth: '',
    bloodGroup: '',
    husbandsTotalMarriage: '',
    wifesTotalMarriage: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingDiseaseHistory, setLoadingDiseaseHistory] = useState(true);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [visiblePregnancy, setVisiblePregnancy] = useState(false);
  const [visibleAbortion, setVisibleAbortion] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleDatePickerHPHT, setVisibleDatePickerHPHT] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [selectHistory, setSelectHistory] = useState(
    constants.SELECT_ANTENATAL_HISTORY,
  );
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [selectDiseaseHistory, setSelectDiseaseHistory] = useState(
    constants.SELECT_DISEASE_HISTORY,
  );
  const [gestationalAge, setGestationalAge] = useState('');
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMidwife(new Date());
    getDiseasehistory();
    checkGestationalAge(form.visitDate, form.hpht);
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

  const checkGestationalAge = (_visitDate, _hpht) => {
    const diff = Math.abs(moments(_visitDate).diff(_hpht, 'days'));
    let desc = '';

    if (diff == 0) desc = '-';
    else if (diff % 7 == 0) desc = `${diff / 7} Minggu`;
    else if (diff / 7 >= 1)
      desc = `${(diff / 7).toFixed(0)} Minggu ${diff % 7} Hari`;
    else desc = `${diff} Hari`;

    setGestationalAge(desc);
  };

  const validation = () => {
    const position = selectDiseaseHistory.findIndex(
      obj => obj.name == 'Lainnya',
    );

    if (!form.pregnancy)
      return ToastAlert('Silahkan pilih kehamilan ke berapa Anda');
    if (!form.abortion)
      return ToastAlert('Silahkan pilih keguguran ke berapa Anda');
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');
    if (selectDiseaseHistory[position].select && !form.otherDiseaseHistory) {
      return ToastAlert('Silahkan isi riwayat penyakit Anda');
    }
    if (Object.values(selectHistory).every(item => item.select === false))
      return ToastAlert('Silahkan pilih riwayat persalinan Anda');
    if (!form.historyPlaceBirth)
      return ToastAlert('Silahkan pilih tempat bersalin Anda');
    if (form.historyPlaceBirth == 'Faskes Lain' && !form.otherHistoryPlaceBirth)
      return ToastAlert('Silahkan isi tempat bersalin Anda');
    if (!form.bloodGroup)
      return ToastAlert('Silahkan pilih golongan darah Anda');
    if (!form.husbandsTotalMarriage)
      return ToastAlert('Silahkan isi total nikah suami');
    if (!form.wifesTotalMarriage)
      return ToastAlert('Silahkan isi total nikah istri');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    let abortus = form.abortion;
    let disease_history_name = form.otherDiseaseHistory;
    const labor_history = formatSelectedGrouped(selectHistory);
    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;
    const maternity_plan =
      form.historyPlaceBirth == 'Bidan Amel'
        ? form.historyPlaceBirth
        : form.otherHistoryPlaceBirth;
    const disease_history_id = formatSelectedId(selectDiseaseHistory);

    if (abortus == 'Tidak Pernah') abortus = 0;
    if (disease_history_id.length == 0) disease_history_name = '';

    try {
      const res = await Api.post({
        url: 'admin/antenatals',
        body: {
          service_category_id: route.params.id,
          pregnancy: parseInt(form.pregnancy),
          abortus: parseInt(abortus),
          gestational_age: gestationalAge,
          visit_date,
          pasien_id: route.params.userId,
          bidan_id: selectMidwife.id,
          labor_history,
          date_last_haid: moments(form.hpht).format('YYYY-MM-DD'),
          date_estimate_birth: moments(form.hpht)
            .add(40, 'weeks')
            .format('YYYY-MM-DD'),
          is_new: false,
          menstrual_disorders: form.menstrualDisorders,
          maternity_plan,
          blood_group: form.bloodGroup,
          marital_status_wife: parseInt(form.wifesTotalMarriage),
          marital_status_husband: parseInt(form.husbandsTotalMarriage),
          disease_history_id,
          disease_history_name,
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

  const onChangeSelectHistory = item => {
    const position = selectHistory.findIndex(obj => obj.id == item.id);

    const newSelected = !selectHistory[position].select;
    let newSelect = selectHistory;

    const nowValue = selectHistory[position].name;
    if (nowValue == 'Belum Pernah') {
      newSelect = selectHistory.map(item => {
        const newItem = {
          id: item.id,
          name: item.name,
          select: item.name == 'Belum Pernah' ? newSelected : false,
        };
        return newItem;
      });
    } else {
      const positionFalse = selectHistory.findIndex(
        obj => obj.name == 'Belum Pernah',
      );
      newSelect[positionFalse].select = false;
      newSelect[position].select = !newSelect[position].select;
    }

    setIsView(!isView);
    setSelectHistory(newSelect);
  };

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />

      {loading || loadingDiseaseHistory ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={'Jenis Layanan'}
              value={'Antenatal (Pemeriksaan Kehamilan)'}
              disable
            />

            <Gap height={12} />
            <Input
              label={'Kehamilan Ke'}
              value={form.pregnancy}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisiblePregnancy(true)}
            />

            <Gap height={12} />
            <Input
              label={'Keguguran'}
              value={form.abortion}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleAbortion(true)}
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
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleTimePicker(true)}
            />

            <Gap height={12} />
            <Input
              label={'Hari Pertama Haid Terakhir (HPHT)'}
              value={moments(form.hpht).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePickerHPHT(true)}
            />

            <Gap height={12} />
            <Input
              label={'Hari Perkiraan Lahir (HPL)'}
              value={moments(form.hpht).add(40, 'weeks').format('DD MMMM YYYY')}
              disable
            />

            <Gap height={12} />
            <Input label={'Usia Kehamilan'} value={gestationalAge} disable />

            <Gap height={12} />
            <Text style={styles.label}>
              {'Riwayat Penyakit (Penyakit Berat)'}
            </Text>
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

            <Gap height={8} />
            <Input
              label={'Gangguan Menstruasi (jika ada)'}
              value={form.menstrualDisorders}
              onChangeText={value => setForm('menstrualDisorders', value)}
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
                  onPress={() => onChangeSelectHistory(item)}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={12} />
            <Text style={styles.label}>{'Tempat Bersalin'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_HISTORY_PLACE_BIRTH.map(item => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.historyPlaceBirth}
                  other={form.otherHistoryPlaceBirth}
                  onChangeText={value =>
                    setForm('otherHistoryPlaceBirth', value)
                  }
                  onPress={() => setForm('historyPlaceBirth', item.name)}
                />
              ))}
            </SpaceBeetwen>

            <Gap height={8} />
            <Text style={styles.label}>{'Golongan Darah'}</Text>
            <FlatList
              data={constants.SELECT_BLOOD_GROUP}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.bloodGroup}
                  onPress={() => setForm('bloodGroup', item.name)}
                />
              )}
              scrollEnabled={false}
              numColumns={2}
            />

            <Gap height={8} />
            <SpaceBeetwen>
              <Input
                style={styles.flex}
                label={'Pernikahan Ke (Istri)'}
                value={form.wifesTotalMarriage}
                keyboardType={'numeric'}
                onChangeText={value => setForm('wifesTotalMarriage', value)}
              />

              <Gap width={16} />

              <Input
                style={styles.flex}
                label={'Pernikahan Ke (Suami)'}
                value={form.husbandsTotalMarriage}
                keyboardType={'numeric'}
                onChangeText={value => setForm('husbandsTotalMarriage', value)}
              />
            </SpaceBeetwen>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
      )}

      <Modals
        type={'spinner'}
        title={'Pilih Kehamilan Ke'}
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
        title={'Pilih Keguguran'}
        visible={visibleAbortion}
        data={constants.SELECT_ABORTION}
        onDismiss={() => setVisibleAbortion(false)}
        onSelect={value => {
          setVisibleAbortion(false);
          setForm('abortion', value.name);
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
            checkGestationalAge(currentDate, form.hpht);
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

      {visibleDatePickerHPHT && (
        <DatePicker
          testID="dateTimePicker"
          value={form.hpht}
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.hpht;
            setVisibleDatePickerHPHT(false);
            checkGestationalAge(form.visitDate, currentDate);
            setForm('hpht', currentDate);
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

export default AddServicesAntenatal;
