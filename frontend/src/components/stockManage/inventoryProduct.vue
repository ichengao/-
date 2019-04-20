<template>
    <div class="container supplier-vendor-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/stockManage/'+currentId+'/inventoryProduct'" active-class="active">
                    <div>产品盘点</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <ul>
                    <li>导出</li>
                    <li>筛选</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="goodsId" label="序号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="barcode" label="商品编码" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="count" label="入库数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="入库时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.createDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column label="上次盘点时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.inventoryDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column prop="describe" label="规格" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleOpenUpdateProductQuantityModal(scope.row)">数量调整</el-button>
                        <br>
                        <el-button
                            size="mini"
                            type="danger"
                            class="btn-control"
                            @click="handleOpenInventoryRecordListModal(scope.row)">盘点记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetInventorylist } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_PRODUCT_QUANTITY } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: [],
                totalCount: 0,
                keyword: ''
            }
        },
        mounted(){
            this.currentId = this.$route.params.id;
            this.initData();
            EventBus.$on(UPDATE_PRODUCT_QUANTITY,()=>{
                this.initData();
            })
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetInventorylist(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            pageChange(params1){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: params,
                    keyword: this.keyword
                };
                requestGetInventorylist(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    keyword: this.keyword
                };
                requestGetInventorylist(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleSelectionChange(){},
            handleOpenUpdateProductQuantityModal(params){
                this.$store.dispatch('openUpdateProductQuantityModal',params)
            },
            handleOpenInventoryRecordListModal(params){
                this.$store.dispatch('openInventoryRecordListModal',params)
            }
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
            .btn-control{
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
<style lang="scss">
