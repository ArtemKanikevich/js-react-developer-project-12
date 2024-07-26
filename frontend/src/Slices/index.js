import { configureStore } from '@reduxjs/toolkit';
import autorizReducer from './autorizSlice.js';

export default configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    auth: autorizReducer,
  },
});