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
       setChannelsError: (state, action) => {
            state.error = action.payload;
          },
    }
});       

export const { addChannels, setChannelsError } = channelsSlice.actions;
export default channelsSlice.reducer;