import { addUnRead, addUnRead_am } from "./channelsSlice.js";

export const setUnreadCh = (store) => (next) => (action) => {   
  const state = store.getState(); 
    // add in unReadArr during active program  
    if (action.type === 'messages/addMessage') {     
     // Test
    // action.payload.channelId = "2";
     let newChId = action.payload.channelId;
     const newMesId = action.payload.id;  
       // test !!!
      // mesArr.push({body: "XXX", channelId: "2", username: "admin", removable: true,
     // id: "21" });
     //newChId = "17";
     
     //reload maxIdChArr
     let maxIdChArr = JSON.parse(localStorage.getItem("maxIdChArr"));
     console.log("maxIdChArr", maxIdChArr);
    //refresh maxIdChArr
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
             
     //refresh unRead //check is't curent ch      
     if (state.channels.currentCh != newChId) {
      //find the same chId
        if( !state.channels.unRead.find(id => id === newChId))
         //add new Chid to store
          store.dispatch(addUnRead(newChId));
         //save to local storage in render
        // localStorage.setItem('unReadChId', state.channels.unRead); 
     }       
    }
    // add in unReadArr during app load 
    if (action.type === 'messages/addMessages') {
      // arr : [{chId: X, maxMesId: Y}}
        let maxIdChArr = JSON.parse(localStorage.getItem("maxIdChArr"));
        const unRead = JSON.parse(localStorage.getItem("unRead"));
        const mesArr = action.payload;
        const curCh = state.channels.currentCh;
        console.log("unRead: ",unRead);
        console.log("curCh:", curCh);   

      // test !!!
     //  mesArr.push({body: "PROV", channelId: "14", username: "admin", removable: true,
     // id: "26" });

      //take UnRead from local storage
      //  if (unRead) store.dispatch(addUnRead_am(unRead));               
       //  1) is't new load
        if (maxIdChArr) {          
          //refresh unRead // find new messages        
          maxIdChArr.forEach(elem => 
          {   
             //check is"t curent ch ?    
            if (curCh != elem.chId) 
            {
              if(mesArr.find(mesObj => (elem.chId === mesObj.channelId) &&
              (mesObj.id > elem.maxId))) 
             {            
              //add new chId to store
              if( !state.channels.unRead.find(id => id === elem.chId))                 
                store.dispatch(addUnRead(elem.chId));              
             }   
            }                  
          });
          //find message in new ch
          mesArr.forEach(mesObj => 
          { 
           if( !maxIdChArr.find(elem => elem.chId === mesObj.channelId))
              //add new chId to store         
             if( !state.channels.unRead.find(id => id === mesObj.channelId)) {
               //console.log("mesObj.channelId", mesObj.channelId);
              // console.log("maxIdChArr", maxIdChArr);
                store.dispatch(addUnRead(mesObj.channelId));
             }  
           
          });   
                  
        }         
         // reload maxIdChArr   
        if (mesArr) 
          {            
            const tempArr = mesArr.map(mesObj =>  mesObj.channelId);
            //без дублей 
            const uniqueArr = [...new Set(tempArr)]; 
            //без curCh
            const unReadArr = uniqueArr.filter(elem => elem != curCh);         
             // 2) new load - add all chId to store
            if(!maxIdChArr) 
              store.dispatch(addUnRead_am(unReadArr));
           
              maxIdChArr = uniqueArr.map(chId => {
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

    //add remove ch !!!!!!!!!
  
    return next(action);
  };
  