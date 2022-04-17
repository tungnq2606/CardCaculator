import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, Header, Layout, UpdateScore} from '../components';
import {hScale, scale, wScale} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {roundsSelector} from '../redux/selector';
import {fetchAllTransaction} from './slice/RoundSlice';

const Score = () => {
  const [index, setIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const round = useSelector(roundsSelector);
  const dispatch = useDispatch();

  const handleChangeModal = index => {
    setIndex(index);
    setIsVisible(prev => !prev);
  };
  useEffect(() => {
    dispatch(fetchAllTransaction(round.data.users));
  }, []);
  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            {round?.data &&
              round?.data?.users?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    justifyContent: 'flex-start',
                    flex: 1,
                  }}>
                  <View style={styles.itemContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    {round?.transaction[index]?.score.map((score, x) => (
                      <View key={x} >
                        <Text style={styles.score}>{score}</Text>
                      </View>
                    ))}
                    <Button
                      style={styles.button}
                      onPress={() => handleChangeModal(index)}>
                      <AntDesign name="edit" size={scale(20)} color="#fff" />
                    </Button>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
        <UpdateScore
          isVisible={isVisible}
          closeModal={handleChangeModal}
          index={index}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wScale(12),
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5),
    borderRadius: scale(5),
    backgroundColor: '#008CBA',
    marginRight: wScale(3),
    marginTop: hScale(8),
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  score: {
    marginTop: hScale(10),
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    borderColor: '#ccc',
    paddingBottom: hScale(10),
    alignItems: 'flex-start',
    marginTop: hScale(10),
  },
  row: {
    flexDirection: 'row',
  },
});
export default Score;
