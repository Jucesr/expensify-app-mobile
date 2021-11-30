export default {
   es: {
      translation: {
         LoginScreen: {
            button: 'Iniciar sesión con Google',
            slogan: 'Llegó el momento de controlar tus gastos',
         },
         ExpenseListScreen: {
            title: 'Gastos',
            searchInputPlaceholder: 'Escribe para buscar',
            expenseColTitle: 'Gasto',
            amountColTitle: 'Costo',
            loadMore: 'Cargar más',
            totalMessage:
               'Viendo <0>{{expenseCount}}</0> gastos, un total de <0>{{expenseTotal}}</0>',
         },
         ExpenseFormScreen: {
            addTitle: 'Agregar Gasto',
            editTitle: 'Editar Gasto',
            confirmTitle: '¿Estás seguro?',
            confirmMessage: 'Se borrará el gasto',
            labels: {
               payment_method: 'Método de pago',
               category: 'Categoria',
               name: 'Nombre',
               amount: 'Costo',
               date: 'Fecha',
               description: 'Descripción (opcional)',
            },
         },
         categories: {
            food: 'Alimentación',
            bills: 'Cuentas y pagos',
            housing: 'Casa',
            clothing: 'Ropa',
            health: 'Salud e Higiene',
            leisure: 'Diversión',
            transport: 'Transporte',
            travel: 'Viáticos',
            kids: 'Hijos',
            other: 'Otros',
         },
         payment_methods: {
            cash: 'Efectivo',
            credit_card: 'Tarjeta de crédito',
            debit_card: 'Tarjeta de débito',
            vouchers: 'Vales',
            other: 'Otro',
         },
         sort_by: {
            date: 'Fecha',
            amount: 'Monto',
         },
         languages: {
            es: 'Español',
            en: 'Ingles',
         },
         ProfileScreen: {
            title: 'Perfil',
            signOut: 'Cerrar sesión',
            expenseTotalMessage: 'Total de gastos',
            expenseCountMessage: 'Número de gastos',
            inputText: 'Idioma',
         },
         ExpenseFilterScreen: {
            title: 'Filtros',
            labels: {
               order_by: 'Ordenar por',
               start_date: 'Fecha de Inicio',
               end_date: 'Fecha de Fin',
               category: 'Categorias',
               payment_method: 'Métodos de pago',
            },
         },
         ReportsScreen: {
            title: 'Reportes',
            byMonth: 'Reportes por mes',
            byCategory: 'Reportes por categoria',
            byPaymentMethod: 'Reportes por método de pago',
            filterSection: {
               exactDate: 'Fecha exacta',
               startDate: 'Fecha de inicio',
               endDate: 'Fecha de fin',
               month: 'Mes',
               week: 'Semana',
               day: 'Días',
               year: 'Año',
            },
            filterButtons: {
               viewMore: 'Ver más',
               all: 'Todo',

               thisYear: 'Este año',
               lastYear: 'Hace 1 año',
               twoYear: 'Hace 2 años',
               threeYear: 'Hace 3 años',

               thisMonth: 'Este mes',
               lastMonth: 'Hace 1 mes',
               twoMonth: 'Hace 2 meses',
               threeMonth: 'Hace 3 meses',

               thisWeek: 'Esta semana',
               lastWeek: 'Semana pasada',
               twoWeek: 'Hace 2 semanas',

               thisDay: 'Hoy',
               lastDay: 'Ayer',
               twoDay: 'Hace 2 días',

               last7Days: 'Últimos 7 días',
               last15Days: 'Últimos 15 días',
               last30Days: 'Últimos 30 días',
            },
         },
         ReportMonthScreen: {
            title: 'Reportes por mes',
            chartTitle: 'Gastos totales',
         },
         ReportCategoryScreen: {
            title: 'Reportes por categoria',
            noDataMessage: 'No hay gastos en este rango',
            viewMore: 'Ver más',
         },
         ReportPaymentMethodScreen: {
            title: 'Reportes por método de pago',
            noDataMessage: 'No hay gastos en este rango',
            viewMore: 'Ver más',
         },
         InputField: {
            placeholder: 'Selecciona una fecha',
         },
         Tabs: {
            expenses: 'GASTOS',
            reports: 'REPORTES',
            profile: 'PERFIL',
         },
      },
   },
   en: {
      translation: {
         LoginScreen: {
            button: 'Sign in With Google',
            slogan: "It's time to control your expenses",
         },
         ExpenseListScreen: {
            title: 'Expenses',
            searchInputPlaceholder: 'Type to search',
            expenseColTitle: 'Expense',
            amountColTitle: 'Amount',
            loadMore: 'Load more',
            totalMessage:
               'Seeing <0>{{expenseCount}}</0> expenses, totalling <0>{{expenseTotal}}</0>',
         },
         ExpenseFormScreen: {
            addTitle: 'Add Expense',
            editTitle: 'Edit Expense',
            confirmTitle: 'Are you sure?',
            confirmMessage: 'It will delete it forever',
            labels: {
               payment_method: 'Payment Method',
               category: 'Category',
               name: 'Name',
               amount: 'Amount',
               date: 'Date',
               description: 'Description (optional)',
            },
         },
         ProfileScreen: {
            title: 'Profile',
            signOut: 'Sign out',
            expenseTotalMessage: "Expense's total",
            expenseCountMessage: "Expense's count",
            inputText: 'Language',
         },
         languages: {
            es: 'Spanish',
            en: 'English',
         },
         categories: {
            food: 'Food',
            bills: 'Bills',
            housing: 'Housing',
            clothing: 'Clothing',
            health: 'Health',
            leisure: 'Leisure',
            transport: 'Transport',
            travel: 'Travel',
            kids: 'Childrens',
            other: 'Other',
         },
         payment_methods: {
            cash: 'Cash',
            credit_card: 'Credit card',
            debit_card: 'Debit card',
            vouchers: 'Vouchers',
            other: 'Other',
         },
         sort_by: {
            date: 'Date',
            amount: 'Amount',
         },
         ExpenseFilterScreen: {
            title: 'Filters',
            labels: {
               order_by: 'Order by',
               start_date: 'Start Date',
               end_date: 'End Date',
               category: 'Category',
               payment_method: 'Payment method',
            },
         },
         ReportsScreen: {
            title: 'Reports',
            byMonth: 'Reports by month',
            byCategory: 'Reports by category',
            byPaymentMethod: 'Reports by payment method',
            filterSection: {
               exactDate: 'Date range',
               startDate: 'Start date',
               endDate: 'End date',
               month: 'Month',
               week: 'Week',
               day: 'Day',
               year: 'Year',
            },
            filterButtons: {
               viewMore: 'View more',
               all: 'All',
               thisYear: 'This year',
               lastYear: 'Last year',
               twoYear: '2 years ago',
               threeYear: '3 years ago',

               thisMonth: 'This month',
               lastMonth: 'Last month',
               twoMonth: '2 months ago',
               threeMonth: '3 months ago',

               thisWeek: 'This week',
               lastWeek: 'Last week',
               twoWeek: '2 weeks ago',

               thisDay: 'Today',
               lastDay: 'Yesterday',
               twoDay: '2 days ago',

               last7Days: 'Last 7 days',
               last15Days: 'Last 15 days',
               last30Days: 'Last 30 days',
            },
         },
         ReportMonthScreen: {
            title: 'Reports by month',
            chartTitle: "Expense's total",
         },
         ReportCategoryScreen: {
            title: 'Reports by category',
            noDataMessage: 'There are not expenses in this range',
         },
         ReportPaymentMethodScreen: {
            title: 'Reports by payment method',
            noDataMessage: 'There are not expenses in this range',
         },
         InputField: {
            placeholder: 'Pick a date',
         },
         Tabs: {
            expenses: 'EXPENSES',
            reports: 'REPORTS',
            profile: 'PROFILE',
         },
      },
   },
};
