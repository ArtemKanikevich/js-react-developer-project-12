import { configureStore } from "@reduxjs/toolkit";
import autorizReducer from "./autorizSlice.js";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";

export default configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    auth: autorizReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
