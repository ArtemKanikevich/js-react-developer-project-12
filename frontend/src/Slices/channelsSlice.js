import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
     //set current chanal  = 1
     currentCh: "1"
};

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
       setCurrentChannel: (state, action) => {
            state.currentCh = action.payload;
       },
       addChannel: (state, action) => {
          // console.log(action);
           state.data = [...state.data, action.payload];
       },     
    
    }
});       

export const { addChannel, addChannels, setChannelsError, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;