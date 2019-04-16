<template>
    <div class="staff-detail-container">
        <div class="section-header">
            <el-button class="header-button">新增</el-button>
            <el-button class="header-button">批量删除</el-button>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column label="序号" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column prop="gradeName" label="姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="年龄" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="岗位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="薪酬" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="入职时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="添加时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="薪资操作" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                initData: []
            }
        },
        methods: {
            handleEdit(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .staff-detail-container{
        background: #fff;
        width: 100%;
        .section-header{
            padding: 10px;
            .header-button{
                @include buttonType1();
            }
        }
    }
</style>
