<template>
    <div>
        <div class="section-position">
            <span>当前位置：</span> 工作台
        </div>

        <div class="section-shop-list">
            <div class="section-shop-title">
                <p>
                    <span>欢迎登录</span><span>工作台</span>
                </p>
                <p>
                    <span>极致工作</span>
                    <span>乐享生活！</span>
                </p>
            </div>
            <div class="section-shop-wrap">
                <ul>
                    <li v-for="(item,idx) in shopList" :key="idx">
                        <div class="list-detail">
                            <img :src="item.shopLogoPath ? item.shopLogoPath : shopLogoPath" alt="">
                            <p class="list-name">{{item.shopName}}</p>
                            <p class="list-day">剩余天数：<span>{{item.remainDays}}</span>天</p>
                            <router-link :to="'/shopdetail/'+item.shopId">进入门店</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { requestShopList } from '../../services/service';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { UPDATE_SHOP_LIST } from '@/components/eventEmitter/eventName'
export default {
    name: 'shopList',
    data(){
        return{
            shopList: [],     // 门店列表
        }
    },
    created(){
        this.initData()
    },
    mounted(){
        EventBus.$on(UPDATE_SHOP_LIST,res=>{
            this.initData()
        })
    },
    computed: {
        shopLogoPath: {
            get(){
                return this.$store.state.userInfo.shopLogoPath
            }
        },
    },
    methods: {
        // 初始化数据，获取列表
        initData(){
            requestShopList().then(res=>{
                this.shopList = res.data.data.shop;
                this.$store.dispatch('UpdateShopList',[res.data.data.shop]);
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/common.scss';

    .section-position{
        padding: 20px 30px;
        span{
            color:#ababab;
        }
    }
    .section-shop-list{
        margin: 0 30px 30px;
        background: #fff;
        border-radius: 5px;
        min-height: 600px;
        .section-shop-title{
            padding-top: 50px;
            p{
                text-align: center;
                &:first-child{
                    font-size: 48px;
                    color: #4a4a4a;
                    span{
                        &:last-child{
                            color: $color;
                        }
                    }
                }
                &:last-child{
                    font-size: 20px;
                    color: #909090;
                    letter-spacing: 10px;
                    margin-top: 5px;
                }
            }
        }
        .section-shop-wrap{
            padding: 0 120px;
            margin-top: 40px;
            ul{
                display: flex;
                align-items: center;
                flex-wrap:wrap;
                li{
                    list-style: none;
                    width: 240px;
                    margin:0 10.5px 30px;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 5px;
                    box-shadow: 0 0 15px rgba(165,45,1,.2);
                    .list-detail{
                        position: relative;
                        top: 0;
                        text-align: center;
                        padding: 30px;
                        transition: all 0.1s;
                        &:hover{
                            top: -100px;
                        }
                        img{
                            height: 55px;
                            width: auto;
                            margin: 10px;
                        }
                        .list-name{
                            font-size: 18px;
                            font-weight: 700;
                            color: #4a4a4a;
                            margin-bottom: 5px;
                            margin-top:15px;
                        }
                        .list-day{
                            font-size: 14px;
                            color: #909090;
                            margin-top: 10px;
                        }
                        a{
                            color: #ff855a;
                            font-size: 16px;
                            display: inline-block;
                            border-radius: 3px;
                            position: relative;
                            padding: 8px 45px 8px 45px;
                            border: 1px solid $color;
                            margin-top: 40px;
                            font-size: 18px;
                            cursor: pointer;
                            transition: all 0.2s;
                            &:hover{
                                background: $color;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
