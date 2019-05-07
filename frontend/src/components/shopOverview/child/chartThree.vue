<template>
    <div class="chart-three-container">
        <el-row>
            <el-col :span="10" class="section-lf">
                <div class="section-header">
                    消费额类别占比
                </div>
                <div class="section-content">
                    <el-radio-group v-model="tabPosition" class="tab-list">
                        <el-radio-button label="0">全部渠道</el-radio-button>
                        <el-radio-button label="1">散客</el-radio-button>
                        <el-radio-button label="2">会员</el-radio-button>
                    </el-radio-group>
                    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                </div>
            </el-col>
            <el-col :span="14" class="section-rgt">
                <div class="section-header">
                    店铺业绩
                </div>
                <div class="section-content">
                    <ul class="tab-detail">
                        <li>
                            <span>今日交易总额</span>
                            <p>123<span>元</span></p>
                        </li>
                        <li>
                            <span>今月交易总额</span>
                            <p>123<span>元</span></p>
                        </li>
                        <li>
                            <span>今年度交易总额</span>
                            <p>123<span>元</span></p>
                        </li>
                    </ul>
                    <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import VePie from 'v-charts/lib/pie';
    import VeLine from 'v-charts/lib/line';
    export default {
        data(){
            this.chartSettings = {
                dimension: '日期',
                metrics: '访问用户'
            };
            this.chartSettings1 = {
                xAxisType: 'time'
            };
            return{
                tabPosition: '0',
                chartData: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                },
                chartData1: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        { '日期': '2018-01-01', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                        { '日期': '2018-01-02', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                        { '日期': '2018-01-03', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                        { '日期': '2018-01-05', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                        { '日期': '2018-01-10', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                        { '日期': '2018-01-20', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                    ]
                }
            }
        },
        components: {
            VePie,
            VeLine
        }
    }
</script>
<style lang="scss" scoped>
    .chart-three-container{
        margin-top: 10px;
        .section-lf{
            padding-right: 10px;
            .section-header{
                padding: 10px;
                font-size: 14px;
                font-weight: bold;
                background: #fff;
                border-bottom: 1px solid #ddd;
            }
            .section-content{
                background: #fff;
                height: 550px;
                .tab-list{
                    padding: 20px 10px;
                }
            }
        }
        .section-rgt{
            background: #fff;
            .section-header{
                padding: 10px;
                font-size: 14px;
                font-weight: bold;
                background: #fff;
                border-bottom: 1px solid #ddd;
            }
            .section-content{
                height: 550px;
                .tab-detail{
                    padding: 10px 40px;
                    display: flex;
                    justify-content: space-between;
                    li{
                        padding: 20px;
                        span{
                            font-size: 12px;
                            color: rgb(172,172,172);
                        }
                        p{
                            font-size: 18px;
                            margin-top: 5px;
                            span{
                                font-size: 12px;
                                color: rgb(172,172,172);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .chart-three-container{
        .el-radio-button__inner{
            padding: 5px;
        }
    }
</style>
