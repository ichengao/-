<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { requestGetAccountInfo,requestGetDictList } from '@/services/service'
export default {
    name: 'App',
    mounted(){
        let _this = this;
        requestGetAccountInfo().then(function(res){
          if(res.data.code == '0000'){
            _this.$store.dispatch('updataUserInfo',res.data.data)
          }
        });
          requestGetDictList().then(res=>{
              this.$store.dispatch('setDictList',res.data.data);
          });
    }
}
</script>
