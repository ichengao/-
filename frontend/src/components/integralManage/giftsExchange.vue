<template>
    <div class="container gifts-exchange-container">
        <div class="section-header">
            <el-form :model="form" :rules="dataRule" status-icon ref="form" class="section-form">
                <el-form-item label="选择礼品:" label-width="85px" class="item-single">
                    <el-select
                        v-model="form.giftIds"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="选择礼品"
                        class="el-select">
                        <el-option
                            v-for="item in initDataArray"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button class="el-button">兑换</el-button>
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
                        <span>{{ scope.row.createDate | timeStampTrans }}</span>
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
    import { requestGetGiftList,requestGetIntegralList } from '@/services/service';
    import { Message } from 'element-ui';
    import { INTEGRAL_CHANGE } from '@/components/eventEmitter/eventName';
    import EventEmitter from '@/components/eventEmitter/eventEmitter';
    export default {
        data(){
            return{
                form: {
                    giftIds: ''
                },
                initDataArray: [],
                dataRule: {
                    transIntegral: [
                        { required: true, message: '变动金额不能为空', trigger: 'blur' }
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
                    shopId: this.$route.params.id
                }
                requestGetGiftList(params).then((res)=>{
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
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .gifts-exchange-container{
        margin-top: 10px;
        background: #fff;
        .section-header{
            background: #fff;
            .section-form{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                .item-single{
                    padding-top: 10px;
                    position: relative;
                    top: 10px;
                    .el-select{
                        min-width: 300px;
                    }
                }
                .el-button{
                    @include buttonType1()
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
