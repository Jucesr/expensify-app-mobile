import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const EmptyState = ({ text, icon, type = "FontAwesome" }) => {
   return (
      <View style={styles.emptyState}>
         <Text style={styles.emptyStateText}>{text}</Text>
         {type === "FontAwesome" ? (
            <FontAwesome name={icon} size={100} color={Colors.primary} />
         ) : (
            <AntDesign name={icon} size={100} color={Colors.primary} />
         )}
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
});

export default EmptyState;
