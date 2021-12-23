import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Header, Loading} from '../../Components';
import {Api} from '../../Services';

const NotificationPatient = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Api.get({
        url: 'admin/notification/unread',
        showLog: true,
      });

      setLoading(false)

    } catch (error) {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Header title={'Notifikasi'} onDismiss={() => navigation.goBack()} />
      {loading ? <Loading /> : <Text>new page</Text>}
    </Container>
  );
};

export default NotificationPatient;

const styles = StyleSheet.create({});
