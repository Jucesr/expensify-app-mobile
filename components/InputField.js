import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Picker,
   DatePickerAndroid,
   TouchableOpacity,
   Switch,
} from "react-native";

import moment from "moment";

import Colors from "../constants/colors";
import { useTranslation } from "react-i18next";

const InputField = ({ label, textInputStyle, type = "text", ...rest }) => {
   const { t } = useTranslation();
   const renderInput = (type) => {
      switch (type) {
         case "textarea":
            return (
               <TextInput
                  style={{ ...styles.textInput, ...textInputStyle }}
                  multiline={true}
                  {...rest}
               />
            );

         case "select":
            return (
               <View style={styles.pickerContainer}>
                  <Picker
                     textStyle={{ fontSize: 8 }}
                     selectedValue={rest.value}
                     style={styles.picker}
                     onValueChange={(itemValue, itemIndex) =>
                        rest.onChangeText(itemValue)
                     }
                  >
                     {rest.options.map((option) => (
                        <Picker.Item
                           key={option.value}
                           label={option.label}
                           value={option.value}
                        />
                     ))}
                  </Picker>
               </View>
            );

         case "date":
            return (
               <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={async () => {
                     try {
                        const {
                           action,
                           year,
                           month,
                           day,
                        } = await DatePickerAndroid.open({
                           // Use `new Date()` for current date.
                           // May 25 2020. Month 0 is January.
                           date: rest.value
                              ? moment(rest.value).toDate()
                              : new Date(),
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                           // Selected year, month (0-11), day
                           rest.onChangeText(new Date(year, month, day));
                        }
                     } catch ({ code, message }) {
                        console.warn("Cannot open date picker", message);
                     }
                  }}
               >
                  <Text
                     style={{ ...styles.textInput, ...styles.dateTextInput }}
                  >
                     {rest.value
                        ? moment(rest.value).format("DD MMMM YYYY")
                        : t("InputField.placeholder")}
                  </Text>
               </TouchableOpacity>
            );

         case "currency":
            return (
               <TextInput
                  keyboardType="decimal-pad"
                  style={{ ...styles.textInput, ...styles.currencyInput }}
                  {...rest}
               />
            );
         case "check":
            return rest.options.map((option) => (
               <View style={styles.checkContainer} key={option.value}>
                  <Text style={styles.checkLabel}>{option.label}</Text>
                  <Switch
                     trackColor={{ true: Colors.primary }}
                     thumbColor={
                        Platform.OS === "android" ? Colors.primary : ""
                     }
                     value={rest.value[option.value]}
                     onValueChange={(newValue) => {
                        rest.onChange(newValue, option.value);
                     }}
                  />
               </View>
            ));

         default:
            return (
               <TextInput
                  style={{ ...styles.textInput, ...textInputStyle }}
                  {...rest}
               />
            );
      }
   };
   return (
      <View style={styles.field}>
         <Text style={styles.label}>{label}</Text>
         {renderInput(type)}
      </View>
   );
};

const styles = StyleSheet.create({
   field: {
      paddingHorizontal: 30,
      marginTop: 20,
   },
   label: {
      fontFamily: "montserrat-bold",
      color: Colors.blue,
      paddingBottom: 5,
   },
   textInput: {
      fontFamily: "roboto",
      backgroundColor: Colors.gray,
      borderColor: "#D2D2D2",
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 4,
      paddingHorizontal: 15,
   },
   pickerContainer: {
      backgroundColor: Colors.gray,
      borderColor: "#D2D2D2",
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 0,
      paddingVertical: 0,
      margin: 0,
   },
   picker: {
      margin: 0,
      fontFamily: "roboto",
      left: -10,
      transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
   },
   dateTextInput: {
      paddingVertical: 10,
   },
   checkContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginVertical: 5,
   },
   checkLabel: {
      paddingLeft: 30,
   },
});

export default InputField;
