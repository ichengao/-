<template>
    <div class="coupon-list-container">
        <div class="section-header">
            <ul class="section-content-box">
                <li>
                    <p>累计发放张数</p>
                    <div class="item-content">
                        <span>{{baseData.grantCount}}</span>张
                    </div>
                </li>
                <li>
                    <p>累计核销张数</p>
                    <div class="item-content">
                        <span>{{baseData.checkCount}}</span>张
                    </div>
                </li>
                <li>
                    <p>优惠卷剩余张</p>
                    <div class="item-content">
                        <span>{{baseData.remainCount}}</span>张
                    </div>
                </li>
                <li>
                    <p>优惠总金额</p>
                    <div class="item-content">
                        <span>{{baseData.freeAmount}}</span>元
                    </div>
                </li>
            </ul>
        </div>
        <div class="section-content">
            <div class="section-header">
                <el-button @click="handleExport">导出</el-button>
                <el-button @click="handleExport">筛选</el-button>
                <div class="section-header-center">
                    <el-radio-group v-model="action">
                        <el-radio-button label="day">今天</el-radio-button>
                        <el-radio-button label="lastDay">昨日</el-radio-button>
                        <el-radio-button label="week">本周</el-radio-button>
                        <el-radio-button label="month">本月</el-radio-button>
                    </el-radio-group>
                    <span>选择日期: </span>
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
                    <el-input placeholder="请输入内容"  class="input-with-select" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="section-content">
                <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                >
                    <el-table-column label="优惠卷名称" show-overflow-tooltip prop="couponName"></el-table-column>
                    <el-table-column label="类型" show-overflow-tooltip >
                        <template slot-scope="scope">
                            {{ scope.row.couponType == '1' ? '代金券' : '折扣券' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="faceAmount" label="面值" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="使用条件" show-overflow-tooltip>
                        <template slot-scope="scope">
                            单人单日限用{{JSON.parse(scope.row.useCondition).use}}张,
                            单人单日限领{{JSON.parse(scope.row.useCondition).get}}张[0表示不限制],
                            最低消费{{JSON.parse(scope.row.useCondition).amount}}元[达到可用]
                        </template>
                    </el-table-column>
                    <el-table-column label="有效期类型" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.effectiveType == '1' ? '日期' : '天数' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="有效期范围" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.start | timeStampTrans}}
                            {{ scope.row.end | timeStampTrans}}
                        </template>
                    </el-table-column>
                    <el-table-column label="核销状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.state == '1' ? '已核销' : ''}}
                            {{scope.row.state == '0' ? '未核销' : ''}}
                            {{scope.row.state == '3' ? '已过期' : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column label="发放时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.createDate | timeStampTrans}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="allIncome" label="核销时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="memberName" label="核销会员" show-overflow-tooltip>
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
    </div>
</template>
<script>
    import { requestCouponRecord,requestGetCouponData } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                baseData: {},
                keyword: '',
                totalCount: 0,
                action: '',
                pickDate: '',
                baseData: {}
            }
        },
        created(){
            this.initData()
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestCouponRecord(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.dataa.data.totalCount;
                });
                requestGetCouponData(params).then(res=>{
                    this.baseData = res.data.data
                });
            },
            handleSearch(){},
            pageChange(){},
            handleExport(){},
            handleDateChange(){}
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .coupon-list-container{
        .section-header{
            margin-top: 10px;
            .section-content-box{
                display: flex;
                justify-content: flex-start;
                padding: 0;
                >li{
                    width: 24.25%;
                    margin-right: 1%;
                    background: #fff;
                    font-size: 12px;
                    padding-bottom: 40px;
                    p{
                        padding-left: 10px;
                    }
                    .item-content{
                        text-align: center;
                        span{
                            font-size: 40px;
                            color: $color;
                            margin-right: 5px;
                        }
                    }
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
        .section-content{
            background: #fff;
            padding-bottom: 10px;
            .section-header{
                display: flex;
                justify-content: space-between;
                padding: 20px;
            }
            .section-content{
                .pagenation{
                    text-align: right;
                    padding: 10px;
                }
            }
        }
    }
</style>
