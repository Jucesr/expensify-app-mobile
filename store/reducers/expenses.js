//Expenses Reducer

const expensesReducerDefaultState = [
   {
      amount: 12200,
      category: "food",
      createdAt: 1598637224559,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
   {
      amount: 6000,
      category: "food",
      createdAt: 1598468400000,
      description: "Tacos de guisado",
      note: "",
      payment_method: "cash",
   },
   {
      amount: 15350,
      category: "food",
      createdAt: 1598295600000,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
   {
      amount: 12200,
      category: "food",
      createdAt: 1598637224559,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
   {
      amount: 6000,
      category: "food",
      createdAt: 1598468400000,
      description: "Tacos de guisado",
      note: "",
      payment_method: "cash",
   },
   {
      amount: 15350,
      category: "food",
      createdAt: 1598295600000,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
   {
      amount: 12200,
      category: "food",
      createdAt: 1598637224559,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
   {
      amount: 6000,
      category: "food",
      createdAt: 1598468400000,
      description: "Tacos de guisado",
      note: "",
      payment_method: "cash",
   },
   {
      amount: 15350,
      category: "food",
      createdAt: 1598295600000,
      description: "Florido",
      note: "",
      payment_method: "credit_card",
   },
];

export default (state = [], action) => {
   switch (action.type) {
      case "ADD_EXPENSE":
         return [...state, action.expense];
         break;

      case "REMOVE_EXPENSE":
         return state.filter((expense) => action.id != expense.id);
         break;

      case "EDIT_EXPENSE":
         return state.map((expense) => {
            if (expense.id === action.id) {
               return {
                  ...expense,
                  ...action.updates,
               };
            } else {
               return expense;
            }
         });
         break;

      case "SET_EXPENSES":
         return action.expenses;
         break;

      default:
         return state;
   }
};
