import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import labels from "../constants/labels";
import Colors from "../constants/colors";
import navigation from "../constants/navigation";
import Chart from "../components/Chart";

import moment from "moment";
import capitalize from "lodash/capitalize";
import times from "lodash/times";
import { replaceAll, formatValue } from "../utils";

import { useHeaderHeight } from "@react-navigation/stack";

const getDateAsText = (date) => {
   const text = date.format("MMMM");
   return capitalize(replaceAll(text, "\\.", ""));
};

const ReportMonthScreen = (props) => {
   const [today, setToday] = useState(moment().startOf("month"));
   const expenses = useSelector((state) => state.expenses);

   const sixMonthAgo = moment(today).subtract(5, "month");

   const sixMonthAgoLabels = times(6, (n) => {
      return moment(sixMonthAgo).add(n, "month").format("MMM YY");
   });

   const filterByDate = (expense) => {
      let isValid = true;
      if (
         moment(expense.createdAt).isBefore(sixMonthAgo.startOf("month")) ||
         moment(expense.createdAt).isAfter(today.endOf("month"))
      ) {
         isValid = false;
      }
      return isValid;
   };

   const filterByCategory = (category) => (expense) => {
      let isValid = true;
      if (
         moment(expense.createdAt).isBefore(sixMonthAgo.startOf("month")) ||
         moment(expense.createdAt).isAfter(today.endOf("month"))
      ) {
         isValid = false;
      }
      if (expense.category !== category) {
         isValid = false;
      }
      return isValid;
   };

   const dataFunction = useCallback(
      (filterFunc) => () => {
         // Get the expenses that in range.
         const expensesInRange = expenses.filter(filterFunc);

         const sixMonthAgoObj = times(6, (n) => {
            return moment(sixMonthAgo).add(n, "month").format("YYYYMM");
         }).reduce((acum, key) => {
            return {
               ...acum,
               [key]: {
                  monthString: key,
               },
            };
         }, {});

         // Get the total of each month
         const rawData = expensesInRange.reduce((acum, expense) => {
            const month = moment(expense.createdAt).startOf("month");
            let total = 0;
            total = expense.amount / 100;
            const monthString = month.format("YYYYMM");
            const label = month.format("MMM YY");
            return {
               ...acum,
               [monthString]: acum[monthString]
                  ? {
                       ...acum[monthString],
                       total:
                          (acum[monthString].total
                             ? acum[monthString].total
                             : 0) + total,
                       label,
                       monthString,
                    }
                  : { total, label, monthString },
            };
         }, sixMonthAgoObj);

         // Order data by month
         return Object.keys(rawData)
            .map((key) => {
               const item = rawData[key];
               return item;
            })
            .sort((a, b) => {
               const aInt = parseInt(a.monthString);
               const bInt = parseInt(b.monthString);
               return aInt - bInt;
            });
      },
      [expenses, today]
   );

   const dataObj = useMemo(dataFunction(filterByDate), [expenses, today]);
   const foodDataObj = useMemo(dataFunction(filterByCategory("food")), [
      expenses,
      today,
   ]);
   const billsDataObj = useMemo(dataFunction(filterByCategory("bills")), [
      expenses,
      today,
   ]);
   const houseDataObj = useMemo(dataFunction(filterByCategory("housing")), [
      expenses,
      today,
   ]);
   const clothingDataObj = useMemo(dataFunction(filterByCategory("clothing")), [
      expenses,
      today,
   ]);
   const healthDataObj = useMemo(dataFunction(filterByCategory("health")), [
      expenses,
      today,
   ]);
   const leisureDataObj = useMemo(dataFunction(filterByCategory("leisure")), [
      expenses,
      today,
   ]);
   const tranportDataObj = useMemo(
      dataFunction(filterByCategory("transport")),
      [expenses, today]
   );
   const travelDataObj = useMemo(dataFunction(filterByCategory("travel")), [
      expenses,
      today,
   ]);
   const otherDataObj = useMemo(dataFunction(filterByCategory("other")), [
      expenses,
      today,
   ]);

   const getLine = useCallback(
      (data) => ({
         labels: sixMonthAgoLabels,
         datasets: [
            {
               data: data,
               strokeWidth: 1, // optional
            },
         ],
      }),
      [sixMonthAgoLabels]
   );

   const getTotal = useCallback((d) => (d.total ? d.total : 0));

   const newData = dataObj.map(getTotal);
   const foodData = foodDataObj.map(getTotal);
   const billsData = billsDataObj.map(getTotal);
   const houseData = houseDataObj.map(getTotal);
   const clothingData = clothingDataObj.map(getTotal);
   const healthData = healthDataObj.map(getTotal);

   const leisureData = leisureDataObj.map(getTotal);
   const transportData = tranportDataObj.map(getTotal);
   const travelData = travelDataObj.map(getTotal);
   const otherData = otherDataObj.map(getTotal);

   const headerHeight = useHeaderHeight();

   const resultHeight =
      Dimensions.get("window").height -
      40 -
      navigation.BOTTOM_TAB_HEIGHT -
      headerHeight;
   return (
      <View style={styles}>
         <View style={styles.header}>
            <Button
               text="<"
               onPress={() => {
                  setToday(moment(today).subtract(1, "month"));
               }}
            />
            <Text>
               {getDateAsText(sixMonthAgo)} - {getDateAsText(today)}
            </Text>
            <Button
               text=">"
               onPress={() => {
                  setToday(moment(today).add(1, "month"));
               }}
            />
         </View>

         <ScrollView
            style={{
               height: resultHeight,
            }}
         >
            <Chart
               title={labels.es.ReportMonthScreen.chartTitle}
               line={getLine(newData)}
            />
            <Chart title={labels.es.categories.food} line={getLine(foodData)} />
            <Chart
               title={labels.es.categories.bills}
               line={getLine(billsData)}
            />
            <Chart
               title={labels.es.categories.housing}
               line={getLine(houseData)}
            />
            <Chart
               title={labels.es.categories.clothing}
               line={getLine(clothingData)}
            />
            <Chart
               title={labels.es.categories.health}
               line={getLine(healthData)}
            />
            <Chart
               title={labels.es.categories.leisure}
               line={getLine(leisureData)}
            />
            <Chart
               title={labels.es.categories.transport}
               line={getLine(transportData)}
            />
            <Chart
               title={labels.es.categories.travel}
               line={getLine(travelData)}
            />
            <Chart
               title={labels.es.categories.other}
               line={getLine(otherData)}
            />
         </ScrollView>
      </View>
   );
};

const Button = ({ text, onPress }) => {
   return (
      <TouchableOpacity onPress={onPress}>
         <Text style={styles.button}>{text}</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 40,
      backgroundColor: Colors.gray,
      height: 40,
   },
   button: {
      fontSize: 24,
   },
   chartContainer: {
      // height: "90%",
   },
});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ReportMonthScreen.title,
   };
};

export default ReportMonthScreen;
