import React, { useState, useEffect } from "react";
import {
   View,
   StyleSheet,
   Text,
   Button,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import moment from "moment";

import Colors from "../constants/colors";
import labels from "../constants/labels";
import { formatValue } from "../utils/index";

const OFFSET_VALUE = 5;

const ExpensesList = (props) => {
   const { expenses, locale } = props;

   const [offset, setOffset] = useState(OFFSET_VALUE);

   const expensesToRender = expenses.slice(0, offset);

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
         <ScrollView style={styles.tableBody}>
            {expensesToRender.map((expense, index) => (
               <TouchableOpacity
                  activeOpacity={0.6}
                  key={index}
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
            ))}
            {offset < expenses.length && (
               <View style={styles.button}>
                  <Button
                     color={Colors.blue}
                     title={labels[locale].ExpenseListScreen.loadMore}
                     onPress={() => {
                        setOffset(offset + OFFSET_VALUE);
                     }}
                  />
               </View>
            )}
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   table: {
      // flex: 1,
      width: "95%",
      marginTop: 10,
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
      height: "80%",
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
