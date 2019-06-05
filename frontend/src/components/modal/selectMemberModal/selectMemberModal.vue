<template>
    <div class="modal-container select-member-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="选择会员" :visible.sync="modalStatus" @close='handleCloseModal' >
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
                        <ul>
                            <li>姓名: <span>{{memberData.userName}}</span></li>
                            <li>余额: <span>{{memberData.balance}}</span></li>
                            <li>等级: <span>{{memberData.level}}</span></li>
                            <li>折扣: <span>{{memberData.discount}}</span></li>
                            <li>电话: <span>{{memberData.mobile}}</span></li>
                            <li>积分: <span>{{memberData.integral}}</span></li>
                            <li>办卡员工: <span>{{memberData.guestFromName}}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="select-member-rgt">
                    <calculator @handleCalcAddNum="handleCalcAddNum"
                                @handleCalcEnsure="handleCalcEnsure"
                                @handleCalcCancle="handleCalcCancle" />
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import calculator from '@/components/common/calculator';
    import { requestSearchMemberlist,requestGetMemberList } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { SELECT_MEMBER_BY_HAND,UPDATE_SELECT_MEMBER } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                searchKey: '',
                memberData: {},        // 选中的会员信息
            }
        },
        components: {
            calculator
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.selectMemberModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.selectMemberModalStatus;
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
                this.$store.dispatch('closeSelectMemberModal');
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
                EventBus.$emit(UPDATE_SELECT_MEMBER,this.memberData);
                this.handleCloseModal();
            },
            handleCalcCancle(){
                this.handleCloseModal();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .select-member-modal{
        .dialog-box{
            .el-dialog{
                width: 1151px;
                .select-containor{
                    display: flex;
                    .select-member-lf{
                        width: 50%;
                        padding-top: 20px;
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
                            ul{
                                margin: 0 10px;
                                display: flex;
                                flex-wrap: wrap;
                                padding: 10px 0;
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
                        }
                    }
                    .select-member-rgt{
                        width: 50%;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .select-member-modal{
        .el-dialog__body{
            background: #F2F2F2;
        }
    }
</style>
