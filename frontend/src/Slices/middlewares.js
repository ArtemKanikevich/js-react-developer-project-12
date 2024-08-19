import axios from 'axios';
import paths from "../routes.js";

export const getNewData = (store) => (next) => async (action) => {   
    if (action.type === 'messages/addMessage') {
      
        const token = localStorage.getItem("userIdToken");
        
       // const newMessage = { body: text, channelId: '1', username: 'admin' }; // admin!!!!
        try {
          const response = await axios.post(paths.messagesPath(), action.payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(`New message from post: `, response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
          action.payload = response.data;
    
        } catch (err) {
          console.error(err);
          store.dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
          throw err;
        }  

    }
  
    return next(action);
  };
  