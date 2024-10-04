import { createSlice } from '@reduxjs/toolkit';
import initialSt from "../initialSt.js";

// Начальное значение
const initialState = {
     //set current chanal  = 1
     currentCh: initialSt.currentCh
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
       removeChannel: (state, action) => {
        const chId = action.payload.id;
        state.data = state.data.filter(ch => ch.id != chId); 
       // console.log("new state!");
       },
       renameChannel: (state, action) => {
        state.data = state.data.map(elem => elem.id === action.payload.id ? elem = action.payload : elem)
       }
         
    
    }
});       

export const { renameChannel, addChannel, addChannels, setChannelsError, setCurrentChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;