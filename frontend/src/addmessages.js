// add auto messages
import axios from "axios";
import paths from "./routes.js";

export const getAmount = (text) => {
  let amount = 0;
    if (text.startsWith("/insert-")) {
      if (Number(text.slice(8))) 
        {
        amount = Number(text.slice(8))
        console.log("amount: ",amount);
        return amount;
        }
      else {
        console.log("Convert error");  
        return false;
      }  
    } 
    else return false;
}

const sendMessage = async (messageObj, token) =>{          
    //         
    try {
      const response = await axios.post(paths.messagesPath(), messageObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(`New message ${i} was sent `, response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
      return true;          
         
    } catch (err) {
      console.error(err);     
      return false;
      //throw err;
    }
  };


export const insertMessages = async (amount, currentCh, userName, token, setLoading) => {
    setLoading(true); 
    const messageTemp = "Auto message  № ";
    try {       
     for(let i=1; i<= amount; i++){
        const newMessage = { body: messageTemp+i, channelId: currentCh, username: userName };
        if(!sendMessage(newMessage, token)) break;
     }
    } catch (err) {
      console.error(err); 
    } finally {
        setLoading(false);  
    }    

}