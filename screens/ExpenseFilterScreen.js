import React, { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useTranslation } from "react-i18next";

import categories from "../constants/categories";
import sortBy from "../constants/sortBy";
import paymentMethods from "../constants/paymentMethods";
import InputField from "../components/InputField";
import HeaderButton from "../components/HeaderButton";

import { setFilters } from "../store/actions/filters";

const ExpenseFilterScreen = (props) => {
   const filterState = useSelector((state) => state.filters);
   const dispatch = useDispatch();
   const formRef = useRef();
   const { t } = useTranslation();

   const paymentMethodOptions = paymentMethods.map((key) => {
      const item = t(`payment_methods.${key}`);
      return {
         label: item,
         value: key,
      };
   });

   const categoryOptions = categories.map((key) => {
      const item = t(`categories.${key}`);
      return {
         label: item,
         value: key,
      };
   });

   const sortByOptions = sortBy.map((key) => {
      const item = t(`sort_by.${key}`);
      return {
         label: item,
         value: key,
      };
   });

   useEffect(() => {
      props.navigation.setOptions({
         headerTitle: t(`ExpenseFilterScreen.title`),
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
                     label={t("ExpenseFilterScreen.labels.order_by")}
                     type="select"
                     options={sortByOptions}
                     value={values.sortBy}
                     onChangeText={(value) => {
                        setFieldValue("sortBy", value);
                     }}
                  />
                  <InputField
                     label={t("ExpenseFilterScreen.labels.start_date")}
                     type="date"
                     value={values.startDate}
                     onChangeText={(value) => {
                        setFieldValue("startDate", value);
                     }}
                  />
                  <InputField
                     label={t("ExpenseFilterScreen.labels.end_date")}
                     type="date"
                     value={values.endDate}
                     onChangeText={(value) => {
                        setFieldValue("endDate", value);
                     }}
                  />

                  <InputField
                     label={t("ExpenseFilterScreen.labels.category")}
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
                     label={t("ExpenseFilterScreen.labels.payment_method")}
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
   return {};
};

export default ExpenseFilterScreen;
