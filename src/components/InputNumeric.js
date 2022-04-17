import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CheckBox, Icon} from 'react-native-elements';

import Button from './Button';
import {hScale, scale, wScale} from '../utils';

const InputNumeric = ({
  title,
  number,
  setNumber,
  max,
  state,
  setState,
  disable,
}) => {
  const increment = () => number < max && setNumber(number + 1);
  const decrement = () => number > 0 && setNumber(number - 1);

  return (
    // state = 0 là thắng, state = 1 là thua
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <CheckBox
          containerStyle={styles.checkBox}
          title="Thắng"
          checked={state !== -1 && disable !== 2 && state === 0}
          disabled={disable === 2}
          onPress={() => setState(prev => (prev === 0 ? -1 : 0))}
        />
        <CheckBox
          disabled={disable === 1}
          containerStyle={styles.checkBox}
          title="Thua"
          checked={state !== -1 && disable !== 1 && state === 1}
          onPress={() => setState(prev => (prev === 1 ? -1 : 1))}
        />
      </View>

      <View style={styles.inputContainer}>
        <Button
          style={[styles.button, {borderRightWidth: 0.8}]}
          onPress={decrement}>
          <AntDesign name="minus" size={scale(14)} />
        </Button>
        <TextInput
          value={number.toString()}
          style={styles.input}
          editable={false}
        />
        <Button
          style={[styles.button, {borderLeftWidth: 0.8}]}
          onPress={increment}>
          <AntDesign name="plus" size={scale(14)} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    marginRight: wScale(12),
    fontSize: scale(14),
    fontWeight: '500',
    width: wScale(70),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wScale(20),
    borderWidth: 1,
    height: hScale(24),
  },
  button: {
    backgroundColor: '#fff',
    padding: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'center',
  },
  checkBox: {backgroundColor: '#fff', borderWidth: 0, height: hScale(40)},
});

export default React.memo(InputNumeric);
