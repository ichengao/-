// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from '../containers/index.vue'
import router from '../router/index'
import axios from 'axios'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Cascader,
  Dialog,
  select,
  Option,
  Upload,
  Table,
  TableColumn,
  DatePicker,
  Checkbox,
  RadioButton,
  Tree,
  Switch,
  Pagination,
    Tooltip,
    TimeSelect,
    Tabs,
    tabPane,
    row,
    col
} from 'element-ui'
import qs from 'qs';
import store from '../vuex/store';
import * as filters from '@/common/filter'

Vue.use(row);
Vue.use(col);
Vue.use(Tabs);
Vue.use(tabPane);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Tree);
Vue.use(RadioButton);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cascader);
Vue.use(Dialog);
Vue.use(select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(TimeSelect);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 6000;
    let token = localStorage.getItem('access_token');
    if (token) {
      config.headers.authorization = token
    }

    if(config.method === 'post' && (config.headers['Content-Type'] != false) ){
        if(config.url != '/zv-member/zv/purchase/stock' && config.url != '/zv-member/zv/staff/addrole'){
            config.data = qs.stringify(config.data)
        }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  response => {
    if(response.headers.authorization){
      localStorage.setItem('access_token',response.headers.authorization);
    }
    return response
  },
  error => {
    try{
      if(error.response.data.code == '3001' || error.response.status == 403){
        window.location.href='/login.html'
      }
    }catch(e){

    }

    return Promise.reject(error)
  }
)

new Vue({
  el: '#app',
  router,
  store,
  components: { index },
  template: '<index/>'
})
