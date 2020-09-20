// SET_TEXT_FILTER

export const setTextFilter = (text = "") => ({
   type: "SET_TEXT_FILTER",
   text,
});

// SORT_BY_DATE

export const sortByDate = () => ({
   type: "SORT_BY_DATE",
});

// SORT_BY_AMOUNT

export const sortByAmount = () => ({
   type: "SORT_BY_AMOUNT",
});

// SET_START_DATE

export const setStartDate = (startDate) => ({
   type: "SET_START_DATE",
   startDate,
});

// SET_END_DATE

export const setEndDate = (endDate) => ({
   type: "SET_END_DATE",
   endDate,
});

export const setCategoryFilter = (category) => ({
   type: "SET_CATEGORY",
   category,
});

export const setPaymentMethodFilter = (payment_method) => ({
   type: "SET_PAYMENT_METHOD",
   payment_method,
});

export const setFilters = (filters) => ({
   type: "SET_FILTERS",
   filters,
});
