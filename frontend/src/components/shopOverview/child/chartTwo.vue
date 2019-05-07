<template>
    <div class="chart-two-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="销售额" name="first" class="tab-pan"></el-tab-pane>
            <el-tab-pane label="会员消费" name="second" class="tab-pan"></el-tab-pane>
            <el-tab-pane label="其它数据" name="third" class="tab-pan"></el-tab-pane>
            <div class="chart-box">
                <el-row :gutter="20" v-if="activeName == 'first'">
                    <el-col :span="16">
                        <p class="sectopn-title">销售额趋势</p>
                        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">商品销售额排名</p>
                            <ul class="ranking-list">
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li><li>
                                <div class="ranking-list-lf">
                                    <b>1</b>
                                    <span>工作的一号店</span>
                                </div>
                                <div>
                                    123，123
                                </div>
                            </li>

                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-else-if="activeName == 'second'">
                    <el-col :span="16">
                        <p class="sectopn-title">会员消费</p>
                        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">商品消费排名</p>
                            <ul class="ranking-list">
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li><li>
                                <div class="ranking-list-lf">
                                    <b>1</b>
                                    <span>工作的一号店</span>
                                </div>
                                <div>
                                    123，123
                                </div>
                            </li>

                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-else>
                    <el-col :span="16">
                        <p class="sectopn-title">其它数据</p>
                        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">员工销售额排名</p>
                            <ul class="ranking-list">
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li>
                                <li>
                                    <div class="ranking-list-lf">
                                        <b>1</b>
                                        <span>工作的一号店</span>
                                    </div>
                                    <div>
                                        123，123
                                    </div>
                                </li><li>
                                <div class="ranking-list-lf">
                                    <b>1</b>
                                    <span>工作的一号店</span>
                                </div>
                                <div>
                                    123，123
                                </div>
                            </li>

                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-tabs>
        <div class="section-date">
            <span>今日</span><span>本周</span><span>本月</span><span>全年</span>
            <el-date-picker
                v-model="valueDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
</template>
<script>
    import VeHistogram from 'v-charts/lib/histogram';
    import { requestStatisticsData2 } from '@/services/service'
    export default {
        data(){
            this.chartSettings = {
                stack: { '客户': ['客户数量'] },
                area: true,
            };
            this.chartExtend = {
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                legend: {
                    show: false
                },
            };
            return{
                activeName: 'first',
                chartData: {
                    columns: ['日期', '客户数量'],
                    rows: [
                        { '日期': '1/1', '客户数量': 1393 },
                        { '日期': '1/2', '客户数量': 3530 },
                        { '日期': '1/3', '客户数量': 2923},
                        { '日期': '1/4', '客户数量': 1723 },
                        { '日期': '1/5', '客户数量': 3792 },
                        { '日期': '1/6', '客户数量': 4593}
                    ]
                },
                chartData1: {
                },
                chartData2: {
                },
                valueDate: '',
                initDataArray: {}
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            handleClick(){
                this.chartData1 = this.chartData;
            },
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestStatisticsData2(params).then((res)=>{
                    this.initDataArray = res.data.data;
                })
            }
        },
        components: {
            VeHistogram
        }
    }
</script>
<style lang="scss" scoped>
    .chart-two-container{
        position: relative;
        margin-top: 10px;
        background: #fff;
        padding: 10px;
        .section-rgt{
            padding: 0 20px;
            .ranking-list{
                width: 100%;
                li{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    .ranking-list-lf{
                        display: flex;
                        font-size: 12px;
                        align-items: center;
                        b{
                            width: 15px;
                            height: 15px;
                            line-height: 15px;
                            border-radius: 50%;
                            text-align: center;
                            background: rgb(49,70,89);
                            color: #fff;
                            font-weight: normal;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .sectopn-title{
            font-size: 16px;
            padding: 10px 0;
        }
        .section-date{
            position: absolute;
            right: 10px;
            top: 10px;
            span{
                margin-right: 10px;
                cursor: pointer;
            }
        }
    }
</style>
