import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Header} from '../../Components';

const Help = ({navigation}) => {
  return (
    <Container>
      <Header title={'Bantuan'} onDismiss={() => navigation.goBack()} />
      <Text>Coming Soon!</Text>
    </Container>
  );
};

export default Help;

const styles = StyleSheet.create({});
