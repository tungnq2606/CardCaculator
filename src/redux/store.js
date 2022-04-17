import { configureStore } from '@reduxjs/toolkit';
import roundReducer from '../screen/slice/RoundSlice'

const store = configureStore({
    reducer: {
      round: roundReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  
  export default store;