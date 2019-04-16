<template>
    <div class="change-shifts-container">
        <div class="section-header">
            <el-date-picker
                v-model="value4"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchKey">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="gradeName" label="员工姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="开始时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="结束时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="交接时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="备用金" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="操作" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                initData: [],
                searchKey: '',
                value4: ''
            }
        },
        methods: {
            handleEdit(){

            },
            handleSearch(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .change-shifts-container{
        background: #fff;
        width: 100%;
        .section-header{
            padding: 20px 10px;
            display: flex;
            justify-content: space-between;
            .input-with-select{
                width: 300px;
            }
        }
    }
</style>
