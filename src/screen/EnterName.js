import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import Realm from 'realm';

import {Button, Header, Layout} from '../components';
import {hScale, scale, wScale} from '../utils';
import {EnterNameSchema} from './schema';
import {useNavigation} from '@react-navigation/native';
import routes from '../routes';
import {useDispatch, useSelector} from 'react-redux';
import {newRound} from './slice/RoundSlice';

const Item = ({
  number,
  handleChange,
  values,
  errors,
  handleBlur,
  touched,
  setFieldValue,
}) => {
  const key = `userName${number}`;
  useEffect(() => {
    setFieldValue(key, '', false);
  }, []);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.userName}>Tên người chơi thứ {number}:</Text>
      <View>
        <TextInput
          placeholder="Tên người chơi"
          style={styles.inputItem}
          onBlur={handleBlur(key)}
          onChangeText={handleChange(key)}
          value={values[key]}
        />
        {errors[key] && touched[key] && (
          <Text style={styles.error}>{errors[key]}</Text>
        )}
      </View>
    </View>
  );
};

const initialValues = {
  userName1: null,
  userName2: null,
  userName3: null,
  userName4: null,
};

const {UUID} = Realm.BSON;

const EnterName = () => {
  const numberUser = useSelector(state => state.round.numberUser);
  const navigation = useNavigation();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    touched,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema: EnterNameSchema,
    onSubmit: values => onSubmit(values),
  });

  const dispatch = useDispatch();
  const arr = Array.from({length: numberUser}, (_, k) => k + 1);

  const onSubmit = async values => {
    const data = Object.values(values)
      .filter(Boolean)
      .map(val => {
        if (val) {
          return {id: new UUID().toHexString(), name: val};
        }
      });
    await dispatch(newRound(data));
    navigation.navigate(routes.Score);
  };

  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Nhập tên người chơi</Text>
        <View>
          {arr.map((_, index) => (
            <Item
              key={index}
              number={index + 1}
              {...{
                handleChange,
                values,
                errors,
                handleBlur,
                touched,
                setFieldValue,
              }}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={handleSubmit}>
            <Text style={styles.label}>Tiếp tục</Text>
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wScale(16),
    paddingVertical: hScale(12),
    flex: 1,
  },
  title: {
    fontSize: wScale(13),
    fontWeight: '400',
    marginBottom: hScale(16),
    width: '100%',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: hScale(12),
    alignItems: 'center',
  },
  userName: {
    marginRight: wScale(12),
    flex: 1,
  },
  inputItem: {
    borderWidth: 1,
    width: wScale(130),
    paddingVertical: hScale(6),
    paddingHorizontal: wScale(6),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hScale(20),
  },
  button: {
    paddingVertical: hScale(8),
    borderRadius: scale(5),
    width: wScale(100),
    alignItems: 'center',
    backgroundColor: '#00bcd4',
  },
  label: {
    color: '#fff',
    fontSize: scale(15),
  },
  error: {
    color: 'red',
    fontSize: scale(11),
    marginTop: hScale(4),
  },
});
export default EnterName;
