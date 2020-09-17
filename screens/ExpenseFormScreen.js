import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Button,
   Picker,
   ScrollView,
   DatePickerAndroid,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButton";

import { addExpense, editExpense } from "../store/actions/expenses";

import Colors from "../constants/colors";
import labels from "../constants/labels";

const paymentMethodOptions = Object.keys(labels.es.payment_methods).map(
   (key) => {
      const item = labels.es.payment_methods[key];
      return {
         label: item,
         value: key,
      };
   }
);

const categoryOptions = Object.keys(labels.es.categories).map((key) => {
   const item = labels.es.categories[key];
   return {
      label: item,
      value: key,
   };
});

const ExpenseFormScreen = (props) => {
   const dispatch = useDispatch();

   const [isLoading, setIsLoading] = useState(false);
   const expense = props.route.params && props.route.params.expense;

   if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
   }
   return (
      <ScrollView contentContainerStyle={styles.screen}>
         <Formik
            initialValues={{
               payment_method: expense ? expense.payment_method : "cash",
               category: expense ? expense.category : "food",
               description: expense ? expense.description : "",
               amount: expense ? (expense.amount / 100).toString() : "",
               createdAt: expense ? expense.createdAt : moment(),
               note: expense ? expense.note : "",
            }}
            onSubmit={async (values) => {
               setIsLoading(true);
               const obj = {
                  ...values,
                  createdAt: values.createdAt.valueOf(),
                  amount: parseFloat(values.amount) * 100,
               };
               if (expense) {
                  // Edit mode

                  await dispatch(editExpense(expense.id, obj));
               } else {
                  // Add mode

                  await dispatch(addExpense(obj));
               }
               setIsLoading(false);
               props.navigation.goBack();
            }}
         >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               values,
               setFieldValue,
            }) => (
               <View>
                  <InputField
                     label="Método de pago"
                     type="select"
                     options={paymentMethodOptions}
                     value={values.payment_method}
                     onChangeText={(value) => {
                        setFieldValue("payment_method", value);
                     }}
                  />
                  <InputField
                     label="Categoria"
                     type="select"
                     value={values.category}
                     options={categoryOptions}
                     onChangeText={(value) => {
                        setFieldValue("category", value);
                     }}
                  />
                  <InputField
                     label="Nombre"
                     value={values.description}
                     onChangeText={handleChange("description")}
                     onBlur={handleBlur("description")}
                  />
                  <InputField
                     type="currency"
                     label="Costo"
                     value={values.amount}
                     onChangeText={handleChange("amount")}
                     onBlur={handleBlur("amount")}
                  />
                  <InputField
                     type="date"
                     label="Fecha"
                     value={values.createdAt}
                     onChangeText={(value) => {
                        setFieldValue("createdAt", value);
                     }}
                  />
                  <InputField
                     label="Descripción (opcional)"
                     value={values.note}
                     onChangeText={handleChange("note")}
                     onBlur={handleBlur("note")}
                     type="textarea"
                  />
                  <View style={styles.button}>
                     <Button onPress={handleSubmit} title="Aceptar" />
                  </View>
               </View>
            )}
         </Formik>
      </ScrollView>
   );
};

const InputField = ({ label, textInputStyle, type = "text", ...rest }) => {
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
                           date: new Date(),
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
                        : "Selecciona una fecha"}
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
   screen: { paddingBottom: 20 },
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
   button: {
      marginTop: 20,
      paddingHorizontal: 30,
   },
});

export const screenOptions = (navData) => {
   const expense = navData.route.params && navData.route.params.expense;
   return {
      headerTitle: expense
         ? labels.es.ExpenseFormScreen.editTitle
         : labels.es.ExpenseFormScreen.addTitle,
      // headerRight: (
      //    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //      <Item
      //        title="Save"
      //        iconName={
      //          Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
      //        }
      //        onPress={submitFn}
      //      />
      //    </HeaderButtons>
      //  )
   };
};

export default ExpenseFormScreen;
