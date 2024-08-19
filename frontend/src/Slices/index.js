import { configureStore } from "@reduxjs/toolkit";
import autorizReducer from "./autorizSlice.js";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import { getNewData } from "./middlewares.js";

export default configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    auth: autorizReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },

  //middleware: (getDefaultMiddleware) =>
   // getDefaultMiddleware().concat([getNewData]),
});
