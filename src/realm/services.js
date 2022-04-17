import Realm from 'realm';
import realm from './database';

const {UUID} = Realm.BSON;

export const getRound = () => {
  const data = realm
    .objects('Rounds')
    .filtered('status = false')
    .sorted('createAt')[0]
    .toJSON();
  return {
    isStart: data.length > 0,
    data,
  };
};

export const insertRound = users => {
  try {
    const round = {
      id: new UUID().toHexString(),
      users,
    };
    realm.write(() => {
      realm.create('Rounds', round);
    });
    return round;
  } catch (error) {}
};

export const createTransaction = users => {
  let transactions = [];
  for (let val of users.users) {
    try {
      const transaction = {
        id: new UUID().toHexString(),
        userId: val.id,
        roundId: users.id,
        score: [0],
      };
      realm.write(() => {
        realm.create('Transactions', transaction);
      });
      transactions.push(transaction);
    } catch (error) {}
  }
  return transactions;
};

export const getAllTransaction = users => {
  let arr = [];
  for (let val of users) {
    const data = realm
      .objects('Transactions')
      .filtered('userId = $0', val.id)
      .toJSON();
    arr.push(data[0]);
  }
  return arr;
};

export const updateScore = (id, score) => {
  const data = realm.objects('Transactions').filtered('id = $0 ', id);
  realm.write(() => {
    data[0].score.push(score);
    data[0].currentScore = score;
  });
  return data[0].toJSON();
};
