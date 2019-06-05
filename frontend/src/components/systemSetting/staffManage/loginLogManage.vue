<template>
    <div class="login-log-container">
        <div class="section-header">
            <el-date-picker
                v-model="timepicker"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-input placeholder="请输入内容"  class="input-with-select" v-model="keyword">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
            >
                <el-table-column prop="adminName" label="登录账号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="ip" label="IP地址" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column prop="mobile" label="登录城市" show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column prop="operateModel" label="操作模块" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="operateInst" label="操作说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.requestDate | timeStampTrans}}
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
    import { requestGetStaffAccesslog } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                keyword: '',
                totalCount: 0,
                timepicker: null
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    operateType: '01'
                };
                requestGetStaffAccesslog(params).then((res)=>{
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
                requestGetStaffAccesslog(params).then((res)=>{
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
                requestGetStaffAccesslog(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .login-log-container{
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
