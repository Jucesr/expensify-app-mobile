import React, { useState, useEffect, useCallback } from "react";
import {
   View,
   StyleSheet,
   Text,
   Button,
   ScrollView,
   FlatList,
   TouchableOpacity,
} from "react-native";
import moment from "moment";

import Colors from "../constants/colors";
import labels from "../constants/labels";
import { formatValue } from "../utils/index";

import { useDispatch } from "react-redux";
import { setExpenses } from "../store/actions/expenses";

const OFFSET_VALUE = 5;

const ExpensesList = (props) => {
   const { expenses, locale } = props;

   const [offset, setOffset] = useState(OFFSET_VALUE);

   const expensesToRender = expenses.slice(0, offset);

   const [isRefreshing, setIsRefreshing] = useState(false);

   const dispatch = useDispatch();

   const loadExpenses = useCallback(async () => {
      setIsRefreshing(true);
      try {
         await dispatch(setExpenses());
      } catch (err) {
         console.log(err);
         //   setError(err.message);
      }
      setIsRefreshing(false);
   }, [dispatch]);

   return (
      <View style={styles.table}>
         <View style={styles.tableHeader}>
            <Text style={styles.tableColumnText}>
               {labels[locale].ExpenseListScreen.expenseColTitle}
            </Text>
            <Text style={styles.tableColumnText}>
               {labels[locale].ExpenseListScreen.amountColTitle}
            </Text>
         </View>
         <FlatList
            onRefresh={loadExpenses}
            refreshing={isRefreshing}
            style={styles.tableBody}
            data={expensesToRender}
            keyExtractor={(item) => item.id}
            renderItem={({ item: expense }) => (
               <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                     props.onItemPress(expense);
                  }}
               >
                  <View style={styles.tableBodyItem}>
                     <View style={styles.itemPart}>
                        <Text style={styles.description}>
                           {expense.description}
                        </Text>
                        <Text style={styles.category}>
                           {labels[locale].categories[expense.category]}
                        </Text>
                        <Text style={styles.date}>
                           {moment(expense.createdAt)
                              .locale(locale)
                              .format("MMMM Do , YYYY")}
                        </Text>
                     </View>
                     <View style={styles.tableBodyItemRight}>
                        <Text style={styles.amount}>
                           {formatValue("currency", expense.amount / 100)}
                        </Text>
                        <Text style={styles.paymentMethod}>
                           {
                              labels[locale].payment_methods[
                                 expense.payment_method
                              ]
                           }
                        </Text>
                     </View>
                  </View>
               </TouchableOpacity>
            )}
            ListFooterComponent={() =>
               offset < expenses.length && (
                  <View style={styles.button}>
                     <Button
                        color={Colors.blue}
                        title={labels[locale].ExpenseListScreen.loadMore}
                        onPress={() => {
                           setOffset(offset + OFFSET_VALUE);
                        }}
                     />
                  </View>
               )
            }
         />
      </View>
   );
};

const styles = StyleSheet.create({
   table: {
      // flex: 1,
      width: "95%",
   },
   tableHeader: {
      borderWidth: 1,
      borderColor: Colors.grayBorder,
      flexDirection: "row",
      backgroundColor: Colors.gray,
      justifyContent: "space-between",
      padding: 10,
   },
   tableColumnText: {
      color: Colors.primary,
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "roboto",
   },
   tableBody: {
      borderWidth: 1,
      borderColor: Colors.grayBorder,
      borderTopWidth: 0,
      height: "75%", // TODO: FIX THIS. This is the height
   },
   tableBodyItem: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: Colors.grayBorder,
   },
   description: {
      textAlign: "left",
      fontFamily: "roboto-bold",
      fontSize: 16,
   },
   category: {
      textAlign: "left",
      fontFamily: "roboto",
      fontSize: 14,
   },
   date: {
      textAlign: "left",
      fontFamily: "roboto-blackitalic",
      color: Colors.grayBorder,
      fontSize: 14,
   },
   amount: {
      fontSize: 16,
      textAlign: "right",
      fontFamily: "roboto-bold",
   },
   paymentMethod: {
      textAlign: "right",
      fontFamily: "roboto",
      fontSize: 14,
   },
});

export default ExpensesList;
