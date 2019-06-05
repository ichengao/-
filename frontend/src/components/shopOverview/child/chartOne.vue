<template>
    <ul class="chart-one-container">
        <li>
            <div class="item-header">
                <span>今日销售总额</span>
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <span class="el-icon-info"></span>
                </el-tooltip>
            </div>
            <div class="item-content">
                <p>{{initDataArray.thisDayAmount}}</p>
                <div class="item-text">
                    <span class="chart-num">月环比<b :class="(initDataArray.dayRateAmount > 0) ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></b>{{initDataArray.dayRateAmount || 0}}</span>
                    <span class="chart-num">日环比<b :class="(initDataArray.monthRateAmount > 0) ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></b>{{initDataArray.monthRateAmount || 0}}</span>
                </div>
            </div>
            <div class="item-footer">
                <span class="chart-num">散客： {{initDataArray.guestCount}}元</span>
                <span class="chart-num">会员： {{initDataArray.memberCount}}元</span>
            </div>
        </li>
        <li>
            <div class="item-header">
                <span>客户数量</span>
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <span class="el-icon-info"></span>
                </el-tooltip>
            </div>
            <div class="item-content">
                <p>{{initDataArray.guestCount}}</p>
                <div class="item-chart">
                    <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend" height="60px"></ve-line>
                </div>
            </div>
            <div class="item-footer">
                <span class="chart-num">日新增会员数量： {{initDataArray.thisDayAmount}}</span>
            </div>
        </li>
        <li>
            <div class="item-header">
                <span>日支付笔数</span>
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <span class="el-icon-info"></span>
                </el-tooltip>
            </div>
            <div class="item-content">
                <p>{{initDataArray.payCount}}</p>
                <div class="item-chart">
                    <ve-histogram :data="chartData1" :settings="chartSettings" :extend="chartExtend" height="60px"></ve-histogram>
                </div>
            </div>
            <div class="item-footer">
                <span class="chart-num">日会员卡支付笔数： {{initDataArray.cardPayCount}}</span>
            </div>
        </li>
        <li>
            <div class="item-header">
                <span>会员数量</span>
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <span class="el-icon-info"></span>
                </el-tooltip>
            </div>
            <div class="item-content">
                <p>{{initDataArray.memberCount}}</p>
                <div class="item-chart">
                    <Progress :progress="progress" class="item-progress"></Progress>
                </div>
            </div>
            <div class="item-footer">
                <span class="chart-num">月环比<b :class="(initDataArray.monthRateMember > 0) ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></b>{{initDataArray.monthRateMember || 0}}</span>
                <span class="chart-num">日环比<b :class="(initDataArray.dayRateMember > 0) ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></b>{{initDataArray.dayRateMember || 0}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
    import VeLine from 'v-charts/lib/line';
    import VeHistogram from 'v-charts/lib/histogram';
    import Progress from './progress';
    import { requestStatisticsData1 } from '@/services/service'
    export default {
        data () {
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
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                legend: {
                    show: false
                },

            }
            return {
                chartData: {
                    columns: ['日期', '客户数量'],
                    rows: [
                        // { '日期': '1/1', '客户数量': 1393 },
                    ]
                },
                chartData1: {
                    columns: ['日期', '支付笔数'],
                    rows: [
                        // { '日期': '1/1', '支付笔数': 1393 },
                    ]
                },
                progress: 10,
                initDataArray: {}
            }
        },
        components: { 
            VeLine,
            VeHistogram,
            Progress
        },
        created(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestStatisticsData1(params).then((res)=>{
                    this.initDataArray = res.data.data;
                    let trend1 = res.data.data.trend1;
                    let trend2 = res.data.data.trend2;
                    trend1.forEach(item=>{
                        this.chartData.rows.push({
                            '日期': item.dayOrMonth,
                            '客户数量': item.count
                        })
                    });
                    trend2.forEach(item=>{
                        this.chartData1.rows.push({
                            '日期': item.dayOrMonth,
                            '支付笔数': item.count
                        })
                    });
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .chart-one-container{
        display: flex;
        justify-content: flex-start;
        padding: 0;
        >li{
            width: 24.25%;
            margin-right: 1%;
            background: #fff;
            font-size: 12px;
            .item-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                color: rgb(172,172,172);
            }
            .item-content{
                padding: 0 10px;
                p{
                    font-size: 18px;
                    margin: 0;
                    padding: 0;
                }
                .item-text{
                    display: flex;
                    height: 40px;
                    padding: 10px 0;
                    align-items: center;
                    border-bottom: 1px solid rgb(246,246,246);
                    .chart-num{
                        margin-right: 10px;
                        b{
                            margin: 0 10px 0 5px;
                            &.el-icon-caret-top{
                                color: rgb(143,217,107);
                            }
                            &.el-icon-caret-bottom{
                                color: rgb(245,34,45);
                            }
                        }
                    }
                }
                .item-chart{
                    height: 40px;
                    padding: 10px 0;
                    border-bottom: 1px solid rgb(246,246,246);
                    .item-progress{
                        margin-top: 15px;
                    }
                }

            }
            .item-footer{
                display: flex;
                padding: 10px;
                align-items: center;
                span{
                    margin-right: 10px;
                }
                b{
                    margin: 0 10px 0 5px;
                    &.el-icon-caret-top{
                        color: rgb(143,217,107);
                    }
                    &.el-icon-caret-bottom{
                        color: rgb(245,34,45);
                    }
                }
            }
            ul{
                padding: 0 10px;
                li{
                    display: flex;
                    margin-bottom: 5px;
                    font-size: 14px;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    &:first-child{
                        color: $color;
                    }
                }
            }
            &:last-child{
                margin-right: 0;
            }
        }
    }
</style>
