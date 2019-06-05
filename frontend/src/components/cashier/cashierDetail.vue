<template>
    <div class="cashier-detail-container">
        <div class="section-lf">
            <div class="section-list">
                <div class="section1">
                    <el-input
                        placeholder="条码/助词码（大写）"
                        v-model="initDataObj.auxiliaryWord"
                        prefix-icon="el-icon-s-grid"
                        clearable>
                    </el-input>
                </div>
                <div class="section2">
                    <div class="section2-header">
                        当前销售时间：2019-12-12 12:00
                    </div>
                    <div class="section2-content">
                        <el-table ref="multipleTable"
                                  highlight-current-row
                                  :data="initDataObj.selectedDataArray"
                                  @current-change="handleCurrentChange"
                                  tooltip-effect="dark" style="width: 100%">
                            <el-table-column prop="goodsName" label="名称" show-overflow-tooltip >
                                <template slot-scope="scope">
                                    <p>{{scope.row.goodsName}}</p>
                                    <p>折扣：{{(scope.row.discount || '1') * 100 + '%' }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="count" label="数量" show-overflow-tooltip></el-table-column>
                            <el-table-column label="应收金额" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <p>{{scope.row.salePrice * scope.row.count * (scope.row.discount || 1)}}</p>
                                    <p>原价：￥{{scope.row.salePrice}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="section2-footer">
                        <span>会员: {{memberData.userName}}</span>
                        <span>余额: ￥{{memberData.balance}}</span>
                        <span class="btn-charge" @click="handleFastInchargeModal">充值</span>
                    </div>
                    <div class="section2-btn">
                        <el-button @click="handleSelectMemberModal">选择会员</el-button>
                        <el-button>挂单</el-button>
                    </div>
                </div>
            </div>
            <div class="section-btn-group">
                <el-button :disabled="!initDataObj.auxiliaryWord">快收K</el-button>
                <el-button @click="handleAddQuantity">数量+</el-button>
                <el-button @click="handleReduceQuantity">数量-</el-button>
                <el-button @click="handleChangeDiscount">折扣Z</el-button>
                <el-button @click="handleChangePrice">改价P</el-button>
                <el-button @click="handleDeleteProduct">删除D</el-button>
                <el-button @click="handleUnprocessedOrderListModal">结账G</el-button>
                <el-button @click="handleDeductionTimesModal">扣次T</el-button>
                <el-button>销售F</el-button>
                <el-button @click="handleMemberManageModal">会员V</el-button>
                <el-button>设置C</el-button>
            </div>
        </div>
        <div class="section-rgt">
            <div class="section-header">
                <!--<swiper :options="swiper1.swiperOption" ref="mySwiper" >-->
                    <!--&lt;!&ndash; slides @someSwiperEvent="callback"&ndash;&gt;-->
                    <!--<swiper-slide class="slide-list">-->
                        <!--<el-button class="btn-all">所有分类</el-button>-->
                    <!--</swiper-slide>-->
                    <!--<swiper-slide class="slide-list" v-for="(item,idx) in swiper1.typeList" :key="idx">-->
                        <!--<el-button>{{item.name}}</el-button>-->
                    <!--</swiper-slide>-->
                <!--</swiper>-->
            </div>
            <div class="section-content">
                <div class="scroll-box">
                    <happy-scroll hide-vertical top color="rgba(51,51,51,0.2)" size="8">
                        <div class="list-box">
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail" @click="handleAddProduct(item)" v-for="(item,idx) in swiper2.goodsList" :key="idx">
                                <img :src="item.goodsPicture ? item.goodsPicture : defaultImg" alt="">
                                <div class="product-text">
                                    <p>{{item.goodsName}}</p>
                                    <div class="product-footer">
                                        <span>￥{{item.salePrice}}</span><span>{{item.count>99 ? '99+' : item.count}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </happy-scroll>
                </div>
            </div>
            <div class="section-footer">
                <div class="pay-header">
                    <p>总数量：11</p>
                    <p>优惠金额：￥11</p>
                </div>
                <div class="pay-content">
                    <p>总金额：￥6000</p>
                    <p>应收金额：<span>￥5000</span></p>
                </div>
                <div class="pay-footer">
                    <el-button class="btn-pay">支付</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { HappyScroll } from 'vue-happy-scroll'
    import 'vue-happy-scroll/docs/happy-scroll.css'
    import { requestGetProductList } from '@/services/service';
    import defaultImg from '../../assets/images/alipayImg.png';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import {
        UPDATE_PRODUCT_DISCOUNT,
        UPDATE_PRODUCT_PRICE,
        UPDATE_SELECT_MEMBER
    } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                defaultImg: defaultImg,
                initDataObj: {
                    auxiliaryWord: '',          // 助词码
                    selectedDataArray: [],      // 列表
                    selectedRow: {},            // 当前选中行
                },
                memberData: {},                  // 选择的会员数据
                swiper1: {
                    swiperOption: {
                        width: 100
                    },
                    typeList: [
                        {
                            name: '饮料类'
                        }
                    ]
                },
                swiper2: {
                    goodsList: []        // 商品列表
                }
            }
        },
        components: {
            HappyScroll
        },
        created(){
            this.initData();
        },
        mounted(){
            EventBus.$on(UPDATE_PRODUCT_DISCOUNT,(res)=>{
                this.handleChangeDiscountNum(res);
            });
            EventBus.$on(UPDATE_PRODUCT_PRICE,(res)=>{
                this.handleChangePriceNum(res);
            });
            EventBus.$on(UPDATE_SELECT_MEMBER,memberData=>{
                this.memberData = memberData;
            });
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetProductList(params).then((res)=>{
                    this.swiper2.goodsList = res.data.data.list;
                })
            },
            // 设置选中状态
            setCurrent(row) {
                this.$refs.multipleTable.setCurrentRow(row);
            },
            // 选中切换
            handleCurrentChange(val){
                this.initDataObj.selectedRow = val;
            },
            // 点击商品添加
            handleAddProduct(item){
                let isAlready = false;
                this.initDataObj.selectedDataArray.forEach((item1)=>{
                   if(item1.goodsId == item.goodsId){
                       isAlready = true
                   }
                });
                if(isAlready) return;
                let copyItem = Object.assign({},item,{
                    count: 1
                });
                this.initDataObj.selectedDataArray.push(copyItem);
            },
            // 数量加
            handleAddQuantity(){
                if(!this.initDataObj.selectedRow){
                    Message.error('还没有选中产品');
                    return;
                };
                if(!this.initDataObj.selectedRow.goodsId){
                    Message.error('还没有选中产品');
                    return;
                };
                let currentIdx;
                this.initDataObj.selectedDataArray.forEach((item,idx)=>{
                    if(item.goodsId == this.initDataObj.selectedRow.goodsId){
                        currentIdx = idx;
                    }
                });
                this.initDataObj.selectedRow = Object.assign({},this.initDataObj.selectedRow,
                    {
                        count: this.initDataObj.selectedRow.count + 1
                    });
                this.initDataObj.selectedDataArray.splice(currentIdx,1,this.initDataObj.selectedRow);
                this.setCurrent(this.initDataObj.selectedRow);
            },
            // 数量减
            handleReduceQuantity(){
                if(!this.initDataObj.selectedRow){
                    Message.error('还没有选中产品');
                    return;
                };
                if(!this.initDataObj.selectedRow.goodsId){
                    Message.error('还没有选中产品');
                    return;
                };
                if(this.initDataObj.selectedRow.count < 2){
                    return
                }
                let currentIdx;
                this.initDataObj.selectedDataArray.forEach((item,idx)=>{
                    if(item.goodsId == this.initDataObj.selectedRow.goodsId){
                        currentIdx = idx;
                    }
                });
                this.initDataObj.selectedRow = Object.assign({},this.initDataObj.selectedRow,
                    {
                        count: this.initDataObj.selectedRow.count - 1
                    });
                this.initDataObj.selectedDataArray.splice(currentIdx,1,this.initDataObj.selectedRow);
                this.setCurrent(this.initDataObj.selectedRow);
            },
            // 折扣
            handleChangeDiscount(){
                if(!this.initDataObj.selectedRow){
                    Message.error('还没有选中产品');
                    return;
                };
                if(!this.initDataObj.selectedRow.goodsId){
                    Message.error('还没有选中产品');
                    return;
                };
                this.$store.dispatch('openDiscountModal');
            },
            // 折扣修改
            handleChangeDiscountNum(params){
                let currentIdx;
                this.initDataObj.selectedDataArray.forEach((item,idx)=>{
                    if(item.goodsId == this.initDataObj.selectedRow.goodsId){
                        currentIdx = idx;
                    }
                });
                this.initDataObj.selectedRow = Object.assign({},this.initDataObj.selectedRow,
                    {
                        discount: params/10
                    });
                this.initDataObj.selectedDataArray.splice(currentIdx,1,this.initDataObj.selectedRow);
                this.setCurrent(this.initDataObj.selectedRow);
            },
            // 改价
            handleChangePrice(){
                if(!this.initDataObj.selectedRow){
                    Message.error('还没有选中产品');
                    return;
                };
                if(!this.initDataObj.selectedRow.goodsId){
                    Message.error('还没有选中产品');
                    return;
                };
                this.$store.dispatch('openUpdateProductPriceModal');
            },
            // 改价修改
            handleChangePriceNum(params){
                let currentIdx;
                this.initDataObj.selectedDataArray.forEach((item,idx)=>{
                    if(item.goodsId == this.initDataObj.selectedRow.goodsId){
                        currentIdx = idx;
                    }
                });
                this.initDataObj.selectedRow = Object.assign({},this.initDataObj.selectedRow,
                    {
                        discount: 1,
                        salePrice: params
                    });
                this.initDataObj.selectedDataArray.splice(currentIdx,1,this.initDataObj.selectedRow);
                this.setCurrent(this.initDataObj.selectedRow);
            },
            // 删除
            handleDeleteProduct(){
                if(!this.initDataObj.selectedRow){
                    Message.error('还没有选中产品');
                    return;
                };
                if(!this.initDataObj.selectedRow.goodsId){
                    Message.error('还没有选中产品');
                    return;
                };
                let currentIdx;
                this.initDataObj.selectedDataArray.forEach((item,idx)=>{
                    if(item.goodsId == this.initDataObj.selectedRow.goodsId){
                        currentIdx = idx;
                    }
                });
                this.initDataObj.selectedDataArray.splice(currentIdx,1);
                this.initDataObj.selectedRow = [];
            },
            // 结账   查看待支付订单
            handleUnprocessedOrderListModal(){
                this.$store.dispatch('openUnprocessedOrderListModal');
            },
            // 扣次
            handleDeductionTimesModal(){
                this.$store.dispatch('openDeductionTimesModal');
            },
            // 会员管理
            handleMemberManageModal(){
                this.$store.dispatch('openMemberManageModal');
            },
            // 选择会员
            handleSelectMemberModal(){
                this.$store.dispatch('openSelectMemberModal');
            },
            // 快捷充值
            handleFastInchargeModal(){
                this.$store.dispatch('openFastInchargeModal');
            }
        }

    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .cashier-detail-container{
        display: flex;
        margin-top: 60px;
        width: 100%;
        .section-lf{
            display: flex;
            .section-list{
                margin: 10px;
                width: 324px;
                .section1{
                    .el-input{
                        width: 100%;
                    }
                }
                .section2{
                    margin-top: 10px;
                    background: #fff;
                    .section2-header{
                        text-align: center;
                        padding: 5px;
                        border-bottom: 1px dashed $color;
                    }
                    .section2-content{
                        height: 380px;
                        p{
                            margin: 0;
                        }
                    }
                    .section2-footer{
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        border-top: 1px dashed $color;
                        .btn-charge{
                            color: $color;
                            cursor: pointer;
                        }
                    }
                    .section2-btn{
                        display: flex;
                        .el-button{
                            width: 50%;
                            @include buttonSet($color);
                        }
                    }
                }
            }
            .section-btn-group{
                width: 90px;
                .el-button{
                    @include buttonSet($color);
                    margin-left: 0;
                    width: 90px;
                    margin-top: 10px;
                }
            }
        }
        .section-rgt{
            margin: 0 0 0 10px;
            /*flex-grow:1;*/
            width: 100%;
            .section-header{
                margin-top: 10px;
                background: #fff;

                .slide-list{
                    .el-button{
                        @include buttonSet(#fff);
                        color: #000;
                        border-color: rgb(247,247,247);
                    }
                    .btn-all{
                        @include buttonSet($color);
                    }
                }
            }
            .section-content{
                margin-top: 10px;
                .scroll-box{
                    height: 400px;
                    width: 95%;
                    overflow: hidden;
                    .list-box{
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        height: 400px;
                        width: 900px;
                        .product-detail{
                            background: #fff;
                            width: 193px;
                            height: 70px;
                            display: flex;
                            cursor: pointer;
                            margin-bottom: 10px;
                            margin-right: 10px;
                            img{
                                width: 70px;
                                height: 70px;
                            }
                            .product-text{
                                flex: 1;
                                p{
                                    margin: 0;
                                    padding-top: 3px;
                                    height: 45px;
                                    overflow: hidden;
                                }
                                .product-footer{
                                    display: flex;
                                    justify-content: space-between;
                                    span{
                                        &:first-child{
                                            color: $color;
                                            font-weight: bold;
                                        }
                                        &:last-child{
                                            margin-right: 5px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            }
            .section-footer{
                display: flex;
                background: #fff;
                justify-content: space-between;
                padding: 10px;
                align-items: center;
                font-size: 20px;
                p{
                    span{
                        color: $color;
                    }
                }
                .pay-footer{
                    .btn-pay{
                        @include buttonSet($color);
                        width: 150px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>
