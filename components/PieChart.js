import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { formatValue } from "../utils/index";

import Colors from "../constants/colors";

const CustomPieChart = ({ data, accessor, absolute, noDataMessage }) => {
   // Order by asscesor value

   if (data.length === 0) {
      return (
         <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{noDataMessage}</Text>
            <AntDesign name="piechart" size={100} color={Colors.primary} />
         </View>
      );
   }

   const sortedData = useMemo(() => {
      return data.sort((a, b) => b[accessor] - a[accessor]);
   }, [data]);

   const percentages = useMemo(() => {
      // Get the total value of all dataitems
      const grandTotal = data.reduce((acum, item) => acum + item[accessor], 0);

      return data.reduce((acum, item) => {
         const percentageOfDataItem = (item[accessor] * 100) / grandTotal;
         return {
            ...acum,
            [item.name]: percentageOfDataItem.toFixed(2),
         };
      }, {});
   }, [absolute, data, accessor]);

   return (
      <View style={styles}>
         <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
               backgroundColor: "#ffffff",
               backgroundGradientFrom: "white",
               backgroundGradientTo: "white",
               decimalPlaces: 2, // optional, defaults to 2dp
               color: (opacity = 1) => `rgba(54,64,81, ${opacity})`,
            }}
            accessor={accessor}
            backgroundColor="transparent"
            hasLegend={false}
            paddingLeft={Dimensions.get("window").width / 4}
         />
         <View style={styles.legend}>
            {sortedData.map((dataItem) => (
               <View style={styles.legendItem} key={dataItem.name}>
                  <FontAwesome name="circle" size={24} color={dataItem.color} />
                  <Text style={styles.legendItemValue}>
                     {absolute
                        ? dataItem[accessor]
                        : `${percentages[dataItem.name]}% - ${formatValue(
                             "currency",
                             dataItem[accessor] / 100
                          )}`}
                  </Text>

                  <Text>{dataItem.name}</Text>
               </View>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   emptyState: {
      height: 220,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
      borderRadius: 100,
      backgroundColor: Colors.darkGray,
   },
   emptyStateText: {
      marginVertical: 10,
      fontWeight: "bold",
      fontSize: 16,
   },
   legend: {
      marginHorizontal: 10,
   },
   legendItem: {
      flexDirection: "row",
   },
   legendItemValue: {
      marginHorizontal: 10,
   },
});

export default CustomPieChart;
