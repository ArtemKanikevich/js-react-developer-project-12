import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
    userIdToken: "",
    logIn: false,
    error: "",
};

const autorizSlice = createSlice({
  name: 'auth',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setLogIn: (state) => {
      state.logIn = true;
    },
    removeLogIn: (state) => {
      state.logIn = false;
    },    
    setLogError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLogIn, removeLogIn, setLogError } = autorizSlice.actions;
// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default autorizSlice.reducer;