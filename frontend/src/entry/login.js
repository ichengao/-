import Vue from 'vue';
import App from '../containers/login.vue';
import router from '../router/login';
import { Button,Form,Input,Checkbox,FormItem, } from 'element-ui';
import 'babel-polyfill';
import axios from 'axios'
import qs from 'qs'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(FormItem)

axios.interceptors.request.use((config)=>{
  if(config.method === 'post'){
    config.data = qs.stringify(config.data)
  }
  return config
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
