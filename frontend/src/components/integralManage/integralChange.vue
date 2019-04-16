<template>
    <div class="container integral-change-container">
        <div class="section-header">
            <el-form :model="form" :rules="dataRule" status-icon ref="form" class="section-form">
                <div class="section-header-lf">
                    <el-form-item label="操作类型:"  label-width="85px" class="item-single">
                        <el-radio-group class="input-box" v-model="form.transType" size="small">
                            <el-radio label="1" class="gender-list">充值</el-radio>
                            <el-radio label="2" class="gender-list">扣除</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="section-header-rgt">
                    <el-form-item label="变动数额:" label-width="85px" class="item-single" prop="transIntegral">
                        <el-input v-model="form.transIntegral" placeholder="输入变动数额" class="item-input"></el-input>
                        <el-button class="item-save" @click="handleOperate">保存</el-button>
                        <el-button class="item-clear" @click="handleClearOperate">积分清零</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="section-content">
            <p>操作日志：</p>
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%" border class="data-table">
                <el-table-column label="会员卡号" show-overflow-tooltip prop="memberNo"></el-table-column>
                <el-table-column label="会员姓名" show-overflow-tooltip prop="userName"></el-table-column>
                <el-table-column label="会员等级" show-overflow-tooltip prop="gradeName"></el-table-column>
                <el-table-column label="操作类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.transType == '1'">增加</span>
                        <span v-else>减少</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{timeStampTrans(scope.row.createDate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="剩余积分" show-overflow-tooltip prop="afterIntegral"></el-table-column>
            </el-table>
            <div class="table-footer" v-show="initDataArray.length">
                <span>总计：</span>
                <span>{{ allIntr }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetIntegralOperate,requestGetIntegralList } from '@/services/service';
    import { Message } from 'element-ui';
    import { INTEGRAL_CHANGE } from '@/components/eventEmitter/eventName';
    import EventEmitter from '@/components/eventEmitter/eventEmitter';
    import { timeStampTrans } from '@/common/utils'
    export default {
        data(){
            let transIntegralValidate =  (rule, value, callback)=>{
                if(!/^[0-9]*$/.test(value)){
                    callback(new Error('请输入正确的数值'));
                }else{
                    callback();
                }
            };
            return{
                form: {
                    transType: '1',          //   1增加  2减少
                    transIntegral: ''
                },
                initDataArray: [],
                dataRule: {
                    transIntegral: [
                        { required: true, message: '变动金额不能为空', trigger: 'blur' },
                        { validator: transIntegralValidate,trigger: 'blur' }
                    ]
                }
            }
        },
        props: [
            'memberId',
            'integral'
        ],
        computed: {
            allIntr(){
                return 0;
            }
        },
        watch: {
            memberId(val){
                if(this.memberId){
                    this.initData()
                }
                return;
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            // 获取操作日志
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    memberId: this.memberId
                }
                requestGetIntegralList(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleOperate(){
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        let params = {
                            shopId: this.$route.params.id,
                            memberId: this.memberId,
                            transType: this.form.transType,
                            transIntegral: this.form.transIntegral
                        };
                        requestGetIntegralOperate(params).then((res)=>{
                            if(res.data.code == '0000'){
                                Message.success('操作成功');
                                this.form = {
                                    transType: '1',   //   1增加  2减少
                                    transIntegral: ''
                                };
                                EventEmitter.$emit('INTEGRAL_CHANGE');
                                this.initData();
                            }else{
                                Message.error(res.data.msg)
                            }
                        }).catch(()=>{
                            Message.error('操作失败');
                        })
                    }
                })
            },
            handleClearOperate(){
                let params = {
                    shopId: this.$route.params.id,
                    memberId: this.memberId,
                    transType: '2',
                    transIntegral: this.integral
                }
                requestGetIntegralOperate(params).then((res)=>{
                    if(res.data.code == '0000'){
                        Message.success('操作成功');
                        this.form = {
                            transType: '1',   //   1增加  2减少
                            transIntegral: ''
                        };
                        EventEmitter.$emit('INTEGRAL_CHANGE');
                        this.initData();
                    }else{
                        Message.error(res.data.msg)
                    }
                }).catch(()=>{
                    Message.error('操作失败');
                })
            },
            timeStampTrans(params){
                return timeStampTrans(params)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .integral-change-container{
        margin-top: 10px;
        background: #fff;
        .section-header{
            .section-form{
                display: flex;
                padding: 10px 0;
                .section-header-rgt{
                    margin-left: 50px;
                    .item-input{
                        width: 200px;
                    }
                    .item-save{
                        @include buttonType1();
                        margin-left: 10px;
                    }
                }
            }
        }
        .section-content{
            padding-top: 10px;
            border-top: 1px solid #ddd;
            p{
                padding-left: 15px;
            }
            .table-footer{
                text-align: right;
                padding: 20px;
                border-bottom: 1px solid #EBEEF5;
                margin-bottom: 20px;
                font-weight: bold;
            }
        }
    }
</style>
