import Vue from 'vue';
import App from '../containers/register.vue';
import router from '../router/register';
import { Button,Form,Input,Checkbox,FormItem, } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
import axios from 'axios'
import qs from 'qs'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(FormItem)

// axios.interceptors.response.use(
//   response => {  //成功请求到数据
//     console.log(response)
//   },
//   error => {  //响应错误处理
      
//   }
// );
axios.interceptors.request.use((config)=>{
  if(config.method === 'post'){
    config.data = qs.stringify(config.data)
  }
  return config
})

Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
