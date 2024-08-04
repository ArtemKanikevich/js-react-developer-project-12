import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
    
       addMessages: (state, action) => {
           // console.log(action);
            state.data = action.payload;
        },
    }
});       

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;