<template>
    <div class="container container-timers">
        <el-form :model="form" :rules="dataRule" status-icon ref="form" >
            <el-form-item label="操作类型:" label-width="85px" class="item-single">
                <router-link to="/">充值</router-link>
                <router-link to="/">充次</router-link>
            </el-form-item>
            <div class="money-box">
                <el-form-item prop="product" label="选择商品:" label-width="85px" class="item-single">
                    <el-input v-model="form.product"></el-input>
                </el-form-item>
                <el-form-item label="应收金额:" label-width="85px" class="item-single">
                    <el-input v-model="form.receiveMoney"></el-input>
                </el-form-item>
            </div>
            <div class="money-box">
                <el-form-item label="支付方式:" label-width="85px" class="item-single">
                    <el-radio v-model="form.payType" label="1" >现金</el-radio>
                    <el-radio v-model="form.payType" label="2" >银行卡</el-radio>
                    <el-radio v-model="form.payType" label="3" >支付宝</el-radio>
                    <el-radio v-model="form.payType" label="4" >微信</el-radio>
                </el-form-item>
                <el-form-item label="充次次数:" label-width="85px" class="item-single">
                    <el-input v-model="form.receiveMoney"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="有效期限:" label-width="85px" class="item-single">
                <el-date-picker
                    v-model="form.date"
                    type="datetime"
                    format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="form.pickerOptions">
                </el-date-picker>
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
                合计充值：<span>￥123</span>
            </div>
            <div class="container-footer-rgt">
                <el-button class="ensure-btn">确定</el-button>
            </div>
        </div>
        <div class="container-table">
            <el-radio-group v-model="form.searchData" size="small">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="本周"></el-radio-button>
                <el-radio-button label="其它"></el-radio-button>
            </el-radio-group>
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%" border class="data-table">
                <el-table-column label="操作类型" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="支付类型" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="变动前金额" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="充值金额" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="赠送金额" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="变动后金额" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="充值时间" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="accountId"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form: {
                product: '',
                inchargeMoney: '',
                receiveMoney: '',
                payType: '1',
                reduceMoney: '1',
                reduceMoneyOptions: [{label: '无优惠信息',value:'1'}],
                remark: '',
                print: false,
                searchData: "今日",
                date: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            },
            dataRule: {
                product:[
                    { required: true, message: '商品不能为空', trigger: 'blur' },
                ] 
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
    }
</style>
