import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import {isIphoneX} from 'react-native-iphone-x-helper';

import InputNumeric from './InputNumeric';
import {hScale, scale, wScale} from '../utils';
import {Button} from '.';
import {useDispatch, useSelector} from 'react-redux';
import {changeScore} from '../screen/slice/RoundSlice';
import {roundsSelector} from '../redux/selector';

const UpdateScore = ({isVisible, closeModal, index}) => {
  const dispatch = useDispatch();
  const [winState, setWinState] = useState(0);
  const [rank, setRank] = useState(1);
  const [red2, setRed2] = useState(0);
  const [red2State, setRed2State] = useState(-1);
  const [black2, setBlack2] = useState(0);
  const [black2State, setBlack2State] = useState(-1);
  const [pairs3, setPairs3] = useState(0);
  const [pairs3State, setPairs3State] = useState(-1);
  const [pairs4, setPairs4] = useState(0);
  const [pairs4State, setPairs4State] = useState(-1);
  const [fourAces, setFourAces] = useState(0);
  const [fourAcesState, setFourAcesState] = useState(-1);

  const round = useSelector(roundsSelector);

  const resetForm = () => {
    setWinState(0);
    setRank(1);
    setRed2(0);
    setRed2State(-1);
    setBlack2(0);
    setBlack2State(-1);
    setPairs3(0);
    setPairs3State(-1);
    setPairs4(0);
    setPairs4State(-1);
    setFourAces(0);
    setFourAcesState(-1);
  };

  const calculateScore = () => {
    let score = round.transaction[index].currentScore;
    if (winState === 1) {
      score += 18;
    } else if (winState == 2) {
      score -= 6;
    } else {
      if (rank === 1) {
        score += 3;
      }
      if (rank === 2) {
        score += 2;
      }
      if (rank === 3) {
        score += 1;
      }
    }
    if (red2State === 0 && winState !== 2) {
      score += red2 * 2;
    }
    if (red2State === 1 && winState !== 1) {
      score -= red2 * 2;
    }
    if (black2State === 0 && winState !== 2) {
      score += black2 * 1;
    }
    if (black2State === 1 && winState !== 1) {
      score -= black2 * 1;
    }
    if (pairs3State === 0 && winState !== 2) {
      score += pairs3 * 2;
    }
    if (pairs3State === 1 && winState !== 1) {
      score -= pairs3 * 2;
    }
    if (pairs4State === 0 && winState !== 2) {
      score += pairs4 * 3;
    }
    if (pairs4State === 1 && winState !== 1) {
      score -= pairs4 * 3;
    }
    if (fourAcesState === 0 && winState !== 2) {
      score += fourAces * 3;
    }
    if (fourAcesState === 1 && winState !== 1) {
      score -= fourAces * 3;
    }
    return score;
  };
  const updateScore = () => {
    const score = calculateScore();
    dispatch(changeScore({id: round.transaction[index].id, score}));
    resetForm();
    closeModal();
  };
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Thay đổi điểm</Text>
        <AntDesign
          name="closecircleo"
          size={22}
          style={styles.icon}
          onPress={closeModal}
        />
        <View style={styles.body}>
          <View style={[styles.group2Item, styles.line]}>
            <CheckBox
              style={styles.checkBox}
              containerStyle={styles.checkBox}
              title="Tới trắng"
              checked={winState === 1}
              onPress={() => setWinState(prev => (prev === 1 ? 0 : 1))}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              style={styles.checkBox}
              title="Chết cóng"
              checked={winState === 2}
              onPress={() => setWinState(prev => (prev === 2 ? 0 : 2))}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {winState === 0 && (
              <>
                <View style={styles.group2Item}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    title="Về nhất"
                    checked={rank === 1}
                    onPress={() => setRank(1)}
                  />
                  <CheckBox
                    containerStyle={styles.checkBox}
                    title="Về nhì"
                    checked={rank === 2}
                    onPress={() => setRank(2)}
                  />
                </View>
                <View style={[styles.group2Item, styles.line]}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    title="Về ba"
                    checked={rank === 3}
                    onPress={() => setRank(3)}
                  />
                  <CheckBox
                    containerStyle={styles.checkBox}
                    title="Về bét"
                    checked={rank === 4}
                    onPress={() => setRank(4)}
                  />
                </View>
              </>
            )}
            <View>
              <InputNumeric
                disable={winState}
                title="Heo đỏ"
                number={red2}
                state={red2State}
                setState={setRed2State}
                max={black2 === 2 ? 1 : 2}
                setNumber={setRed2}
              />
              <InputNumeric
                disable={winState}
                title="Heo đen"
                number={black2}
                state={black2State}
                setState={setBlack2State}
                max={red2 === 2 ? 1 : 2}
                setNumber={setBlack2}
              />
              <InputNumeric
                disable={winState}
                title="Ba đôi thông"
                number={pairs3}
                state={pairs3State}
                setState={setPairs3State}
                max={pairs4 === 1 ? 0 : 1}
                setNumber={setPairs3}
              />
              <InputNumeric
                disable={winState}
                title="Bốn đôi thông"
                number={pairs4}
                state={pairs4State}
                setState={setPairs4State}
                max={pairs3 === 1 ? 0 : 1}
                setNumber={setPairs4}
              />
              <InputNumeric
                disable={winState}
                title="Tứ quý"
                number={fourAces}
                state={fourAcesState}
                setState={setFourAcesState}
                max={pairs4 === 1 ? 0 : 1}
                setNumber={setFourAces}
              />
            </View>
          </ScrollView>
          <Button style={styles.button} onPress={updateScore}>
            <Text style={styles.buttonText}>Cập nhật</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', paddingTop: hScale(20), margin: 0},
  container: {
    backgroundColor: '#fff',
    paddingTop: hScale(12),
    borderTopRightRadius: hScale(8),
    borderTopLeftRadius: hScale(8),
    paddingHorizontal: wScale(12),
  },
  title: {
    fontSize: scale(16),
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
  },
  group2Item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: wScale(5),
    top: hScale(5),
  },
  button: {
    backgroundColor: '#00a680',
    borderRadius: hScale(8),
    marginTop: hScale(10),
    paddingVertical: hScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isIphoneX ? hScale(20) : hScale(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
});
export default React.memo(UpdateScore);
