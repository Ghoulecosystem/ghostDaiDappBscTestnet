import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";
Vue.config.productionTip = false
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import JwPagination from 'jw-vue-pagination';
import VTooltip from 'v-tooltip'

Vue.component('jw-pagination', JwPagination);
Vue.use(VueToast , {position : 'top-right'});
Vue.use(VTooltip)

Vue.component('topmenu', require('./components/topmenu.vue').default);
Vue.component('loader', require('./components/loader.vue').default);
Vue.component('vault', require('./components/vault.vue').default);
Vue.component('vaultdetails', require('./components/vaultdetails.vue').default);
Vue.component('depositecollateral', require('./components/depositecollateral.vue').default);
Vue.component('withdrawcollateral', require('./components/withdrawcollateral.vue').default);
Vue.component('borrowtoken', require('./components/borrowToken.vue').default);
Vue.component('repaytoken', require('./components/repayToken.vue').default);
Vue.component('transfervault', require('./components/transfervault.vue').default);
Vue.component('monitor', require('./components/monitor.vue').default);
Vue.component('swapcom', require('./components/swapcom.vue').default);
Vue.component('farmapp', require('./components/farmapp.vue').default);
Vue.component('bnbvault', require('./components/bnbvault.vue').default);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
