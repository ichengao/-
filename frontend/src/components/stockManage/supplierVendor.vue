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
                <el-button class="header-button">新增供应商</el-button>
                <ul>
                    <li>修改</li>
                    <li>删除</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column label="序号" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column prop="gradeName" width="80" label="供应商" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" width="80" label="应付欠款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="gradeId" width="80" label="应收退款" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="integral" width="80" label="联系人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="balance" label="联系电话" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="guestFromName" label="操作员" width="80" show-overflow-tooltip>
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
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteMmeber(scope.row)">还款记录</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteMmeber(scope.row)">供货记录</el-button>
                    </template> 
                
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { requestAddProduct } from '@/services/service';
import { Message } from 'element-ui'
export default {
    data(){
        return{
            currentId: '',
        }
    },
    mounted(){
        this.currentId = this.$route.params.id;
    },
    methods: {

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
