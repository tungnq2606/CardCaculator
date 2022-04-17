import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Button, Layout} from '../components';
import routes from '../routes';
import {fetchAllTransaction, fetchRound, newRound} from './slice/RoundSlice';
import {roundsSelector} from '../redux/selector';
import {hScale, scale, wScale} from '../utils';
import {useNavigation} from '@react-navigation/native';

const StartGame = () => {
  const dispatch = useDispatch();
  const round = useSelector(roundsSelector);
  const navigation = useNavigation();
  const continueGame = () => {
    navigation.navigate(routes.Score);
  };

  const newGame = () => {
    navigation.navigate(routes.Home);
  };

  useEffect(() => {
    dispatch(fetchRound());
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        {round && !round.isStart && (
          <Button style={styles.button} onPress={continueGame}>
            <Text style={styles.label}>Tiếp tục</Text>
          </Button>
        )}
        <Button style={styles.button} onPress={newGame}>
          <Text style={styles.label}>Ván mới</Text>
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
  button: {
    backgroundColor: '#00bcd4',
    marginVertical: hScale(8),
    paddingHorizontal: wScale(16),
    paddingVertical: hScale(8),
    borderRadius: scale(5),
  },
  label: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '500',
  },
});

export default StartGame;
