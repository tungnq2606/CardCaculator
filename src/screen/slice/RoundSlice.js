import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createTransaction,
  getAllTransaction,
  getRound,
  insertRound,
  updateScore,
} from '../../realm/services';

const initialState = {data: {}, isStart: true, transaction: [], numberUser: 0};

export const fetchRound = createAsyncThunk('round/getLastRound', async () => {
  return getRound();
});

export const newRound = createAsyncThunk('round/newRound', async users => {
  const round = insertRound(users);
  const transactions = createTransaction(round);
  return {round, transactions};
});

export const fetchAllTransaction = createAsyncThunk(
  'transaction/getAllTransaction',
  async users => {
    return getAllTransaction(users);
  },
);

export const changeScore = createAsyncThunk(
  'transaction/changeScore',
  async ({id, score}) => {
    return updateScore(id, score);
  },
);

export const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers:{
    setNumberUser: (state, action) => {
      state.numberUser = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchRound.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isStart = action.payload.isStart;
    });
    builder.addCase(newRound.fulfilled, (state, action) => {
      state.data = action.payload.round;
      state.transaction = action.payload.transactions;
      state.isStart = true;
    });
    builder.addCase(fetchAllTransaction.fulfilled, (state, action) => {
      state.transaction = action.payload;
    });
    builder.addCase(changeScore.fulfilled, (state, action) => {
      state.transaction = state.transaction.map(item => {
        if (item.id === action.payload.id) {
          item.score = action.payload.score;
        }
        return item;
      });
    });
  },
});

export const {setNumberUser} = roundSlice.actions;

export default roundSlice.reducer;
