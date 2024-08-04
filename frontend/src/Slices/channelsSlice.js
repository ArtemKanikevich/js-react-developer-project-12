import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
    
       addChannels: (state, action) => {
           // console.log(action);
            state.data = action.payload;
        },
    }
});       

export const { addChannels } = channelsSlice.actions;
export default channelsSlice.reducer;