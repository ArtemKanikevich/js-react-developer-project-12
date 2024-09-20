import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from "./channelsSlice.js";

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
        setMessagesError: (state, action) => {
            state.error = action.payload;
          },
        addMessage: (state, action) => {
            // console.log(action);
             state.data = [...state.data, action.payload];
         },  
    },
    extraReducers: (builder) => { 
            builder.addCase(removeChannel, (state, action) => {
                const chId = action.payload.id;
                state.data = state.data.filter(elem => elem.channelId != chId)
         })        
    }

});    

export const { addMessages, setMessagesError, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;