import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const FilterButton = ({ text, onPress, name, active }) => (
   <TouchableOpacity
      onPress={onPress}
      style={{
         ...styles.filterButton,
         backgroundColor: name === active ? Colors.grayBorder : Colors.darkGray,
      }}
   >
      <Text style={styles.filterButtonText}>{text}</Text>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
   filterButton: {
      borderColor: Colors.grayBorder,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "white",
      marginHorizontal: 10,
      marginVertical: 10,
   },
   filterButtonText: {
      textAlign: "center",
   },
});

export default FilterButton;
