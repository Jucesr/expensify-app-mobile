import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const data = [14858.91, 17435.59, 55574.81, 4716.39, 26380.01, 18664.31];

const line = {
   // labels: ['Ene 20', 'Feb 20', 'Mar 20', 'Abr 20', 'May 20', 'Jun 20', 'Jul 20', 'Ago 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dic 20'],
   labels: ["Ene 20", "Feb 20", "Mar 20", "Abr 20", "May 20", "Jun 20"],
   datasets: [
      {
         // data: [14858.91, 17435.59, 55574.81, 4716.39, 26380.01, 18664.31, 9999.37, 8530.73, 2272.43, 2272.43, 2272.43, 2272.43],
         data: data,
         strokeWidth: 1, // optional
      },
   ],
};

const MonthReportScreen = (props) => {
   const highestValue = data.reduce((acum, item) => {
      if (item > acum) return item;
      else return acum;
   }, 0);

   const highestValueIndex = data.findIndex((item) => item === highestValue);

   return (
      <View style={styles}>
         {" "}
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
                        fontSize: 12,
                     }}
                     key={index}
                  >
                     {formatValue("currency", data[index])}
                  </Text>
               );
            }}
            style={{
               marginVertical: 8,
               borderRadius: 16,
               paddingRight: 64,
               // paddingLeft: 64
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({});

export default MonthReportScreen;
