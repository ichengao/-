<template>
    <div class="member-container main-container">
        <div class="section-header">
            <div class="section-header-lf">
                <span>服务列表</span>
                <el-button class="btn-new el-icon-plus" @click="handldAddService">新增服务</el-button>
            </div>
            <div class="section-header-center">
                <ul>
                    <li>导入</li>
                    <li>导出</li>
                    <li>筛选</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchData" >
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <ul class="section-content-box">
                <li class="item-birth">
                    <p>共有服务</p>
                    <div class="item-content">
                        <span>{{baseData.goodsCount}}</span>种
                    </div>
                </li>
                <li class="item-all">
                    <p>库存中商品总成本</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.allStockPrice)}}</span>元
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            库存中商品<span>{{parseInt(baseData.inventoryCount)}}</span>件，共<span>{{parseInt(baseData.allStockPrice)}}</span>元
                        </div>
                        <span></span>
                    </div>
                </li>
                <li class="item-pay">
                    <p>服务次数超过100次的</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.timesCount)}}</span>件
                    </div>
                </li>
                <li class="item-ranking">
                    <p>近七天热卖服务(前三名)</p>
                    <ul>
                        <li v-for="(item,idx) in baseData.list" :key='idx'>
                            <div class="rank-lf">
                                TOP{{idx+1}}. <span>{{item.memberName}}</span>
                            </div>
                            <div class="rank-rgt">
                                {{item.totalAmount}}元
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="section-footer">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column label="序号" show-overflow-tooltip prop="barcode"></el-table-column>
                <el-table-column prop="goodsName" label="服务名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="categoryName" label="服务类别" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="count" label="服务次数" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="expDay" label="服务时长" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="salePrice" label="销售单价" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="所属店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="操作"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                        <br>
                        <el-button
                        size="mini"
                        class="btn-delete"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initData.length"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    requestGetProductData,
    requestGetServerlist,
    requestDeleteGoods
} from '@/services/service';
import { Message } from 'element-ui';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { UPDATE_SERVICE_LIST } from '@/components/eventEmitter/eventName';
export default {
    data(){
        return{
            initData: [],
            baseData: {},
            currentId: '',
            searchData: '',
            totalCount: 0
        }
    },
    mounted(){
        this.currentId = this.$route.params.id;
        this.init();
        EventBus.$on(UPDATE_SERVICE_LIST,res=>{
            this.init()
        })
    },
    methods: {
        handleSelectionChange(){},
        init(){
            let _this  = this;
            let params = {
                shopId: this.$route.params.id,
                type: '02'
            };
            requestGetProductData(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.baseData = res.data.data
                }
            });
            requestGetServerlist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initData = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                }
            })
        },
        // 删除操作
        handleDelete(arr){
            let params = {
                shopId: this.$route.params.id,
                goodsIds: arr.goodsId
            };
            let _this = this;
            requestDeleteGoods(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.init();
                    Message({
                        message: '删除成功',
                        type: 'success'
                    })
                }else{
                    Message({
                        message:res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(){
                Message({
                    message: '删除失败',
                    type: 'error'
                });
            })
        },
        handleEdit(item){
            this.$store.dispatch('openUpdateService',item)
        },
        handldAddService(){
            this.$router.push(`/product/${this.currentId}/addService`);
        },
        handleSearch(){
            let _this  = this;
            let params = {
                shopId: this.$route.params.id,
                type: '01',
                keyword: this.searchData
            }
            requestGetServerlist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initData = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                }
            })
        },
        pageChange(params1){
            let _this  = this;
            let params = {
                shopId: this.$route.params.id,
                type: '02',
                keyword: this.searchData,
                pageNum: params1
            };
            requestGetProductList(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initData = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .main-container{
        width: 100%;
        .section-header{
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding: 0 20px;
            .section-header-lf{
                font-size: 18px;
                span{
                    padding-left: 10px;
                    border-left: 3px solid $color;
                }
                .btn-new{
                    @include buttonType1;
                    margin-left: 20px;
                    padding: 8px 10px;
                    &:before{
                        margin-right: 15px;
                    }
                }
            }
            .section-header-center{
                ul{
                    display: flex;
                    li{
                        padding-left: 40px;
                        margin-right: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        &:hover{
                            opacity: .6;
                        }
                        &:first-child{
                            background: url('../../assets/images/icon_edit.png') 10px center no-repeat;
                            background-size: 18px;
                        }
                        &:nth-child(2){
                            background: url('../../assets/images/icon_import.png') 10px center no-repeat;
                            background-size: 18px;
                        }
                        &:nth-child(3){
                            background: url('../../assets/images/icon_export.png') 10px center no-repeat;
                            background-size: 18px;
                        }
                        &:nth-child(4){
                            background: url('../../assets/images/icon_type.png') 10px center no-repeat;
                            background-size: 18px;
                        }
                    }
                }
            }
        }
        .section-content{
            .section-content-box{
                display: flex;
                justify-content: flex-start;
                padding: 0;
                margin-top: 10px;
                >li{
                    width: 24.25%;
                    margin-right: 1%;
                    background: #fff;
                    font-size: 12px;
                    p{
                        padding-left: 10px;
                    }
                    .item-content{
                        text-align: center;
                        span{
                            font-size: 40px;
                            color: $color;
                            margin-right: 5px;
                        }
                    }
                    .item-footer{
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        align-items: center;
                        .item-footer-lf{
                            span{
                                color: $color;
                            }
                        }
                        .item-footer-rgt{
                            background: $color;
                            color: #fff;
                            padding: 0 5px;
                            cursor: pointer;
                            border-radius: 3px;
                        }
                    }
                    ul{
                        padding: 0 10px;
                        li{
                            display: flex;
                            margin-bottom: 5px;
                            font-size: 14px;
                            width: 100%;
                            justify-content: space-between;
                            align-items: center;
                            &:first-child{
                                color: $color;
                            }
                        }
                    }
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
        .section-footer{
            margin-top: 10px;
            .btn-delete{
                margin-top: 5px;
            }
            .pagenation{
                padding: 20px 0;
                background: #fff;
                text-align: right;
            }
        }
    }
</style>
