<template>
    <div class="aside-container">
        <ul>
            <router-link :to="'/shopOverview/'+currentId"><li class="item1">店铺概况</li></router-link>
            <li class="item2">
                会员管理
                <div class="tab-router-list">
                    <router-link :to="'/shopdetail/'+currentId+'/member'"><p>会员列表</p></router-link>
                    <router-link :to="'/shopdetail/'+currentId+'/charge/chargeMoney'"><p>会员充值</p></router-link>
                    <router-link :to="'/shopdetail/'+currentId+'/integral/integralChange'"><p>积分管理</p></router-link>
                </div>
            </li>
            <li class="item3">
                商品管理
                <div class="tab-router-list">
                    <router-link :to="'/product/'+currentId+'/productList'"><p>商品列表</p></router-link>
                    <router-link :to="'/product/'+currentId+'/serviceList'"><p>服务列表</p></router-link>
                    <router-link :to="'/product/'+currentId+'/addProduct'"><p>新增商品</p></router-link>
                    <router-link :to="'/product/'+currentId+'/addService'"><p>新增服务</p></router-link>
                </div>
            </li>
            <li class="item4">
                库存管理
                <div class="tab-router-list">
                    <router-link :to="'/stockManage/'+currentId+'/supplierVendor'"><p>供应商管理</p></router-link>
                    <router-link :to="'/stockManage/'+currentId+'/storeControl'"><p>仓库管理</p></router-link>
                    <router-link :to="'/stockManage/'+currentId+'/purchaseStock'"><p>采购进货</p></router-link>
                    <router-link :to="'/stockManage/'+currentId+'/returnStock'"><p>采购退货</p></router-link>
                    <router-link :to="'/stockManage/'+currentId+'/inventoryProduct'"><p>产品盘点</p></router-link>
                </div>
            </li>
            <li class="item5">
                智能分析
                <div class="tab-router-list">
                    <router-link :to="'/intelligentAnalysis/'+currentId+'/shopAnalysis/achievementAnalysis'"><p>店铺概况</p></router-link>
                    <router-link to="/"><p>营业分析</p></router-link>
                    <router-link to="/"><p>会员分析</p></router-link>
                    <router-link to="/"><p>财务报表</p></router-link>
                    <router-link to="/"><p>员工分析</p></router-link>
                </div>
            </li>
            <li class="item6">
                AI营销
                <div class="tab-router-list">
                    <router-link :to="'/AIMarketing/'+currentId+'/msg/msgSending'"><p>短信营销</p></router-link>
                    <router-link :to="'/AIMarketing/'+currentId+'/coupon/couponManage'"><p>优惠卷</p></router-link>
                </div>
            </li>
            <li class="item7">
                系统管理
                <div class="tab-router-list">
                    <router-link :to="'/systemSetting/'+currentId+'/systemShopDetail'"><p>店铺资料</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/staffManage'"><p>员工管理</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/memberSetting'"><p>会员配置</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/productSetting'"><p>商品配置</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/sellSetting'"><p>销售配置</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/paySetting'"><p>打印配置</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/printSetting'"><p>支付设置</p></router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/hardwareSetting'"><p>硬件设置</p></router-link>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { requestGetShopGetcontent } from '@/services/service'
export default {
    data(){
        return{
            currentId: '',
        }
    },
    mounted(){
        this.currentId = this.$route.params.id
    },
    methods: {
        initData(){
            let params = {
                shopId: this.$route.params.id
            };
            requestGetShopGetcontent(params).then(res=>{

            });
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';

    .aside-container{
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background: #fff;
        ul{
            width: 100px;
            margin: 55px 0 0;
            padding: 0;
            li{
                width: 100%;
                height: 35px;
                list-style: none;
                text-align: center;
                padding-top: 55px;
                cursor: pointer;
                position: relative;
                .tab-router-list{
                    position: absolute;
                    left: 100%;
                    display: flex;
                    top: 0;
                    bottom: 0;
                    display: none;
                    background: #fff;
                    box-shadow: 0 0 15px rgba(165,45,1,.2);
                    z-index: 100;
                    flex-wrap: nowrap;
                    a{
                        &:hover{
                            background-color: rgba(0,0,0,.2);
                        }
                        p{
                            width: 90px;
                            text-align: center;
                            padding-top: 55px;
                            margin: 0;
                        }
                    }
                }
                &:hover{
                    .tab-router-list{
                        display: flex;
                    }
                }
                &.item1{
                    background: url('../../assets/images/icon_aside1.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item2{
                    background: url('../../assets/images/icon_aside2.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item3{
                    background: url('../../assets/images/icon_aside3.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item4{
                    background: url('../../assets/images/icon_aside4.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item5{
                    background: url('../../assets/images/icon_aside5.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item6{
                    background: url('../../assets/images/icon_aside6.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
                &.item7{
                    background: url('../../assets/images/icon_aside7.png') center 20px no-repeat;
                    background-size: 30px;
                    &:hover{
                        background-color: rgba(0,0,0,.2);
                    }
                    &.active{
                        background-color: rgba(0,0,0,.2);
                    }
                }
            }

        }
    }
</style>
