<template>
    <div class="achievement-analysis-container">
        <div class="section-header">
            <el-button @click="handleExport">导出</el-button>
            <div class="section-header-center">
                <el-radio-group v-model="action">
                    <el-radio-button label="day">今天</el-radio-button>
                    <el-radio-button label="lastDay">昨日</el-radio-button>
                    <el-radio-button label="week">本周</el-radio-button>
                    <el-radio-button label="month">本月</el-radio-button>
                </el-radio-group>
                <span>选择开卡日期: </span>
                <el-date-picker
                    v-model="pickDate"
                    type="daterange"
                    @change="handleDateChange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="会员卡号/姓名"  class="input-with-select" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
            >
                <el-table-column label="序号" prop="number" show-overflow-tooltip ></el-table-column>
                <el-table-column label="日期" show-overflow-tooltip prop="dayOrMonth"></el-table-column>
                <el-table-column prop="allAmount" label="总余额" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="allCount" label="总积分" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="guestAmount" label="总售卡金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="memberAmount" label="总开卡数量" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    v-show="initDataArray"
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
    import { requestGetReportPerformance,requestExportReportPerformance } from '@/services/service'
    export default {
        data(){
            return{
                action: 'month',
                pickDate: '',
                currentId: '',
                initDataArray: [],
                keyword: '',
                totalCount: 0,
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    action: this.action
                };
                requestGetReportPerformance(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleDateChange(){
                this.action = '';
            },
            handleSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    keyword: this.keyword,
                };
                if(this.action){
                    params = Object.assign({},params,{action: this.action})
                }else{
                    params = Object.assign({},params,{startDate: this.pickDate[0],endDate: this.pickDate[1]})
                }
                requestGetReportPerformance(params).then((res)=>{
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
                if(this.action){
                    params = Object.assign({},params,{action: this.action})
                }else{
                    params = Object.assign({},params,{startDate: this.pickDate[0],endDate: this.pickDate[1]})
                }
                requestGetReportPerformance(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                });
            },
            // 导出
            handleExport(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    keyword: this.keyword,
                };
                if(this.action){
                    params = Object.assign({},params,{action: this.action})
                }else{
                    params = Object.assign({},params,{startDate: this.pickDate[0],endDate: this.pickDate[1]})
                }
                let paramsUrl = '';
                for(let item in params){
                    paramsUrl = `${paramsUrl}${item}=${params[item]}&`
                }
                var elemIF = document.createElement("iframe");
                elemIF.src = `${requestExportReportPerformance}?${paramsUrl}`;
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .achievement-analysis-container{
        background: #fff;
        margin-top: 10px;
        .section-header{
            display: flex;
            justify-content: space-between;
            padding: 20px;
        }
        .section-header-center{
            span{
                margin: 0 0 0 20px;
            }
        }
        .pagenation{
            text-align: right;
            padding: 20px;
        }
    }
</style>
