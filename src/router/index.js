import Vue from 'vue'
import VueRouter from 'vue-router'

import vaultmenu from '../views/vaultmenu.vue'
// import Home from '../views/home.vue'
import monitor from '../views/monitor.vue'
import prifi from '../views/prifi.vue'
import farm from '../views/farm.vue'
import swap from '../views/swap.vue'
import vaults from '../views/vaults.vue'
import bnbVault from '../views/bnbVault.vue'
import NotFoundComponent from '../components/NotFoundComponent'
Vue.use(VueRouter)



let routes = [
    
  
  { path: '/', component: vaults },
  { path: '/vaultmenu/:id',name: 'vaultmenu', component: vaultmenu },
  { path: '/monitor', component: monitor },
  { path: '/prifi', component: prifi },
  { path: '/farm', component: farm },
  { path: '/swap', component: swap },
  { path: '/vaults', component: vaults },
  { path: '/bnbvault', component: bnbVault },
  { 
    path: '/:catchAll(.*)', 
    component: NotFoundComponent,
    name: 'NotFound'
  } 
   ]
   
   const router = new VueRouter({
       mode: 'history',
     routes // short for `routes: routes`
   })


export default router
