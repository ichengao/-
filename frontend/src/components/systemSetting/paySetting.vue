<template>
    <div class="container pay-setting-container">
        <div class="section-aside">
            <router-link :to="'/systemSetting/'+currentId+'/paySetting/bindPayWay'" active-class="active">绑定支付渠道</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/paySetting/paySettingDetail'" active-class="active">支付设置</router-link>
        </div>
        <div class="section-aside-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentId: ''
            }
        },
        mounted() {
            this.currentId = this.$route.params.id;
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .pay-setting-container{
        display: flex;
        margin-top: 10px;
        .section-aside{
            width: 170px;
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            a{
                width: 100%;
                padding: 10px 0 10px 40px;
                margin: 10px 0;
                border-right: 3px solid transparent;
                &.active{
                    border-right: 3px solid $color;
                    background: rgb(255,235,232);
                }
            }
        }
        .section-aside-content{
            flex: 1;
            margin-left: 10px;
        }
    }
</style>
