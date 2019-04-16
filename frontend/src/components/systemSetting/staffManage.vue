<template>
    <div class="container staff-manage-container">
        <div class="section-aside">
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/responsibilityManage'" active-class="active">岗位权限管理</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/staffDetailManage'" active-class="active">员工管理</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/operatorManage'" active-class="active">操作员管理</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/operatorLogManage'" active-class="active">操作日志</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/loginLogManage'" active-class="active">登录日志</router-link>
            <router-link :to="'/systemSetting/'+currentId+'/staffManage/changeShiftsManage'" active-class="active">交接班记录</router-link>
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
        mounted(){
            this.currentId = this.$route.params.id;
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .container{
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
