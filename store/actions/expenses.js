import database from "../../firebase/firebase";

export const addExpense = (expenseData = {}) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
         payment_method = "",
         category = "",
         description = "",
         note = "",
         amount = 0,
         createdAt = 0,
      } = expenseData;

      const expense = {
         payment_method,
         category,
         description,
         note,
         amount,
         createdAt,
      };
      console.log(uid);
      return database
         .ref(`users/${uid}/expenses`)
         .push(expense)
         .then((ref) => {
            dispatch({
               type: "ADD_EXPENSE",
               expense: {
                  id: ref.key,
                  ...expense,
               },
            });
         });
   };
};

export const removeExpense = (id) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/expenses/${id}`)
         .remove()
         .then(() => {
            dispatch({
               type: "REMOVE_EXPENSE",
               id,
            });
         });
   };
};

export const editExpense = (id, updates) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/expenses/${id}`)
         .update(updates)
         .then(() => {
            dispatch({
               type: "EDIT_EXPENSE",
               id,
               updates,
            });
         });
   };
};

export const setExpenses = () => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database
         .ref(`users/${uid}/expenses`)
         .once("value")
         .then((snapshot) => {
            //Parsing
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
               expenses.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
               });
            });

            dispatch({
               type: "SET_EXPENSES",
               expenses: expenses,
            });
         });
   };
};
