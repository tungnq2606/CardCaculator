import Realm from 'realm';

const User = {
  name: 'User',
  embedded: true,
  properties: {
    id: {type: 'string', indexed: true},
    name: 'string',
  },
};

const RoundSchema = {
  name: 'Rounds',
  properties: {
    id: {type: 'string', indexed: true},
    users: {
      type: 'list',
      objectType: 'User',
    },
    status: {type: 'bool', default: false},
    createAt: {type: 'date', default: new Date()},
  },
  primaryKey: 'id',
};

const TransactionSchema = {
  name: 'Transactions',
  properties: {
    id: {type: 'string', indexed: true},
    userId: 'string',
    roundId: 'string',
    currentScore: {type: 'int', default: 0},
    score: {type: 'list', objectType: 'int'},
    createAt: {type: 'date', default: new Date()},
  },
  primaryKey: 'id',
};

export default new Realm({
  schema: [RoundSchema, TransactionSchema,User],
});
