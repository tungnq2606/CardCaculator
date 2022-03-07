import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import {Button} from '../components';
import Layout from '../components/Layout';
import {hScale, scale, wScale} from '../utils';
import routes from '../routes';

const Home = () => {
  const [numberUser, setNumberUser] = useState(0);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const onChangeNumber = text => {
    setNumberUser(text);
    if (text.length > 0) {
      if (Number(text) > 0 && Number(text) < 5) {
        setError('');
      } else {
        setError('Vui lòng nhập số người chơi từ 1 đến 4');
      }
    } else {
      setError('Vui lòng nhập số người chơi');
    }
  };

  const onPress = () => {
    if (error === '' && numberUser > 0) {
      navigation.navigate(routes.EnterName, {
        numberUser: numberUser,
      });
    } else {
      setError('Vui lòng nhập số người chơi');
    }
  };
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Nhập số lượng người chơi (Tối đa 4)</Text>
        <TextInput
          placeholder="Nhập số"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangeNumber}
          maxLength={1}
          contextMenuHidden={true}
          value={numberUser.toString()}
        />
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <Button style={styles.button} onPress={onPress}>
          <Text style={styles.label}>Tiếp tục</Text>
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(13),
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    paddingVertical: hScale(6),
    paddingHorizontal: wScale(6),
    width: wScale(100),
    marginTop: hScale(12),
  },
  button: {
    marginTop: hScale(20),
    paddingHorizontal: wScale(12),
    paddingVertical: hScale(8),
    borderRadius: scale(5),
    backgroundColor: '#00bcd4',
  },
  label: {
    color: '#fff',
    fontSize: scale(15),
  },
  error: {
    marginTop: hScale(5),
    color: 'red',
  },
});

export default Home;
