<template>
    <div class="container supplier-vendor-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/stockManage/'+currentId+'/supplierVendor'" active-class="active">
                    <div>供应商管理</div>
                </router-link>
                <router-link :to="'/stockManage/'+currentId+'/storeControl'" active-class="active">
                    <div>仓库管理</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <el-button class="header-button" @click="OpenCreateSupplierVendorModal">新增供应商</el-button>
                <ul>
                    <li @click="handEdit">修改</li>
                    <li @click="handleDelete">删除</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入供应商"  class="input-with-select" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="handSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column prop="supplierId" label="序号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="name" label="供应商" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="realArrearsBalance" label="应付欠款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="realGetBalance" label="应收退款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="contact" label="联系人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="opName" label="操作员" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleRepayment(scope.row)">还款</el-button>
                        <br>
                        <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleMarkCollections(scope.row)" class="table-btn">收款</el-button>-->
                        <!--<br>-->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteMmeber(scope.row)" class="table-btn">账款记录</el-button>
                        <br>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleStockorder(scope.row)" class="table-btn">供货记录</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initDataArray.length"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { requestGetWarehouseSupplierlist,requestDelsupplier } from '@/services/service';
import { Message } from 'element-ui';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { CREATE_SUPPLIER_VENDOR } from '@/components/eventEmitter/eventName';
export default {
    data(){
        return{
            currentId: '',
            initDataArray: [],
            selectedIdsArr: '',     //  选中id列表
            selectedDetailArr: '',  //  选中详细信息
            keyword: '',
            totalCount: 0,
        }
    },
    mounted(){
        this.currentId = this.$route.params.id;
        this.initData();
        EventBus.$on(CREATE_SUPPLIER_VENDOR,()=>{
            this.initData();
        });
    },
    methods: {
        initData(){
            let params = {
                shopId: this.$route.params.id,
                pageNum: 1
            };
            requestGetWarehouseSupplierlist(params).then((res)=>{
                this.initDataArray = res.data.data.list;
                this.totalCount = res.data.data.totalCount;
            })
        },
        handleSelectionChange(params){
            let selectedIdsArr = [];
            this.selectedDetailArr = params;
            params.map(item=>{
                selectedIdsArr.push(item.supplierId);
            });
            this.selectedIdsArr = selectedIdsArr;
        },
        OpenCreateSupplierVendorModal(){
            this.$store.dispatch('openCreateSupplierVendorModal');
        },
        handleDelete(){
            if(!this.selectedIdsArr.length){
                Message.error('至少选择一个');
                return
            }
            let params = {
                shopId: this.$route.params.id,
                supplierIds: this.selectedIdsArr
            };
            requestDelsupplier(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.initData()
                }else{
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(){
                Message({
                    message:'删除失败',
                    type: 'error'
                });
            })
        },
        handEdit(){
            if(this.selectedIdsArr.length != 1){
                Message.error('请选择一个');
                return
            };
            this.$store.dispatch('openEditSupplierVendorModal',this.selectedDetailArr[0])
        },
        handSearch(){
            let params = {
                shopId: this.$route.params.id,
                pageNum: 1,
                keyword: this.keyword
            };
            requestGetWarehouseSupplierlist(params).then((res)=>{
                this.initDataArray = res.data.data.list;
                this.totalCount = res.data.data.totalCount
            })
        },
        // 分页
        pageChange(params1){
            let _this = this;
            let params = {
                pageNum: params1,
                keyword: this.keyword,
                shopId: this.$route.params.id
            };
            requestGetWarehouseSupplierlist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initDataArray = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                }
            });
        },
        // 还款
        handleRepayment(item){
            item = Object.assign({},item,{currentControlType: '0'});
            this.$store.dispatch('openRepaymentModal',item)
        },
        handleStockorder(item){
            item = Object.assign({},item,{currentControlType: '0'});
            this.$store.dispatch('openStockorderModal',item)
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        .section-header{
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .section-header-lf{
                display: flex;
                a{
                    div{
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }
                    &.active{
                        div{
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
            .section-header-center{
                display: flex;
                align-items: center;
                .header-button{
                    @include buttonType1();
                }
                ul{
                    display: flex;
                    margin-left: 20px;
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
                    }
                }
            }
        }
        .section-content{
            margin-top: 10px;
            .table-btn{
                margin-top: 5px;
            }
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
<style lang="scss">
