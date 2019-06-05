<template>
    <div class="modal-container fast-incharge-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="会员快捷充值" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="select-containor">
                <div class="select-member-lf">
                    <div class="section1">
                        <el-input v-model="searchKey" placeholder="刷卡或输入卡号/手机号"
                        >
                            <span slot="prefix" class="el-icon-more control-btn" @click="handleSearchMemberByHand"></span>
                            <span slot="suffix" class="el-icon-search control-btn" @click="handleSearch"></span>
                        </el-input>
                    </div>
                    <div class="section2">
                        <ul class="section2-1">
                            <li>姓名: <span>{{memberData.userName}}</span></li>
                            <li>余额: <span>{{memberData.balance}}</span></li>
                        </ul>
                        <div class="section2-2">
                            <p>支付方式</p>
                            <ul>
                                <li><el-radio v-model="form.payType" label="01">现金</el-radio></li>
                                <li><el-radio v-model="form.payType" label="02">微信支付</el-radio></li>
                                <li><el-radio v-model="form.payType" label="03">支付宝支付</el-radio></li>
                                <li><el-radio v-model="form.payType" label="04">银行卡</el-radio></li>
                            </ul>
                        </div>
                        <div class="section2-3">
                            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                                     >
                                <el-table-column prop="accountId" label="本次充值卡号" show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column prop="rechargeAmount" label="充值金额" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            @click="handleEditMember(scope.$index, scope.row)">打印小票</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="select-member-rgt">
                    <calculator @handleCalcAddNum="handleCalcAddNum"
                                @handleCalcEnsure="handleCalcEnsure"
                                @handleCalcCancle="handleCalcCancle" >
                        <div slot="insert-box" class="money-box">
                            <el-input class="money-input" v-model="form.inchargeNum" placeholder="充值金额/元"></el-input>
                            <el-input v-model="form.donationNum" placeholder="赠送金额/元"></el-input>
                        </div>
                    </calculator>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import calculator from '@/components/common/calculator';
    import { requestGetMemberList,requestRecharge } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { SELECT_MEMBER_BY_HAND,UPDATE_SELECT_MEMBER } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                searchKey: '',
                memberData: {},        // 选中的会员信息
                form: {
                    inchargeNum: '',
                    donationNum: '',
                    payType: '01'
                },
                initDataArray: []
            }
        },
        components: {
            calculator
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.fastInchargeModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.fastInchargeModalStatus;
                if(this.modalStatus){
                    this.searchKey= '';
                    this.memberData= {};
                }
            }
        },
        mounted(){
            EventBus.$on(SELECT_MEMBER_BY_HAND,accountId=>{
                this.searchKey = accountId;
                this.handleSearch();
            })
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeFastInchargeModal');
            },
            handleCalcAddNum(params){
                this.searchKey += params
            },
            handleSearchMemberByHand(){
                this.$store.dispatch('openSelectMemberByHandModalStatus');
            },
            handleSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    keyword: this.searchKey
                };
                requestGetMemberList(params).then(res=>{
                    if(res.data.data.list.length){
                        this.memberData = res.data.data.list[0];
                    }else{
                        Message.error('找不到该会员，请查证后再查询')
                    }
                })
            },
            handleCalcEnsure(){
                if(!this.memberData.memberId){
                    Message.error('请选择会员');
                    return
                }
                if(!this.form.inchargeNum){
                    Message.error('请输入充值金额');
                    return
                }
                let params = {
                    rechargeAmount: this.form.inchargeNum,
                    giveAmount: this.form.donationNum,
                    payType: this.form.payType,
                    shopId: this.$route.params.id,
                    memberId: this.memberData.memberId,
                    payAmount: this.form.inchargeNum,
                    orderAmount: this.form.inchargeNum,
                    rate: 100
                };
                requestRecharge(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('充值成功');
                        this.initDataArray = [{
                            accountId: this.memberData.accountId,
                            rechargeAmount: (Number(this.form.inchargeNum) + Number(this.form.donationNum))
                        }];
                        this.form = Object.assign({},this.form,{inchargeNum: '',donationNum: ''})
                    }else{
                        Message.error('充值失败')
                    }

                })
            },
            handleCalcCancle(){
                this.handleCloseModal();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .fast-incharge-modal{
        .dialog-box{
            .el-dialog{
                width: 1151px;
                .select-containor{
                    display: flex;
                    .select-member-lf{
                        width: 50%;
                        padding-top: 10px;
                        .section1{
                            .control-btn{
                                display: flex;
                                align-items: center;
                                height: 100%;
                                cursor: pointer;
                                padding: 0 10px;
                                &:hover{
                                    cursor: pointer;
                                }
                            }
                        }
                        .section2{
                            background: #fff;
                            margin-top: 20px;
                            padding: 0 10px;
                            .section2-1{
                                display: flex;
                                flex-wrap: wrap;
                                li{
                                    width: 50%;
                                    font-size: 16px;
                                    padding: 14.5px 0;
                                    span{
                                        color: $color;
                                        margin-left: 5px;
                                    }
                                }
                            }
                            .section2-2{
                                border-top: 1px dashed $color;
                                font-size: 16px;
                                p{
                                    margin: 10px 0;
                                    text-align: center;
                                }
                                ul{
                                    display: flex;
                                    flex-wrap: wrap;
                                    li{
                                        width: 50%;
                                        margin: 5px 0;
                                    }
                                }
                            }
                            .section2-3{
                                border-top: 1px dashed $color;
                                margin-top: 10px;
                            }
                        }
                    }
                    .select-member-rgt{
                        width: 50%;
                        .money-box{
                            padding-left: 10px;
                            .money-input{
                                margin-bottom: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .fast-incharge-modal{
        .el-dialog{
            width: 705px;
            .el-dialog__body{
                background: #F2F2F2;
            }
        }
    }
</style>
