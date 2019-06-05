<template>
    <div class="container supplier-vendor-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/stockManage/'+currentId+'/purchaseStock'" active-class="active">
                    <div>采购进货</div>
                </router-link>
                <router-link :to="'/stockManage/'+currentId+'/returnStock'" active-class="active">
                    <div>采购退货</div>
                </router-link>
            </div>
            <div class="section-header-center" v-if="currentStatus">
                <el-button class="header-button" @click="handleToggleStatus">新增进货</el-button>
                <ul>
                    <!--<li>修改</li>-->
                    <!--<li @click="handleDelete">删除</li>-->
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-if="currentStatus">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content" v-if="currentStatus">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <!--<el-table-column prop="gradeName" label="序号" show-overflow-tooltip >-->
                <!--</el-table-column>-->
                <el-table-column prop="bizId" label="单据编号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="count" label="数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="单价" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ (scope.row.totalAmount / scope.row.count).toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="合计金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="realAmount" label="实付金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" label="入库状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.state == 0 ? '未入库' : '已入库' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">详情</el-button>
                        <br>
                        <el-button
                            size="mini"
                            type="danger"
                            class="btn-control"
                            @click="handleCopyAdd(scope.row)">复制新增</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <addPurchaseStock  v-else />
    </div>
</template>
<script>
    import { requestStockorder,requestStockorderdetail } from '@/services/service';
    import { Message } from 'element-ui'
    import addPurchaseStock from '@/components/stockManage/purchaseStock/addPurchaseStock'
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: [],
                currentStatus: true,      // false 为新增进货状态
                selectedDetailArr: [],
                selectedIdsArr: []
            }
        },
        components: {
            addPurchaseStock
        },
        mounted(){
            this.currentId = this.$route.params.id;
        },
        watch: {
            currentStatus(newVal,oldVal){
                newVal && this.initData()
            }
        },
        created(){
            this.initData()
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestStockorder(params).then(res=>{
                    this.initDataArray = res.data.data.list
                })
            },
            handleSelectionChange(params){
                let selectedIdsArr = [];
                this.selectedDetailArr = params;
                params.map(item=>{
                    selectedIdsArr.push(item.staffId);
                });
                this.selectedIdsArr = selectedIdsArr;
            },
            handleToggleStatus(){
                this.currentStatus = false
            },
            handleCopyAdd(item){
                let params = {
                    shopId: this.$route.params.id,
                    bizId: `${item.bizId}`
                };
                requestStockorderdetail(params).then(res=>{

                });
            },
            // 删除
            handleDelete(){
                if(!this.selectedIdsArr.length){
                    Message.error('至少选择一个');
                    return
                }
                let params = {
                    shopId: this.$route.params.id,
                    staffIds: this.selectedIdsArr
                };
                return
                requestDeleteStaff(params).then((res)=>{
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
        }
    }
</style>
<style lang="scss">
