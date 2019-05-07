<template>
    <div class="container container-charge">
        <el-form :model="form" :rules="dataRule" status-icon ref="form" >
            <!--<el-form-item label="操作类型:" label-width="85px" class="item-single">-->
                <!--<router-link :to="'shopdetail/'+shopId+'/charge/chargeMoney'">充值</router-link>-->
                <!--<router-link :to="'shopdetail/'+shopId+'/charge/chargeTimers'">充次</router-link>-->
            <!--</el-form-item>-->
            <el-form-item label="选择类型:" label-width="85px" class="item-single">
                <el-radio v-model="form.orderType" label="01">充值</el-radio>
                <el-radio v-model="form.orderType" label="04">扣费</el-radio>
                <el-radio v-model="form.orderType" label="05">退还</el-radio>
            </el-form-item>
            <div class="money-box">
                <el-form-item prop="rechargeAmount" label="充值金额:" label-width="85px" class="item-single">
                    <el-input v-model="form.rechargeAmount"></el-input>
                </el-form-item>
                <el-form-item label="赠送金额:" label-width="85px" class="item-single">
                    <el-input v-model="form.giveAmount"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="支付方式:" label-width="85px" class="item-single">
                <el-radio v-model="form.payType" label="01" >现金</el-radio>
                <el-radio v-model="form.payType" label="04" >银行卡</el-radio>
                <el-radio v-model="form.payType" label="03" >支付宝</el-radio>
                <el-radio v-model="form.payType" label="02" >微信</el-radio>
            </el-form-item>
            <el-form-item label="优惠信息:" label-width="85px" class="item-single">
                <el-select v-model="form.reduceMoney" placeholder="请选择">
                    <el-option
                    v-for="item in form.reduceMoneyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注信息:" label-width="85px" class="item-single">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入备注，最多50字"></el-input>
            </el-form-item>
        </el-form>
        <div class="container-footer">
            <div class="container-footer-left">
                <el-checkbox v-model="form.print">打印充值小票</el-checkbox>
                合计充值：<span>￥{{computedMoney}}</span>
            </div>
            <div class="container-footer-rgt">
                <el-button class="ensure-btn" @click="handleCommit">确定</el-button>
            </div>
        </div>
        <div class="container-table">
            <el-radio-group v-model="form.searchData" @change="searchDataChange" size="small">
                <el-radio-button label="01">今日</el-radio-button>
                <el-radio-button label="02">昨日</el-radio-button>
                <el-radio-button label="03">本周</el-radio-button>
                <el-radio-button label="04">其它</el-radio-button>
            </el-radio-group>
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%" border class="data-table">
                <el-table-column label="操作类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderType == '01'">账户充值</span>
                        <span v-else-if="scope.row.orderType == '02'">账户消费</span>
                        <span v-else-if="scope.row.orderType == '03'">次卡充值</span>
                        <span v-else-if="scope.row.orderType == '04'">账户扣款</span>
                        <span v-else-if="scope.row.orderType == '05'">账户退还</span>
                        <span v-else>积分操作</span>
                    </template>
                </el-table-column>
                <el-table-column label="支付类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.payType == '01'">现金</span>
                        <span v-else-if="scope.row.payType == '02'">微信支付</span>
                        <span v-else-if="scope.row.payType == '03'">支付宝付款</span>
                        <span v-else-if="scope.row.payType == '04'">银行卡</span>
                        <span v-else-if="scope.row.payType == '05'">账户支付</span>
                        <span v-else>欠款</span>
                    </template>
                </el-table-column>
                <el-table-column label="变动前金额" show-overflow-tooltip prop="beforeBalance"></el-table-column>
                <el-table-column label="充值金额" show-overflow-tooltip prop="rechargeAmount"></el-table-column>
                <el-table-column label="赠送金额" show-overflow-tooltip prop="giveAmount"></el-table-column>
                <el-table-column label="变动后金额" show-overflow-tooltip prop="transAmount"></el-table-column>
                <el-table-column label="充值时间" show-overflow-tooltip prop="createDate"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="orderRemark"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {requestRecharge,requestGetSimplerecharge} from '@/services/service';
import { Message } from 'element-ui';
import { getDate } from '@/common/utils'

export default {
    data(){
        return{
            form: {
                orderType: '01',
                rechargeAmount: '',
                giveAmount: '',
                payType: '01',
                freeAmount: '1',
                reduceMoneyOptions: [{label: '无优惠信息',value:'1'}],
                remark: '',
                print: false,
                searchData: "01",
            },
            initDataArray: [],
            dataRule: {
                rechargeAmount:[
                    { required: true, message: '充值金额不能为空', trigger: 'blur' },
                ]
            },
            shopId: '',
        }
    },
    computed: {
        computedMoney(){
            return (this.form.rechargeAmount - this.form.giveAmount) || 0
        }
    },
    props: [
        'memberId'
    ],
    mounted(){
        this.shopId = this.$route.params.id;
        this.initData()
    },
    watch: {
        memberId(newVal,oldVal){
            if(newVal){

            }
        }
    },
    methods: {
        initData(){
            let timerObj = getDate('01');
            let params = {
                shopId: this.$route.params.id,
                memberId: this.memberId,
            }
            params = Object.assign({},params,timerObj)
            requestGetSimplerecharge(params).then((res)=>{
                this.initDataArray = res.data.data.list
            })
        },
        handleCommit(){
            let params1 = {
                shopId: this.$route.params.id,
                memberId: this.memberId,
                payAmount: this.form.rechargeAmount,
                orderAmount: this.computedMoney,
                rate: 100
            }
            let params = Object.assign({},this.form,params1);
            requestRecharge(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message.success('充值成功');
                }else{
                    Message.error(res.data.msg);
                }
            }).catch(function(){
                Message.error('充值失败');
            })
        },
        searchDataChange(params){
            let timerObj = getDate(params);
            let params1 = {
                shopId: this.$route.params.id,
                memberId: this.memberId,
            };
            params1 = Object.assign({},params1,timerObj)
            requestGetSimplerecharge(params1).then((res)=>{
                this.initDataArray = res.data.data.list
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        background: #fff;
        margin-top: 10px;
        padding: 10px 30px 10px 10px;
        .item-single{
            margin-bottom: 20px;
        }
        .money-box{
            display: flex;
            justify-content: space-between;
            .item-single{
                width: 50%;
            }
        }
        .container-footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .container-footer-left{
                padding-left: 15px;
            }
        }
        .container-table{
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 20px;
            .data-table{
                margin-top: 20px;
            }
        }
    }
</style>
<style lang="scss" >
    @import '@/assets/scss/common.scss';
    .container-charge{
        .ensure-btn{
            @include buttonType1();
        }
        .el-radio__input.is-checked .el-radio__inner {
            border-color: $color;
            background: $color;
        }
        .el-radio__input.is-checked+.el-radio__label{
            color: $color;
        }
    }
</style>
