import DatePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  RadioButton,
  SpaceBeetwen,
} from '../../Components';
import {constants, ToastAlert, useForm} from '../../Helpers';
import {moments} from '../../Libs';
import styles from './styles';

const AddServicesReferral = ({navigation}) => {
  const [form, setForm] = useForm({
    referenceDate: new Date(),
    wifeName: '',
    husbandName: '',
    wifeAge: '',
    address: '',
    phoneNumber: '',
    diagnosis: '',
    hospital: '',
    option: 'Pendampingan',
  });

  const [visibleReferenceDate, setVisibleReferenceDate] = useState(false);

  return (
    <Container>
      <Header title={'Pesanan Baru'} onDismiss={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label={'Jenis Layanan'}
            value={'Pelayanan Rujukan'}
            editable={false}
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
            label={'Nama Istri'}
            value={form.wifeName}
            onChangeText={value => setForm('wifeName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Nama Suami'}
            value={form.husbandName}
            onChangeText={value => setForm('husbandName', value)}
          />

          <Gap height={12} />
          <Input
            label={'Usia Istri'}
            value={form.wifeAge}
            keyboardType={'numeric'}
            onChangeText={value => setForm('wifeAge', value)}
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
          <Button label={'Submit'} onPress={() => ToastAlert()} />
        </View>
      </ScrollView>

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
    </Container>
  );
};

export default AddServicesReferral;
