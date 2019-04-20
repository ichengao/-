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
                    <li>修改</li>
                    <li>删除</li>
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
                <el-table-column prop="gradeName" label="供应商" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="应付欠款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="gradeId" label="应收退款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="integral" label="联系人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="balance" label="联系电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="guestFromName" label="操作员" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">还款</el-button>
                        <br>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDeleteMmeber(scope.row)">还款记录</el-button>
                        <br>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDeleteMmeber(scope.row)">供货记录</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>
        <addPurchaseStock  v-else />
    </div>
</template>
<script>
    import { requestAddProduct } from '@/services/service';
    import { Message } from 'element-ui'
    import addPurchaseStock from '@/components/stockManage/purchaseStock/addPurchaseStock'
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: [],
                currentStatus: true,      // false 为新增进货状态
            }
        },
        components: {
            addPurchaseStock
        },
        mounted(){
            this.currentId = this.$route.params.id;
        },
        methods: {
            initData(){

            },
            handleSelectionChange(){},
            handleToggleStatus(){
                this.currentStatus = false
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
        }
    }
</style>
<style lang="scss">
