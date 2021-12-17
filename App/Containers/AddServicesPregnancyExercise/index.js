import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
  ModalSelect,
} from '../../Components';
import {
  constants,
  getData,
  SampleAlert,
  ToastAlert,
  useForm,
} from '../../Helpers';
import {IcCamera} from '../../Images';
import {
  checkPermissionCamera,
  checkPermissionGallery,
  moments,
  openCamera,
  openGallery,
} from '../../Libs';
import {Api} from '../../Services';
import styles from './styles';

const defalutSelectMidwife = {
  id: 0,
  name: '',
};

const AddServicesPregnancyExercise = ({navigation, route}) => {
  const [form, setForm] = useForm({
    pregnancy: '',
    visitDate: new Date(),
    visitTime: new Date(),
    hpht: new Date(),
    photo: '',
  });

  const [loading, setLoading] = useState(true);
  const [visibleVisitDate, setVisibleVisitDate] = useState(false);
  const [visibleDatePickerHPHT, setVisibleDatePickerHPHT] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visiblePregnancy, setVisiblePregnancy] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defalutSelectMidwife);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [gestationalAge, setGestationalAge] = useState('');
  const [isView, setIsView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      setDataUser(res);
    });

    getMidwife(new Date());
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
      } else {
        setDataMidwife([]);
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
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
    if (!form.pregnancy) return ToastAlert('Silahkan pilih kehamilan anda');
    if (!selectMidwife.name) return ToastAlert('Silahkan pilih bidan anda');
    if (!form.photo) return ToastAlert('Silahkan upload bukti transfer');

    onSubmit();
  };

  const onSubmit = async () => {
    dispatch({type: 'SET_LOADING', value: true});

    const visit_date = `${moments(form.visitDate).format(
      'YYYY-MM-DD',
    )} ${moments(form.visitTime).format('HH:mm:ss')}`;
    const photo = `data:${selectPhoto.type};base64, ${selectPhoto.base64}`;

    try {
      await Api.post({
        url: 'admin/pregnancy-exercises',
        body: {
          file_upload: photo,
          gestational_age: gestationalAge,
          date_estimate_birth: moments(form.hpht)
            .add(40, 'weeks')
            .format('YYYY-MM-DD'),
          pregnancy: form.pregnancy,
          visit_date,
          bidan_id: selectMidwife.id,
          pasien_id: route.params.userId,
          service_category_id: route.params.id,
          date_last_haid: moments(form.hpht).format('YYYY-MM-DD'),
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
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input label={'Jenis Layanan'} value={'Senam Hamil'} disable />

            <Input
              style={styles.input}
              label={'Kehamilan Ke'}
              value={form.pregnancy}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => setVisiblePregnancy(true)}
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
              label={'Waktu Kunjungan'}
              value={moments(form.visitTime).format('HH:mm')}
              editable={false}
              onPress={() => setVisibleTimePicker(true)}
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
              label={'Hari Pertama Haid Terakhir (HPHT)'}
              value={moments(form.hpht).format('DD MMMM YYYY')}
              editable={false}
              onPress={() => setVisibleDatePickerHPHT(true)}
            />

            <Input
              style={styles.input}
              label={'Hari Perkiraan Lahir (HPL)'}
              value={moments(form.hpht).add(40, 'weeks').format('DD MMMM YYYY')}
              disable
            />

            <Input
              style={styles.input}
              label={'Usia Kehamilan'}
              value={gestationalAge}
              disable
            />

            <Text style={styles.label}>{'Bukti Transfer'}</Text>
            {form.photo ? (
              <Image style={styles.photo} source={{uri: form.photo}} />
            ) : (
              <TouchableOpacity
                style={styles.containerPhoto}
                onPress={() => setVisibleSelectPhoto(true)}>
                <Image style={styles.camera} source={IcCamera} />
              </TouchableOpacity>
            )}

            <Text style={styles.desc}>
              {
                '*transfer ke rek mandiri :\n1670003013470\nA.n Maharani Agustiani\nSistemnya booking transfer baru terdaftar karena limited seat 😊\nMohon konfirmasi bukti transfer ya bun..\n\nSilahkan diisi data nya dulu bun🙏🏻😊\n\nTerimakasih\n\n\nKontraindikasi mengikuti kelas adalah : perdarahan saat hamil (sebutkan usia kehamilan berapa minggu dan sebab), plasenta previa, tekanan darah tinggi. Kelas ini dimulai usia kehamilan 20 minggu\n\nInfo kembali tidak dapat reschedule saat Hari H, jika reschedule saat hari H maka dianggap akan hangus. Minimal reschedule H-1 sebelum jam 7 malam. Mengingat ada peminat lain yang menunggu slot 🙏 .Kecuali hal-hal yang dapat ditoleransi oleh kami. Terimakasih 🙏 semoga selalu dalam keadaan sehat 💕💕'
              }
            </Text>

            <Gap height={20} />
            <Button label={'Submit'} onPress={validation} />
          </View>
        </ScrollView>
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

      <ModalSelect
        visible={visibleSelectPhoto}
        data={constants.SELECT_PHOTO}
        onDismiss={() => setVisibleSelectPhoto(false)}
        onPress={async value => {
          setVisibleSelectPhoto(false);
          if (value == 'Gallery') {
            const granted = await checkPermissionGallery();
            if (granted) {
              const callback = await openGallery();
              const item = callback.assets[0];
              setSelectPhoto(item);
              setForm('photo', item.uri);
            }
          } else {
            const granted = await checkPermissionCamera();
            if (granted) {
              const callback = await openCamera();
              const item = callback.assets[0];
              setSelectPhoto(item);
              setForm('photo', item.uri);
            }
          }
        }}
      />

      {isView && <View />}
    </Container>
  );
};

export default AddServicesPregnancyExercise;
