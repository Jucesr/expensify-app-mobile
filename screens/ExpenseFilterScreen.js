import React, { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import moment from "moment";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import labels from "../constants/labels";
import InputField from "../components/InputField";
import HeaderButton from "../components/HeaderButton";

import { setFilters } from "../store/actions/filters";

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

const sortByOptions = Object.keys(labels.es.sort_by).map((key) => {
   const item = labels.es.sort_by[key];
   return {
      label: item,
      value: key,
   };
});

const ExpenseFilterScreen = (props) => {
   const filterState = useSelector((state) => state.filters);
   const dispatch = useDispatch();

   const formRef = useRef();

   useEffect(() => {
      props.navigation.setOptions({
         headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Item
                  title="Save"
                  iconName="md-save"
                  onPress={() => {
                     if (formRef.current) {
                        dispatch(setFilters(formRef.current.values));
                        props.navigation.goBack();
                     }
                  }}
               />
            </HeaderButtons>
         ),
      });
   }, [formRef]);

   return (
      <ScrollView contentContainerStyle={styles.screen}>
         <Formik
            innerRef={formRef}
            initialValues={filterState}
            onSubmit={(values) => {
               dispatch(setFilters(values));
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
                     label="Ordenar por"
                     type="select"
                     options={sortByOptions}
                     value={values.sortBy}
                     onChangeText={(value) => {
                        setFieldValue("sortBy", value);
                     }}
                  />
                  <InputField
                     label="Fecha de Inicio"
                     type="date"
                     value={values.startDate}
                     onChangeText={(value) => {
                        setFieldValue("startDate", value);
                     }}
                  />
                  <InputField
                     label="Fecha de Fin"
                     type="date"
                     value={values.endDate}
                     onChangeText={(value) => {
                        setFieldValue("endDate", value);
                     }}
                  />

                  <InputField
                     label="Categorias"
                     type="check"
                     value={values.categories}
                     options={categoryOptions}
                     onChange={(newValue, field) => {
                        setFieldValue("categories", {
                           ...values.categories,
                           [field]: newValue,
                        });
                     }}
                  />
                  <InputField
                     label="Métodos de pago"
                     type="check"
                     value={values.paymentMethods}
                     options={paymentMethodOptions}
                     onChange={(newValue, field) => {
                        setFieldValue("paymentMethods", {
                           ...values.paymentMethods,
                           [field]: newValue,
                        });
                     }}
                  />
               </View>
            )}
         </Formik>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   screen: { paddingBottom: 20 },
   button: {
      marginTop: 20,
      paddingHorizontal: 30,
   },
});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ExpenseFilterScreen.title,
   };
};

export default ExpenseFilterScreen;
