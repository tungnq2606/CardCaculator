import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Button, Header, Layout} from '../components';
import {hScale, scale, wScale} from '../utils';

const Item = ({number, onPress}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.userName}>Tên người chơi thứ {number}:</Text>
    <TextInput placeholder="Tên người chơi" style={styles.inputItem} />
  </View>
);

const EnterName = ({route}) => {
  const {numberUser} = route.params;
  const arr = Array.from({length: numberUser}, (v, k) => k + 1);

  const onPress = () => {};

  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Nhập tên người chơi</Text>
        <View>
          {arr.map((_, index) => (
            <Item key={index} number={index + 1} />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={onPress}>
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
});
export default EnterName;
