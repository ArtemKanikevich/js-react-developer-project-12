import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from "./channelsSlice.js";
import initialSt from "../initialSt.js";

// Начальное значение
const initialState = {
    visibleItems: initialSt.visibleItems
};

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
         loadMoreItems: (state, action) => {
            if (!action.payload) state.visibleItems = state.visibleItems + 30;
            else state.visibleItems = action.payload;
       },  
    },
    extraReducers: (builder) => { 
            builder.addCase(removeChannel, (state, action) => {
                const chId = action.payload.id;
                state.data = state.data.filter(elem => elem.channelId != chId)
         })        
    }

});    

export const { addMessages, setMessagesError, addMessage, loadMoreItems } = messagesSlice.actions;
export default messagesSlice.reducer;