<template>
    <div class="operator-log-container">
        <div class="section-header">
            <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchKey">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="gradeName" label="操作人姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="操作模块" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="操作说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="操作时间" show-overflow-tooltip>
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
                searchKey: ''
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
    .operator-log-container{
        background: #fff;
        width: 100%;
        .section-header{
            padding: 10px;
            text-align: right;
            .input-with-select{
                width: 400px;
            }
        }
    }
</style>
