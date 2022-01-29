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
  Row,
} from '../../Components';
import {
  constants,
  formatMidwife,
  formatMidwifeTime,
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

const defaultEmpty = {
  id: 0,
  name: '',
};

const AddServicesPregnancyExercise = ({navigation, route}) => {
  const [form, setForm] = useForm({
    pregnancy: route.params.data
      ? route.params.data.bookingable.pregnancy.toString()
      : '',
    visitDate: route.params.data
      ? new Date(
          moments(route.params.data.bookingable.visit_date).format(
            'YYYY-MM-DD',
          ),
        )
      : new Date(),
    hpht: route.params.data
      ? new Date(
          moments(route.params.data.bookingable.date_last_haid).format(
            'YYYY-MM-DD',
          ),
        )
      : new Date(),
    photo: route.params.data ? route.params.data.bookingable.file_upload : '',
    isUpdate: route.params.data ? true : false,
  });

  const [loading, setLoading] = useState(true);
  const [visibleVisitDate, setVisibleVisitDate] = useState(false);
  const [visibleVisitTime, setVisibleVisitTime] = useState(false);
  const [visibleDatePickerHPHT, setVisibleDatePickerHPHT] = useState(false);
  const [visibleMidwife, setVisibleMidwife] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visiblePregnancy, setVisiblePregnancy] = useState(false);
  const [visibleSelectPhoto, setVisibleSelectPhoto] = useState(false);
  const [dataMidwife, setDataMidwife] = useState([]);
  const [dataMidwifeTime, setDataMidwifeTime] = useState([]);
  const [selectMidwife, setSelectMidwife] = useState(defaultEmpty);
  const [selectMidwifeTime, setSelectMidwifeTime] = useState(defaultEmpty);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [gestationalAge, setGestationalAge] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.data) {
      const item = route.params.data;
      const split = item.bookingable.file_upload.split(';');

      const image = {
        type: split[0].replace('data:', ''),
        base64: split[1].replace('base64, ', ''),
      };

      const midwfie = {
        id: item.practice_schedule_time.practice_schedule_detail.id,
        name: item.practice_schedule_time.practice_schedule_detail.bidan.name,
      };

      const time = {
        id: item.practice_schedule_time.id,
        name: item.practice_schedule_time.practice_time,
      };

      getMidwife(item.bookingable.visit_date, true);
      getMidwifeTime(item.practice_schedule_time.practice_schedule_detail.id);
      checkGestationalAge(item.bookingable.visit_date, form.hpht);
      setSelectPhoto(image);
      setSelectMidwife(midwfie);
      setSelectMidwifeTime(time);
    } else {
      getMidwife(new Date());
      checkGestationalAge(form.visitDate, form.hpht);
    }
  }, []);

  const getMidwife = async (date, isPrevious) => {
    try {
      const res = await Api.post({
        url: 'self/show-schedules',
        body: {
          visit_date: moments(date).format('YYYY-MM-DD'),
        },
      });

      const newData = formatMidwife(res);
      setDataMidwife(newData);
      if (!isPrevious) {
        setSelectMidwife(defaultEmpty);
        setSelectMidwifeTime(defaultEmpty);
      }

      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setLoading(false);
      setDataMidwife([]);
      if (!isPrevious) {
        setSelectMidwife(defaultEmpty);
        setSelectMidwifeTime(defaultEmpty);
      }
    }
  };

  const getMidwifeTime = async id => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const res = await Api.post({
        url: 'self/show-schedule-times',
        body: {
          detail_id: id,
        },
      });

      const newData = formatMidwifeTime(res);
      setDataMidwifeTime(newData);
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setDataMidwifeTime([]);
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
    if (!selectMidwifeTime.name)
      return ToastAlert('Silahkan pilih waktu kunjungan Anda');
    if (!form.photo) return ToastAlert('Silahkan upload bukti transfer');

    setBody();
  };

  const setBody = () => {
    dispatch({type: 'SET_LOADING', value: true});

    try {
      const visit_date = `${moments(form.visitDate).format('YYYY-MM-DD')} ${
        selectMidwifeTime.name
      }`;
      const photo = `data:${selectPhoto.type};base64, ${selectPhoto.base64}`;

      const body = {
        file_upload: photo,
        gestational_age: gestationalAge,
        date_estimate_birth: moments(form.hpht)
          .add(40, 'weeks')
          .format('YYYY-MM-DD'),
        pregnancy: form.pregnancy,
        visit_date,
        practice_schedule_time_id: selectMidwifeTime.id,
        pasien_id: route.params.userId,
        service_category_id: route.params.id,
        date_last_haid: moments(form.hpht).format('YYYY-MM-DD'),
      };

      if (form.isUpdate) {
        onUpdate(body);
      } else onSubmit(body);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
    }
  };

  const onSubmit = async body => {
    try {
      await Api.post({
        url: 'admin/pregnancy-exercises',
        body,
      });

      dispatch({type: 'SET_LOADING', value: false});
      setVisibleSuccess(true);
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      SampleAlert({message: error.message});
    }
  };

  const onUpdate = async body => {
    try {
      await Api.put({
        url: `admin/pregnancy-exercises/${route.params.data.bookingable.id}`,
        body,
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
              value={selectMidwifeTime.name}
              placeholder={'Pilih'}
              editable={false}
              onPress={() => {
                if (dataMidwifeTime && dataMidwifeTime.length)
                  setVisibleVisitTime(true);
                else
                  SampleAlert({
                    title: 'Mohon Maaf',
                    message: `Silahkan pilih bidan terlebih dahulu`,
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
              <Row>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PreviewPhoto', {
                      image: {uri: form.photo},
                    })
                  }>
                  <Image style={styles.photo} source={{uri: form.photo}} />
                </TouchableOpacity>
                <Text
                  style={styles.change}
                  onPress={() => setVisibleSelectPhoto(true)}>
                  {'Ubah'}
                </Text>
              </Row>
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
            <Button
              label={form.isUpdate ? 'Simpan Perubahan' : 'Submit'}
              onPress={validation}
            />
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
            setVisibleVisitDate(false);

            if (event.type == 'set') {
              const currentDate = selectedDate || form.visitDate;
              dispatch({type: 'SET_LOADING', value: true});
              getMidwife(currentDate);
              checkGestationalAge(currentDate, form.hpht);
              setForm('visitDate', currentDate);
            }
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
          getMidwifeTime(value.id);
        }}
      />

      <Modals
        type={'spinner'}
        title={'Pilih Waktu Kunjungan'}
        visible={visibleVisitTime}
        data={dataMidwifeTime}
        onDismiss={() => setVisibleVisitTime(false)}
        onSelect={value => {
          setVisibleVisitTime(false);
          setSelectMidwifeTime(value);
        }}
      />

      <ModalAlert
        visible={visibleSuccess}
        desc={
          form.isUpdate
            ? 'Selamat anda telah berhasil\nmemperbaharui layanan'
            : 'Selamat anda telah berhasil\nmendaftar di layanan kami'
        }
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
    </Container>
  );
};

export default AddServicesPregnancyExercise;
