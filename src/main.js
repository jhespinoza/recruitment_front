import Vue from 'vue'
import App from './App.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import router from './router'

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false
Vue.component('DataTable', DataTable)
Vue.component('Column', Column);
Vue.component('Panel', Panel);
Vue.component('Menubar', Menubar);
Vue.component('Dialog', Dialog);
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Toast',Toast);

Vue.use(ToastService);

var token = localStorage.getItem('token');
if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
