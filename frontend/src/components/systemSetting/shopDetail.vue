<template>
    <div class="container shop-detail-container">
        <div class="section-header">
            <div class="section-header-logo">
                <img :src="initDataObj.shopLogoPath ? initDataObj.shopLogoPath : defaultLogoPath " alt="">
                <p>安徽雪儿教育</p>
            </div>
            <ul class="section-header-list">
                <li>{{ initDataObj.shopId }}</li>
                <li>{{ initDataObj.adminMobile }}</li>
                <li>{{ initDataObj.email }}</li>
                <li>{{ initDataObj.deadDate | timeStampTrans }}</li>
            </ul>
        </div>
        <div class="section-content">
            <ul>
                <li><span>店铺信息</span><span class="btn-change" @click="handleOpenUpdateShopModal">【修改】</span></li>
                <li><span>店铺名称</span><span>{{ initDataObj.shopName }}</span></li>
                <li><span>店主姓名</span><span>{{ initDataObj.shopManager }}</span></li>
                <li><span>行业类型</span><span>{{ initDataObj.businessBelong }}</span></li>
                <li><span>店铺简称</span><span>{{ initDataObj.simpleName }}</span></li>
                <li><span>店铺电话</span><span>{{ initDataObj.shopTel }}</span></li>
                <li><span>注册时间</span><span>{{ initDataObj.createDate | timeStampTrans }}</span></li>
                <li><span>店铺地址</span><span>{{ initDataObj.address }}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { requestGetShopDetail } from '@/services/service';
    import defaultLogoPath from '@/assets/images/icon_logo_white.png';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_SHOP_DETAIL } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                initDataObj: {},
                defaultLogoPath: defaultLogoPath
            }
        },
        mounted(){
            this.initData();
            EventBus.$on(UPDATE_SHOP_DETAIL,()=>{
                this.initData();
            })
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetShopDetail(params).then((res)=>{
                    this.initDataObj = res.data.data;
                });
            },
            handleOpenUpdateShopModal(){
                this.$store.dispatch('openUpdateShopModal',this.initDataObj);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container{
        .section-header{
            margin-top: 10px;
            padding: 20px;
            background: url("../../assets/images/myshopbg.png") center center no-repeat;
            background-size: cover;
            .section-header-logo{
                text-align: center;
                img{
                    width: 50px;
                    height: auto;
                }
                p{
                    color: #fff;
                    margin-top: 5px;
                }
            }
            .section-header-list{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 30px;
                padding: 0 30px;
                li{
                    padding-left: 40px;
                    color: #fff;
                    height: 30px;
                    line-height: 30px;
                    &:first-child{
                        background: url("../../assets/images/systeminfobg.png") 0 0 no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(2){
                        background: url("../../assets/images/systeminfobg.png") 0 -30px no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(3){
                        background: url("../../assets/images/systeminfobg.png") 0 -60px no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(4){
                        background: url("../../assets/images/systeminfobg.png") 0 -90px no-repeat;
                        background-size: 30px;
                    }
                }
            }
        }
        .section-content{
            background: #fff;
            margin-top: 10px;
            ul{
                padding: 30px 0;
                li{
                    padding-left: 50px;
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px dashed #ddd;
                    span{
                        margin-right: 40px;
                        &.btn-change{
                            color: rgb(45,172,191);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
