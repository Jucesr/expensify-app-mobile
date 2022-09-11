import database from '../../firebase/firebase';

export const addCard = (itemData = {}) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {name = '', number = '', pay_date = '', amount = 0} = itemData;

      const item = {
         name,
         number,
         pay_date,
         amount,
      };

      return database
         .ref(`users/${uid}/cards`)
         .push(item)
         .then((ref) => {
            dispatch({
               type: 'ADD_CARD',
               card: {
                  id: ref.key,
                  ...item,
               },
            });
         });
   };
};

export const removeCard = (id) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/cards/${id}`)
         .remove()
         .then(() => {
            dispatch({
               type: 'REMOVE_CARD',
               id,
            });
         });
   };
};

export const editCard = (id, updates) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/cards/${id}`)
         .update(updates)
         .then(() => {
            dispatch({
               type: 'EDIT_CARD',
               id,
               updates,
            });
         });
   };
};

export const setCards = () => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/cards`)
         .once('value')
         .then((snapshot) => {
            //Parsing
            const cards = [];
            snapshot.forEach((childSnapshot) => {
               cards.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
               });
            });

            dispatch({
               type: 'SET_CARDS',
               cards: cards,
            });
         });
   };
};
