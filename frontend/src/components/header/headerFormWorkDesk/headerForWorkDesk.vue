<template>
    <div class="container-header container-header-desk">
        <div class="container-header-lf">
            <img src="../../../assets/images/icon_logo.png" alt="">
            <span class="shop-name">合肥卡旺卡</span>
            <div class="shop-type" >
                <span v-if="shopNum == 1">单店版</span>
                <span v-else>连锁版</span>
            </div>
            <span class='shop-create' @click="openCreateShopModal">创建门店</span>
        </div>
        <div class="container-header-center">
            <router-link to="/" :class="currentUrl == 0 ?'active' : ''">工作台</router-link>
            <router-link to="/setting" :class="currentUrl == 1 ?'active' : ''">设置</router-link>
        </div>
        <div class="container-header-right">
            <div class="shop-warn el-icon-bell"></div>
            <div class="shop-user">
                <el-dropdown @command="handleCommand">
                    <div class="el-dropdown-link user-box">
                        <img src="../../../assets/images/icon-user.jpeg" alt="" class="user-image">
                        <span>{{adminName}}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="dropdown">
                        <el-dropdown-item command="a">使用帮助</el-dropdown-item>
                        <el-dropdown-item command="b">在线客服</el-dropdown-item>
                        <el-dropdown-item command="c">电话客服</el-dropdown-item>
                        <el-dropdown-item command="d" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            shopType: 0,     // 0 单店版  1连锁版
            currentUrl: 0,   // 0 工作台  1设置
            userMsg: {},     // 用户数据
        }
    },
    mounted(){
        this.initData()
    },
    computed: {
        shopNum: {
            get(){
                return this.$store.state.userInfo.shopNum
            }
        },
        adminName: {
            get(){
                return this.$store.state.userInfo.adminName
            }
        }
    },
    watch: {
        '$route': function(to, from) {
            this.currentUrl = this.$route.name == 'shopList' ? 0 : 1
        }
    },
    methods: {
        handleCommand(command) {
            console.log(command)
        },
        initData(){
            this.currentUrl = this.$route.name == 'shopList' ? 0 : 1;
            let userMsg = sessionStorage.getItem('userMsg')
            this.userMsg = Object.assign({},JSON.parse(userMsg));
        },
        // 打开创建门店弹框
        openCreateShopModal(){
            this.$store.dispatch('opencreateShopModal')
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    
    .container-header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 55px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 0 30px;
        font-size: 16px;
        z-index: 100;
        box-shadow: 0 5px 10px -5px rgba(165,165,165,.3);
        .container-header-lf{
            display: flex;
            align-items: center;
            img{
                height: 40px;
            }
            .shop-name{
                font-size: 20px;
                margin-left: 10px;
            }
            .shop-type{
                border: 1px solid #818181;
                padding: 3px 6px;
                margin-left: 20px;
                border-radius: 3px;
                color: #8a8a8a;
            }
            .shop-create{
                color: $color;
                margin-left: 20px;
                cursor: pointer;
            }
        }
        .container-header-center{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            z-index: -1;
            font-size: 18px;
            a{
                padding-left: 30px;
                margin-right: 20px;
                &.active{
                    color: $color;
                    &:first-child{
                        background: url('../../../assets/images/icon-desk-on.png') 0 0 no-repeat;
                        background-size: 25px auto; 
                    }
                    &:last-child{
                        background: url('../../../assets/images/icon-set-on.png') 0 0 no-repeat;
                        background-size: 25px auto;
                    }
                }
                &:first-child{
                    background: url('../../../assets/images/icon-desk-off.png') 0 0 no-repeat;
                    background-size: 25px auto;
                }
                &:last-child{
                    background: url('../../../assets/images/icon-set-off.png') 0 0 no-repeat;
                    background-size: 25px auto;
                }
            }
        }
        .container-header-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .shop-warn{
                font-size: 28px;
                margin-right: 20px;
                cursor: pointer;
                color: #4a4a4a;
            }

            .user-box{
                display: flex;
                align-items: center;
                cursor: pointer;
                padding-top: 3px;
                padding-right: 30px;
                .user-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
<style lang="scss">
    .container-header-desk{
        .dropdown{
            width: 100px;
            text-align: center;
        }
    }
</style>
