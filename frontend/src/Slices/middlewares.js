import { addUnRead, addUnRead_am } from "./channelsSlice.js";

export const setUnreadCh = (store) => (next) => (action) => {   
  const state = store.getState(); 
    // add in unReadArr during active program  
    if (action.type === 'messages/addMessage') {     
     // Test
    // action.payload.channelId = "2";

     const newChId = action.payload.channelId;
     const newMesId = action.payload.id;
  
       // test !!!
      // mesArr.push({body: "XXX", channelId: "2", username: "admin", removable: true,
     // id: "67" });
     
     //reload maxIdChArr
     let maxIdChArr = JSON.parse(localStorage.getItem("maxIdChArr"));
     console.log("maxIdChArr", maxIdChArr);

     if (maxIdChArr) {
      //find chId in maxIdChArr
       const curObj = maxIdChArr.find(elem => elem.chId === newChId)
       if (curObj) curObj.maxId = newMesId;
       else// this is first mes in channel, add new obj^
       maxIdChArr.push({chId: newChId, maxId: newMesId});
     }
     else // the first mes in app
       maxIdChArr = [{chId: newChId, maxId: newMesId}];
      //save to local storage
      localStorage.setItem('maxIdChArr', JSON.stringify(maxIdChArr));
             
     //check is't curent ch      
     if (state.channels.currentCh != newChId) {
      //find the same chId
        if( !state.channels.unRead.find(elem => elem === newChId))
         //add new Chid to store
          store.dispatch(addUnRead(newChId));
         //save to local storage in render
        // localStorage.setItem('unReadChId', state.channels.unRead); 
     }       
    }
    // add in unReadArr during app load 
    if (action.type === 'messages/addMessages') {
      // arr : [{chId: X, maxMesId: Y}}
      const maxIdChArr = JSON.parse(localStorage.getItem("maxIdChArr"));
      const mesArr = action.payload;   
          
       // is't new load
        if (maxIdChArr) {   
          // find new messages    
          maxIdChArr.forEach(elem => 
          {   
            if(mesArr.find(mesObj => elem.chId === mesObj.channelId &&
            mesObj.id > elem.maxId)) 
             //check is"t curent ch ?    
             if (state.channels.currentCh != elem.chId) {
              //add new chId to store
              if( !state.channels.unRead.find(elem => elem === elem.chId))
                store.dispatch(addUnRead(elem.chId));
             }                    
          });
          //find new ch
          mesArr.forEach(mesObj => 
          { 
           if( !maxIdChArr.find(elem => elem.chId === mesObj.channelId))
              //add new chId to store         
             if( !state.channels.unRead.find(elem => elem === mesObj.channelId))
                store.dispatch(addUnRead(mesObj.channelId));
           
          });         
        } 
        else {  //  new load
           //all channels if we have messages (New load)
          if (mesArr) 
          {
            const tempArr = mesArr.map(mesObj => mesObj.channelId);
            const uniqueArr = [...new Set(tempArr)];
            console.log(uniqueArr);
            // add all chId to store
            store.dispatch(addUnRead_am(uniqueArr));

            //create maxIdChArr
            const maxIdChArr = uniqueArr.map(chId => {
              let maxId = 0; 
              mesArr.forEach(mesObj => { 
                if ((mesObj.channelId === chId) && (Number(mesObj.id) > maxId))
                   maxId =  Number(mesObj.id);
              })
              return { chId, maxId }; 
            });
           //console.log(maxIdChArr);
           localStorage.setItem('maxIdChArr', JSON.stringify(maxIdChArr));
           
          }
        }     
    }
  
    return next(action);
  };
  