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

const AddServicesKB = ({navigation, route}) => {
  const oldData = route.params.data;
  const [form, setForm] = useForm({
    child: oldData ? oldData.bookingable.total_child.toString() : '',
    age: oldData ? oldData.bookingable.yongest_child_age.toString() : '',
    status: oldData ? oldData.bookingable.status_use : '',
    method: oldData ? oldData.bookingable.method_use : '',
    breastfeed: oldData ? oldData.bookingable.is_breast_feed == 1 : '',
    otherDiseaseHistory: '', // NOT DONE
    lastDateMenstruation: oldData
      ? new Date(oldData.bookingable.date_last_haid)
      : '',
    visitDate: oldData ? new Date(oldData.bookingable.visit_date) : new Date(),
    visitTime: oldData ? new Date(oldData.bookingable.visit_date) : new Date(),
  });

  const [loading, setLoading] = useState(true);
  const [loadingDiseaseHistory, setLoadingDiseaseHistory] = useState(true);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleSuccessEdit, setVisibleSuccessEdit] = useState(false);
  const [visibleLastDateMenstruation, setVisibleLastDateMenstruation] =
    useState(false);
  const [visibleVisitDate, setVisibleVisitDate] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [selectDiseaseHistory, setSelectDiseaseHistory] = useState([]);
  const [price, setPrice] = useState('');
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMidwife(oldData ? new Date(oldData.bookingable.visit_date) : new Date());
    getDiseasehistory();
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

        if (route.params.data)
          setSelectMidwife({
            id: route.params.data.bidan.id,
            name: route.params.data.bidan.name,
          });
        else setSelectMidwife(defalutSelectMidwife);
      } else {
        setDataMidwife([]);
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      navigation.goBack();
    }
  };

  const getDiseasehistory = async () => {
    try {
      const res = await Api.get({
        url: 'self/disease-history-families',
      });

      console.log('cek res', res);

      if (res) {
        const formated = formatSelect(res, true);
        setSelectDiseaseHistory(formated);
        setLoadingDiseaseHistory(false);
      } else setLoadingDiseaseHistory(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const validation = () => {
    const position = selectDiseaseHistory.findIndex(
      obj => obj.name == 'Lainnya',
    );

    if (!form.child) return ToastAlert('Silahkan isi jumlah anak  Anda');
    if (!form.age) return ToastAlert('Silahkan isi umur anak terkecil Anda');
    if (!form.method) return ToastAlert('Silahkan pilih cara KB Anda');
    if (!form.status) return ToastAlert('Silahkan pilih status pengguna Anda');
    if (selectDiseaseHistory[position].select && !form.otherDiseaseHistory) {
      return ToastAlert('Silahkan isi riwayat penyakit Anda');
    }
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan Anda');

    if (route.params.isEdit) onEdit();
    else onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;
    let disease_history_family_name = form.otherDiseaseHistory;
    const disease_history_family_ids = formatSelectedId(selectDiseaseHistory);
    const date_last_haid = form.lastDateMenstruation
      ? moments(form.lastDateMenstruation).format('YYYY-MM-DD')
      : '';

    if (disease_history_family_ids.length == 0)
      disease_history_family_name = '';

    try {
      await Api.post({
        url: 'admin/family-plannings',
        body: {
          service_category_id: route.params.id,
          disease_history_family_ids,
          date_last_haid,
          total_child: parseInt(form.child),
          status_use: form.status,
          yongest_child_age: parseInt(form.age),
          method_use: form.method,
          is_breast_feed: form.breastfeed,
          bidan_id: selectMidwife.id,
          pasien_id: route.params.userId,
          visit_date,
          disease_history_family_name,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert(error.message);
    }
  };

  const onEdit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;
    let disease_history_family_name = form.otherDiseaseHistory;
    const disease_history_family_ids = formatSelectedId(selectDiseaseHistory);

    if (disease_history_family_ids.length == 0)
      disease_history_family_name = '';

    try {
      await Api.put({
        url: `admin/family-plannings/${route.params.data.id}`,
        body: {
          disease_history_family_ids,
          date_last_haid: moments(form.lastDateMenstruation).format(
            'YYYY-MM-DD',
          ),
          total_child: parseInt(form.child),
          status_use: form.status,
          yongest_child_age: parseInt(form.age),
          method_use: form.method,
          is_breast_feed: form.breastfeed,
          bidan_id: selectMidwife.id,
          visit_date,
          disease_history_family_name,
        },
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccessEdit(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert(error.message);
    }
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
              value={'Keluraga Berencana (KB)'}
              disable
            />

            <Input
              style={styles.input}
              label={'Jumlah Anak'}
              value={form.child}
              keyboardType={'numeric'}
              onChangeText={value => setForm('child', value)}
            />

            <Input
              style={styles.input}
              label={'Umur Anak Terkecil'}
              value={form.age}
              onChangeText={value => setForm('age', value)}
            />

            <Text style={styles.label}>{'Cara KB'}</Text>
            <FlatList
              data={constants.SELECT_TYPE_KB}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.method}
                  onPress={() => setForm('method', item.name)}
                />
              )}
              scrollEnabled={false}
              numColumns={2}
            />

            <Input
              style={styles.inputSecond}
              label={'Biaya'}
              value={price}
              disable
            />

            <Text style={styles.label}>{'Status Pengguna'}</Text>
            <FlatList
              data={constants.SELECT_STATUS_KB}
              renderItem={({item}) => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.name == form.status}
                  onPress={() => setForm('status', item.name)}
                />
              )}
              numColumns={2}
              scrollEnabled={false}
            />

            <Input
              style={styles.inputSecond}
              label={'Tanggal Terakhir Haid'}
              value={
                form.husbandProfession
                  ? moments(form.lastDateMenstruation).format('DD MMMM YYYY')
                  : ''
              }
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisibleLastDateMenstruation(true)}
            />

            <Text style={styles.label}>{'Menyusui'}</Text>
            <SpaceBeetwen>
              {constants.SELECT_YES_OR_NO.map(item => (
                <RadioButton
                  style={styles.radioButton}
                  key={item.id}
                  label={item.name}
                  isActive={item.value == form.breastfeed}
                  onPress={() => setForm('breastfeed', item.value)}
                />
              ))}
            </SpaceBeetwen>

            <Text style={styles.label}>{'Riwayat Penyakit'}</Text>
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

            <Input
              style={styles.input}
              label={'Tanggal Kunjungan'}
              value={moments(form.visitDate).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleVisitDate(true)}
            />

            <Input
              style={styles.input}
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

            <Input
              style={styles.input}
              label={'Waktu Kunjungan'}
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleVisitTime(true)}
            />

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
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

      <ModalAlert
        visible={visibleSuccessEdit}
        desc={'Selamat anda telah berhasil\nemngubah di layanan kami'}
        onDismiss={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
      />

      {visibleLastDateMenstruation && (
        <DatePicker
          testID="dateTimePicker"
          value={
            form.husbandProfession ? form.lastDateMenstruation : new Date()
          }
          mode={'date'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.lastDateMenstruation;
            setVisibleLastDateMenstruation(false);
            setForm('lastDateMenstruation', currentDate);
          }}
        />
      )}

      {visibleVisitDate && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={'date'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitDate;
            setVisibleVisitDate(false);
            dispatch({type: 'SET_LOADING', value: true});
            getMidwife(currentDate);
            setForm('visitDate', currentDate);
          }}
        />
      )}

      {visibleVisitTime && (
        <DatePicker
          testID="dateTimePicker"
          value={form.visitTime}
          mode={'time'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || form.visitTime;
            setVisibleVisitTime(false);
            setForm('visitTime', currentDate);
          }}
        />
      )}

      {isView && <View />}
    </Container>
  );
};

export default AddServicesKB;
