import database from '../../firebase/firebase';

export const addCategory = (itemData = {}) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
         parent_id = '',
         code = '',
         englishDescription = '',
         spanishDescription = '',
         createdAt = 0,
      } = itemData;

      const item = {
         parent_id,
         code,
         spanishDescription,
         englishDescription,
         createdAt,
      };

      return database
         .ref(`users/${uid}/categories`)
         .push(item)
         .then((ref) => {
            dispatch({
               type: 'ADD_CATEGORY',
               category: {
                  id: ref.key,
                  ...item,
               },
            });
         });
   };
};

export const removeCategory = (id) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/categories/${id}`)
         .remove()
         .then(() => {
            dispatch({
               type: 'REMOVE_CATEGORY',
               id,
            });
         });
   };
};

export const editCategory = (id, updates) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/categories/${id}`)
         .update(updates)
         .then(() => {
            dispatch({
               type: 'EDIT_CATEGORY',
               id,
               updates,
            });
         });
   };
};

export const setCategories = () => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/categories`)
         .once('value')
         .then((snapshot) => {
            //Parsing
            const categories = [];
            snapshot.forEach((childSnapshot) => {
               categories.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
               });
            });

            dispatch({
               type: 'SET_CATEGORIES',
               categories: categories,
            });
         });
   };
};
