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
                        <ve-histogram :data="chartData0" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">商品销售额排名</p>
                            <ul class="ranking-list">
                                <li v-for="(item,idx) in initDataArray0">
                                    <div class="ranking-list-lf">
                                        <b>{{idx+1}}</b>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        {{item.amount}}
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-else-if="activeName == 'second'">
                    <el-col :span="16">
                        <p class="sectopn-title">会员消费</p>
                        <ve-histogram :data="chartData1" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">商品消费排名</p>
                            <ul class="ranking-list">
                                <li v-for="(item,idx) in initDataArray1" :key="idx">
                                    <div class="ranking-list-lf">
                                        <b>{{idx+1}}</b>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        {{item.amount}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-else>
                    <el-col :span="16">
                        <p class="sectopn-title">其它数据</p>
                        <ve-histogram :data="chartData2" :settings="chartSettings" :extend="chartExtend" height="200px"></ve-histogram>
                    </el-col>
                    <el-col :span="8">
                        <div class="section-rgt">
                            <p class="sectopn-title">员工销售额排名</p>
                            <ul class="ranking-list">
                                <li v-for="(item,idx) in initDataArray2" :key="idx">
                                    <div class="ranking-list-lf">
                                        <b>{{idx+1}}</b>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        {{item.amount}}
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
                chartData0: {
                    columns: ['日期', '销售额'],
                    rows: [
                        // { '日期': '1/1', '销售额': 1393 },
                    ]
                },
                chartData1: {
                    columns: ['日期', '销售额'],
                    rows: [
                        // { '日期': '1/1', '销售额': 1393 },
                    ]
                },
                chartData2: {
                    columns: ['支付方式', '数量'],
                    rows: [
                        // { '日期': '1/1', '销售额': 1393 },
                    ]
                },
                valueDate: '',
                initDataArray0: [],
                initDataArray1: [],
                initDataArray2: []
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            handleClick(name){
                switch (name.index) {
                    case '1':
                        if(this.initDataArray1.length != 0){return}
                        let params = {
                            shopId: this.$route.params.id,
                            type: '02'
                        };
                        requestStatisticsData2(params).then((res)=>{
                            this.initDataArray1 = res.data.data.entity1;
                            let trend = res.data.data.trend;
                            trend.forEach(item=>{
                                this.chartData1.rows.push({
                                    '日期': item.dayOrMonth,
                                    '销售额': item.amount
                                })
                            })
                        });
                        break;
                    case '2':
                        if(this.initDataArray1.length != 0){return}
                        let params1 = {
                            shopId: this.$route.params.id,
                            type: '03'
                        };
                        requestStatisticsData2(params1).then((res)=>{
                            this.initDataArray2 = res.data.data.entity1;
                            let trend = res.data.data.entity2;
                            trend.forEach(item=>{
                                this.chartData2.rows.push({
                                    '支付方式': item.name,
                                    '数量': item.amount
                                })
                            })
                        });
                        break;
                }
            },
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    type: '01'
                };
                requestStatisticsData2(params).then((res)=>{
                    this.initDataArray0 = res.data.data.entity1;
                    let trend = res.data.data.trend;
                    trend.forEach(item=>{
                        this.chartData0.rows.push({
                            '日期': item.dayOrMonth,
                            '销售额': item.amount
                        })
                    })
                })
            },
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
