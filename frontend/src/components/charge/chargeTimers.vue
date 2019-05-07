<template>
    <div class="container container-timers">
        <el-form :model="form" :rules="dataRule" status-icon ref="form" >
            <!--<el-form-item label="操作类型:" label-width="85px" class="item-single">-->
                <!--<router-link to="/">充值</router-link>-->
                <!--<router-link to="/">充次</router-link>-->
            <!--</el-form-item>-->
            <div class="money-box">
                <el-form-item prop="product" label="选择商品:" label-width="85px" class="item-single">
                    <el-select v-model="form.product" filterable placeholder="请选择">
                        <el-option
                            v-for="item in form.productOptions"
                            :key="item.goodsId"
                            :label="item.goodsName"
                            :value="item.goodsId">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="应收金额:" prop="rechargeAmount" label-width="85px" class="item-single">
                    <el-input v-model="form.rechargeAmount"></el-input>
                </el-form-item>
            </div>
            <div class="money-box">
                <el-form-item label="支付方式:" label-width="85px" class="item-single">
                    <el-radio v-model="form.payType" label="01" >现金</el-radio>
                    <el-radio v-model="form.payType" label="04" >银行卡</el-radio>
                    <el-radio v-model="form.payType" label="03" >支付宝</el-radio>
                    <el-radio v-model="form.payType" label="02" >微信</el-radio>
                </el-form-item>
                <el-form-item label="充次次数:" prop="times" label-width="85px" class="item-single">
                    <el-input v-model="form.times"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="有效期限:" label-width="85px" class="item-single"  prop="expDay">
                <el-input v-model="form.expDay"></el-input>
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
                合计充值：<span>￥{{ computedMoney }}</span>
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
import { getDate } from '@/common/utils';
import { requestRechargetimes,requestGetSimplerechargetimes,requestGetServerlist } from '@/services/service'
import EventBus from '@/components/eventEmitter/eventEmitter.js';
import { Message } from 'element-ui'
export default {
    data(){
        return{
            form: {
                goodsIds: [],
                productOptions: [
                ],
                product: '',
                rechargeAmount: '',
                times: '',
                expDay: '',
                reduceMoney: '1',
                payType: '01',
                reduceMoneyOptions: [{label: '无优惠信息',value:'1'}],
                remark: '',
                print: false,
                searchData: "01",
                date: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '1个月',
                        onClick(picker) {
                            const date = new Date();
                            date.setMonth(date.getMonth() + 1);
                            EventBus.$emit('expDayChange','01')
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '6个月',
                        onClick(picker) {
                            const date = new Date();
                            date.setMonth(date.getMonth() + 6);
                            EventBus.$emit('expDayChange','02')
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一年',
                        onClick(picker) {
                            const date = new Date();
                            date.setMonth(date.getMonth() + 12);
                            EventBus.$emit('expDayChange','03')
                            picker.$emit('pick', date);
                        }
                    },{
                        text: '长期',
                        onClick(picker) {
                            const date = new Date();
                            date.setFullYear(date.getFullYear() + 1000);
                            EventBus.$emit('expDayChange','04')
                            picker.$emit('pick', date);
                        }
                    }]
                },
            },
            dataRule: {
                product: [
                    { required: true, message: '商品不能为空', trigger: 'blur' },
                ],
                rechargeAmount: [
                    { required: true, message: '金额不能为空', trigger: 'blur' },
                ],
                times: [
                    { required: true, message: '次数不能为空', trigger: 'blur' },
                ],
                expDay: [
                    { required: true, message: '有效期不能为空', trigger: 'blur' },
                ]
            },
            initDataArray: [],
            shopId: '',
        }
    },
    props: [
        'memberId'
    ],
    computed: {
        computedMoney(){
            return this.form.rechargeAmount|| 0
        }
    },
    watch: {
        memberId(newVal,oldVal){
            if(newVal){

            }
        }
    },
    mounted(){
        EventBus.$on('expDayChange',(params)=>{
            this.setExpDay(params)
        });
        this.getOptionsData()
    },
    methods: {
        initData(){
            let timerObj = getDate('01');
            let params = {
                shopId: this.$route.params.id,
                memberId: this.memberId,
            };
            params = Object.assign({},params,timerObj);
            requestGetSimplerechargetimes(params).then((res)=>{
                this.initDataArray = res.data.data.list
            });
        },
        handleCommit(){
            let params1 = {
                shopId: this.$route.params.id,
                memberId: this.memberId,
                payAmount: this.form.rechargeAmount,
                orderAmount: this.computedMoney,
                goodsIds: [this.form.product],
                rate: 100
            };
            let params = Object.assign({},this.form,params1);
            requestRechargetimes(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message.success('充值成功');
                    this.clearData();
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
            requestGetSimplerechargetimes(params1).then((res)=>{
                this.initDataArray = res.data.data.list
            })
        },
        // 设置过期时间
        setExpDay(params){
            switch (params) {
                case '01':
                    return this.form.expDay = '30'
                case '02':
                    return this.form.expDay = '183'
                case '03':
                    return this.form.expDay = '365'
                case '04':
                    return this.form.expDay = '10000000'
            }
        },
        getOptionsData(){
            let params = {
                shopId: this.$route.params.id
            };
            requestGetServerlist(params).then((res)=>{
                this.form.productOptions = res.data.data.list
            })
        },
        clearData(){
            this.form= {
                goodsIds: [],
                    productOptions: [
                ],
                product: '',
                rechargeAmount: '',
                times: '',
                expDay: '',
                reduceMoney: '1',
                payType: '01',
                reduceMoneyOptions: [{label: '无优惠信息',value:'1'}],
                remark: '',
                print: false,
                searchData: "01",
                date: '',
                pickerOptions: {
                shortcuts: [{
                    text: '1个月',
                    onClick(picker) {
                        const date = new Date();
                        date.setMonth(date.getMonth() + 1);
                        EventBus.$emit('expDayChange','01')
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '6个月',
                    onClick(picker) {
                        const date = new Date();
                        date.setMonth(date.getMonth() + 6);
                        EventBus.$emit('expDayChange','02')
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一年',
                    onClick(picker) {
                        const date = new Date();
                        date.setMonth(date.getMonth() + 12);
                        EventBus.$emit('expDayChange','03')
                        picker.$emit('pick', date);
                    }
                },{
                    text: '长期',
                    onClick(picker) {
                        const date = new Date();
                        date.setFullYear(date.getFullYear() + 1000);
                        EventBus.$emit('expDayChange','04')
                        picker.$emit('pick', date);
                    }
                }]
            },
            }
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
    .container-timers{
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
