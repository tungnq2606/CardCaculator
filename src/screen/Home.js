import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {Button} from '../components';
import Layout from '../components/Layout';
import {hScale, scale, wScale} from '../utils';
import routes from '../routes';
import {useFormik} from 'formik';
import {HomeSchema} from './schema';
import {useDispatch} from 'react-redux';
import {setNumberUser} from './slice/RoundSlice';

const initialValues = {userQuantity: 0};

const Home = () => {
  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: HomeSchema,
    onSubmit: values => onSubmit(values),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    // navigation.navigate(routes.EnterName, {
    //   numberUser: values.userQuantity,
    // });
    dispatch(setNumberUser(values.userQuantity));
    navigation.navigate(routes.EnterName);
  };

  const goToGuide = () => navigation.navigate(routes.Guide);
  return (
    <Layout>
      <View style={styles.guide}>
        <Feather
          name="chevron-left"
          size={scale(25)}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <AntDesign
          name="questioncircleo"
          size={scale(22)}
          color="#000"
          onPress={goToGuide}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Nhập số lượng người chơi (Tối đa 4)</Text>
        <TextInput
          placeholder="Nhập số"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleChange('userQuantity')}
          maxLength={1}
          onBlur={handleBlur('userQuantity')}
          contextMenuHidden={true}
          value={values.userQuantity.toString()}
        />
        {errors.userQuantity && (
          <Text style={styles.error}>{errors.userQuantity}</Text>
        )}
        <Button style={styles.button} onPress={handleSubmit}>
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
  guide: {
    paddingHorizontal: wScale(12),
    marginTop: hScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
