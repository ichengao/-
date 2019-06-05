<template>
    <div class="container add-purchase-stock-container">
        <div class="section1">
            <div class="section-header">
                <span>&emsp;供应商：</span>
                <el-select
                    v-model="purchase.selectPurchase"
                    remote
                    reserve-keyword
                    filterable
                    :remote-method="handleSearchSupplier"
                    placeholder="请输入供应商名称/手机号">
                    <el-option
                        v-for="item in purchase.purchaseOptions"
                        :key="item.supplierId"
                        :label="'供应商名称：'+item.name+' 联系人：'+item.contact+' 联系电话：'+item.mobile"
                        :value="item.supplierId">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="section2">
            <div class="section-header">
                <span>产品名称：</span>
                <el-input placeholder="请输入产品名称或简码"  class="input-with-select" v-model="searchKey">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearchProduct"></el-button>
                </el-input>
            </div>
            <div class="section-content">
                <div class="section-content-lf">
                    <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%">
                        <el-table-column prop="barcode" label="商品编码" show-overflow-tooltip ></el-table-column>
                        <el-table-column prop="simpleName" label="商品简码" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="salePrice" label="参考进价" show-overflow-tooltip></el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    class="btn-control"
                                    size="mini"
                                    @click="handleAdd(scope.row)">进货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagenation">
                        <el-pagination
                            v-show="totalCount"
                            background
                            layout="prev, pager, next"
                            @current-change='pageChange'
                            :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
                <div class="section-content-rgt">
                    <div class="section-table">
                        <el-table ref="multipleTable1" :data="orderDataArray" tooltip-effect="dark" style="width: 100%"
                        >
                            <el-table-column prop="barcode" label="商品编号" show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="number" label="数量" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.number"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="单价" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.salePrice"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="金额" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{(scope.row.number * scope.row.salePrice).toFixed(2)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        class="btn-control"
                                        @click="handleDelete(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <p v-show="orderDataArray.length" class="cacl-data">
                        总数：<span>{{orderDataArray.length}}</span>,合计金额：<span>{{allMoney}}</span>
                    </p>
                    <div class="section-footer" v-show="orderDataArray.length">
                        <span>备注：</span>
                        <el-input type="textarea" v-model="remark"></el-input>
                    </div>
                    <div class="section-btn" v-show="orderDataArray.length">
                        <el-button class="btn-cacl" @click="handleSubmit">结算</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    import axios from 'axios'
    import { requestGetWarehouseSupplierlist,requestGetProductList,requestCreateStockOrder } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                orderDataArray: [],     // 选中的商品集合
                orderDataIdArray: [],   // 选中的商品id集合
                searchKey: '',
                purchase: {
                    purchaseOptions: [],   // 供应商列表
                    selectPurchase: ''
                },
                totalCount: 0,
                remark: '',
            }
        },
        computed: {
            allMoney(){
                let allMoney = 0;
                this.orderDataArray.map(item=>{
                    allMoney = allMoney + (item.number * item.salePrice)
                });
                return allMoney.toFixed(2)
            }
        },
        methods: {
            handleSearchSupplier(keyword){
                if(keyword){
                    let params = {
                        shopId: this.$route.params.id,
                        pageNum: 1,
                        keyword: keyword
                    };
                    requestGetWarehouseSupplierlist(params).then((res)=>{
                        this.purchase.purchaseOptions = res.data.data.list;
                    });
                }
            },
            handleSearchProduct(){
                let _this  = this;
                let params = {
                    shopId: this.$route.params.id,
                    type: '01',
                    keyword: this.keyword
                };
                requestGetProductList(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                })
            },
            // 分页
            pageChange(params1){
                let _this  = this;
                let params = {
                    shopId: this.$route.params.id,
                    type: '01',
                    keyword: this.keyword,
                    pageNum: params1
                }
                requestGetProductList(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                })
            },
            // 添加
            handleAdd(params){
                let goodsId = params.goodsId;
                if(this.orderDataIdArray.indexOf(goodsId) != -1){
                    Message.error('该商品已存在');
                    return
                }
                let copyObi = Object.assign({},params,{number: 1});
                this.orderDataIdArray.push(goodsId);
                this.orderDataArray.push(copyObi);
            },
            // 删除
            handleDelete(params){
                this.orderDataIdArray.splice(params,1);
                this.orderDataArray.splice(params,1);
            },
            // 结算
            handleSubmit(){
                if(!this.purchase.selectPurchase){
                    Message.error('请选择供应商');
                    return
                }
                let lists = [];
                this.orderDataArray.map(item=>{
                    lists.push({
                        businessId: item.goodsId,
                        number: item.number,
                        stockPrice: item.salePrice,
                        goodsName: item.goodsName
                    })
                });
                let params = {
                    lists: lists,
                    shopId: this.$route.params.id,
                    remark: this.remark,
                    supplierId: this.purchase.selectPurchase,
                    totalAmount: this.allMoney,
                    realAmount: this.allMoney,
                    bizId: `${new Date().getTime()}`
                };
                requestCreateStockOrder(params).then((res)=>{
                    if(res.data.code == '0000'){
                        Message.success('创建成功');
                        this.$parent.currentStatus = true;
                    }else{
                        Message.error(res.data.msg);
                    }
                }).catch(()=>{
                    Message.error('创建失败');
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .add-purchase-stock-container{
        .section1{
            .section-header{
                background: #fff;
                height: 60px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 20px;
                margin-top: 10px;
            }
        }
        .section2{
            margin-top: 10px;
            background: #fff;
            padding: 20px;
            .section-header{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .input-with-select{
                    width: 300px;
                }
            }
            .section-content{
                display: flex;
                margin-top: 30px;
                width: 100%;
                .section-content-lf{
                    width: 50%;
                    .btn-control{
                        @include buttonSet(#F56C6C);
                    }
                    .pagenation{
                        text-align: right;
                        margin-top: 20px;
                    }
                }
                .section-content-rgt{
                    margin-left: 20px;
                    width: 50%;
                    .section-table{
                        max-height: 400px;
                        overflow-y: scroll;
                        @include scrollBar();
                        .btn-control{
                            @include buttonSet(#F56C6C);
                        }
                    }
                    .cacl-data{
                        background: rgb(213,234,251);
                        padding: 10px;
                        span{
                            color: #e4393c;
                        }
                    }
                    .section-footer{
                        display: flex;
                        margin-top: 20px;
                        span{
                            width: 60px;
                        }
                    }
                    .section-btn{
                        margin-top: 20px;
                        text-align: center;
                        .btn-cacl{
                            @include buttonSet($color);
                        }
                    }
                }
            }
        }
    }
</style>
