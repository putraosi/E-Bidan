import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  ItemList,
  Loading,
} from '../../Components';
import {ToastAlert} from '../../Helpers';
import {moments} from '../../Libs';
import {Api} from '../../Services';
import {colors, fonts} from '../../Themes';

const KBSerivceDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: `admin/bookings/${route.params.data.id}`,
      });

      setData(res);
      setLoading(false);
    } catch (error) {
      navigation.goBack();
    }
  };

  const onEdit = () => {
    return ToastAlert();
    navigation.navigate('AddServicesKB', {
      data: data,
      id: data.bookingable.service_category_id,
      userId: data.pasien_id,
      isEdit: true,
    });
  };

  return (
    <Container>
      <Header
        title={`Detail Pesan\nKeluarga Berencana (KB)`}
        onDismiss={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={'Jumlah Anak'}
              value={data.bookingable.total_child.toString()}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Umur Anak Terkecil'}
              value={data.bookingable.yongest_child_age.toString()}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Jenis KB'}
              value={data.bookingable.method_use}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Status Pengguna'}
              value={data.bookingable.status_use}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Tanggal Terakhir Haid'}
              value={moments(data.bookingable.date_last_haid).format(
                'DD MMMM YYYY',
              )}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Menyusui'}
              value={data.bookingable.is_breast_feed ? 'Iya' : 'Tidak'}
              editable={false}
            />

            <Text style={styles.label}>{'Riwayat Penyakit'}</Text>
            <FlatList
              data={data.bookingable.disease_history_families}
              renderItem={({item}) => (
                <ItemList style={styles.list} key={item.id} name={item.name} />
              )}
              numColumns={2}
              scrollEnabled={false}
              ListEmptyComponent={() => (
                <ItemList style={styles.list} name={'Tidak Ada'} />
              )}
            />

            <Gap height={8} />
            <Input
              label={'Waktu Kunjungan'}
              value={moments(data.bookingable.visit_date).format(
                'DD MMMM YYYY | HH:mm:ss',
              )}
              editable={false}
            />

            <Input
              style={styles.input}
              label={'Bidan'}
              value={data.bidan.name}
              editable={false}
            />

            <Gap height={20} />
            <Button label={'Ubah'} onPress={() => onEdit()} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default KBSerivceDetails;

const styles = StyleSheet.create({
  flex: {flex: 1},

  content: {
    padding: 16,
  },

  label: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.primary.regular,
    marginBottom: 6,
    marginTop: 12,
  },

  list: {
    flex: 1,
    marginBottom: 4,
  },

  input: {
    marginTop: 12,
  },

  photo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
});
