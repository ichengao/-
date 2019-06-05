<template>
    <div class="container-header container-header-desk">
        <div class="container-header-lf">
            <img :src="shopLogoPath ? shopLogoPath : defaultImage" alt="">
            <span class="shop-name">{{shopBrand}}</span>
        </div>
        <div class="container-header-center">
            <ul>
                <li class="return-home" v-if="currentPage" @click="changeCashierPage">返回首页</li>
                <li class="tab-money" v-else @click="changeCashierPage">收银台</li>
                <li class="tab-card" @click="openMemberCardModal">会员开卡</li>
                <li class="tab-pay" @click="changePage">会员充值</li>
            </ul>
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
import defaultImage from '@/assets/images/icon_logo.png';
export default {
    data(){
        return{
            userMsg: {},     // 用户数据
            currentPage: true,
            defaultImage: defaultImage
        }
    },
    mounted(){
        this.initData();
        this.currentPage = this.$route.name == 'cashier' ? true : false;
    },
    computed: {
        adminName: {
            get(){
                return this.$store.state.userInfo.adminName
            }
        },
        shopBrand: {
            get(){
                return this.$store.state.userInfo.shopBrand
            }
        },
        shopLogoPath: {
            get(){
                return this.$store.state.userInfo.shopLogoPath
            }
        },
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'd':
                    this.handleExit()
                    break;
                default:;
            }
        },
        initData(){
            let userMsg = sessionStorage.getItem('userMsg')
            this.userMsg = Object.assign({},JSON.parse(userMsg));
        },
        // 会员开卡弹框
        openMemberCardModal(){
            this.$store.dispatch('opencreateMemberCardStatus')
        },
        // 页面跳转
        changePage(){
            let params = this.$route.params.id
            this.$router.push(`/shopdetail/${params}/charge/chargeMoney`)
        },
        changeCashierPage(){
            if(this.currentPage){
                this.$router.push(`/`);
            }else{
                let params = this.$route.params.id;
                this.$router.push(`/cashier/${params}`);
            }
        },
        handleExit(){
            localStorage.removeItem('access_token');
            window.location.href='./login.html';
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
        background: $color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 0 30px;
        font-size: 16px;
        z-index: 100;
        box-shadow: 0 5px 10px -5px rgba(165,165,165,.3);
        color: #fff;
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
            ul{
                display: flex;
                height: 100%;
                align-items: center;
                li{
                    list-style: none;
                    padding:0 10px 0 45px;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    &.tab-money{
                        background: url('../../../assets/images/icon_desk.png') 10px center no-repeat;
                        background-size: 25px;
                    }
                    &.tab-card{
                        background: url('../../../assets/images/icon_card.png') 10px center no-repeat;
                        background-size: 25px;
                    }
                    &.tab-pay{
                        background: url('../../../assets/images/icon_pay.png') 10px center no-repeat;
                        background-size: 25px;
                    }
                    &:hover{
                        background-color: rgba(255,255,255,.2);
                    }
                }
            }
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
                color: #fff;
            }

            .user-box{
                display: flex;
                align-items: center;
                cursor: pointer;
                padding-top: 3px;
                padding-right: 30px;
                color: #fff;
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
