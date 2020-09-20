import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { replaceAll, formatValue } from "../utils";

import labels from "../constants/labels";
import Colors from "../constants/colors";

import { LineChart } from "react-native-chart-kit";

const Chart = ({ line, data, title }) => {
   return (
      <View style={styles.chart}>
         <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>{title}</Text>
         </View>
         <LineChart
            data={line}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel={"$"}
            withHorizontalLabels={false}
            verticalLabelRotation={30}
            chartConfig={{
               backgroundColor: "#ffffff",
               backgroundGradientFrom: "white",
               backgroundGradientTo: "white",
               decimalPlaces: 2, // optional, defaults to 2dp
               color: (opacity = 1) => `rgba(54,64,81, ${opacity})`,
               style: {
                  borderRadius: 16,
               },
               propsForVerticalLabels: {
                  fontSize: "10",
               },
            }}
            bezier
            renderDotContent={({ x, y, index }) => {
               return (
                  <Text
                     style={{
                        position: "absolute",
                        left: x,
                        top: y,
                        fontSize: 8,
                     }}
                     key={index}
                  >
                     {formatValue("currency", data[index])}
                  </Text>
               );
            }}
            style={{
               // marginVertical: 8,
               borderRadius: 16,
               paddingRight: 20,
               // paddingLeft: 64
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   chart: {
      paddingBottom: 20,

      backgroundColor: "white",
   },
   chartTitleContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
   },
   chartTitle: {
      color: Colors.blue,
      fontWeight: "bold",
      fontSize: 18,
   },
});

export default Chart;
