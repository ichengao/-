<template>
    <div class="change-shifts-container">
        <div class="section-header">
            <el-date-picker
                v-model="timerPicker"
                type="datetimerange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
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
                <el-table-column prop="adminName" label="员工姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column label="开始时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.beginDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.finishDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column label="交接时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.createDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="备用金" show-overflow-tooltip>
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
    import { requestGetStaffSuccessionlog } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                keyword: '',
                totalCount: 0,
                timerPicker: ''
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetStaffSuccessionlog(params).then((res)=>{
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
                console.log(this.timerPicker.length)
                this.timerPicker.length && (params = Object.assign({},params,{startDate: this.timerPicker[0],endDate: this.timerPicker[1]}))
                requestGetStaffSuccessionlog(params).then((res)=>{
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
                requestGetStaffSuccessionlog(params).then(function(res){
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
        .pagenation{
            text-align: right;
            margin-top: 20px;
            padding-bottom: 20px;
        }
    }
</style>
