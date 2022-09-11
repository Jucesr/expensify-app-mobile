import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
   View,
   StyleSheet,
   Alert,
   ScrollView,
   ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import InputField from '../components/InputField';
import HeaderButton from '../components/HeaderButton';
import {
   addExpense,
   editExpense,
   removeExpense,
} from '../store/actions/expenses';
import paymentMethods from '../constants/paymentMethods';
import categories from '../constants/categories';

import {useTranslation} from 'react-i18next';

const getSubCategories = (category, sub_categories) => {
   const cats = sub_categories.filter((c) => c.parent_id === category);
   const options = cats ? cats : [];
   return [
      {
         label: 'Selecciona una subcategoría',
         value: '',
      },
      ...options.map((opt) => ({
         label: opt.spanishDescription,
         value: opt.code,
      })),
   ];
};

const getCards = (payment_method, cards) => {
   if (payment_method !== 'credit_card') {
      return [];
   }
   return [
      {
         label: 'Selecciona una tarjeta',
         value: '',
      },
      ...cards.map((opt) => ({
         label: `${opt.name} ${opt.number}`,
         value: opt.id,
      })),
   ];
};

const ExpenseFormScreen = (props) => {
   const dispatch = useDispatch();
   const {t} = useTranslation();

   const [isLoading, setIsLoading] = useState(false);
   const expense = props.route.params && props.route.params.expense;
   const sub_categories = useSelector((state) => state.categories);
   const cards = useSelector((state) => state.cards);
   const formRef = useRef();

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

   useEffect(() => {
      props.navigation.setOptions({
         headerTitle: t(
            `${
               expense
                  ? 'ExpenseFormScreen.editTitle'
                  : 'ExpenseFormScreen.addTitle'
            }`,
         ),
         headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Item
                  title="Save"
                  iconName="md-save"
                  onPress={async () => {
                     if (formRef.current) {
                        const values = formRef.current.values;
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
                     }
                  }}
               />
               {expense && (
                  <Item
                     title="Delete"
                     iconName="md-trash"
                     onPress={() => {
                        Alert.alert(
                           t('ExpenseFormScreen.confirmTitle'),
                           t('ExpenseFormScreen.confirmMessage'),
                           [
                              {
                                 text: 'Cancel',
                                 style: 'cancel',
                              },
                              {
                                 text: 'OK',
                                 onPress: async () => {
                                    // Delete expense
                                    setIsLoading(true);
                                    await dispatch(removeExpense(expense.id));
                                    setIsLoading(false);
                                    props.navigation.goBack();
                                 },
                              },
                           ],
                           {cancelable: false},
                        );
                     }}
                  ></Item>
               )}
            </HeaderButtons>
         ),
      });
   }, [formRef, t]);

   if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
   }
   return (
      <ScrollView contentContainerStyle={styles.screen}>
         <Formik
            innerRef={formRef}
            initialValues={{
               payment_method: expense ? expense.payment_method : 'cash',
               category: expense ? expense.category : 'food',
               sub_category: expense ? expense.sub_category : '',
               card_id: expense ? expense.card_id : '',
               description: expense ? expense.description : '',
               amount: expense ? (expense.amount / 100).toString() : '',
               createdAt: expense ? expense.createdAt : moment(),
               note: expense ? expense.note : '',
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
            }) => {
               const subCategoryOptions = getSubCategories(
                  values.category,
                  sub_categories,
               );
               const cardOptions = getCards(values.payment_method, cards);
               return (
                  <View>
                     <InputField
                        label={t('ExpenseFormScreen.labels.payment_method')}
                        type="select"
                        options={paymentMethodOptions}
                        value={values.payment_method}
                        onChangeText={(value) => {
                           setFieldValue('payment_method', value);
                        }}
                     />
                     {values.payment_method === 'credit_card' && (
                        <InputField
                           label={t('ExpenseFormScreen.labels.card')}
                           type="select"
                           options={cardOptions}
                           value={values.card_id}
                           onChangeText={(value) => {
                              setFieldValue('card_id', value);
                           }}
                        />
                     )}
                     <InputField
                        label={t('ExpenseFormScreen.labels.category')}
                        type="select"
                        value={values.category}
                        options={categoryOptions}
                        onChangeText={(value) => {
                           setFieldValue('category', value);
                        }}
                     />
                     <InputField
                        label={t('ExpenseFormScreen.labels.sub_category')}
                        type="select"
                        value={values.sub_category}
                        options={subCategoryOptions}
                        onChangeText={(value) => {
                           setFieldValue('sub_category', value);
                        }}
                     />
                     <InputField
                        label={t('ExpenseFormScreen.labels.name')}
                        value={values.description}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                     />
                     <InputField
                        label={t('ExpenseFormScreen.labels.amount')}
                        type="currency"
                        value={values.amount}
                        onChangeText={handleChange('amount')}
                        onBlur={handleBlur('amount')}
                     />
                     <InputField
                        label={t('ExpenseFormScreen.labels.date')}
                        type="date"
                        value={values.createdAt}
                        onChangeText={(value) => {
                           setFieldValue('createdAt', value);
                        }}
                     />
                     <InputField
                        label={t('ExpenseFormScreen.labels.description')}
                        value={values.note}
                        onChangeText={handleChange('note')}
                        onBlur={handleBlur('note')}
                        type="textarea"
                     />
                  </View>
               );
            }}
         </Formik>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   screen: {paddingBottom: 20},
   button: {
      marginTop: 20,
      paddingHorizontal: 30,
   },
});

export const screenOptions = (navData) => {
   const expense = navData.route.params && navData.route.params.expense;
   return {};
};

export default ExpenseFormScreen;
