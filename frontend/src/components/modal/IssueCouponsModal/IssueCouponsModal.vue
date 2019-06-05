<template>
    <div :class="(form.grantType == 2 || form.grantType == 3) ? 'modal-container issue-coupon-modal active' : 'modal-container issue-coupon-modal' " v-if="modalStatus">
        <el-dialog title="发放优惠卷" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" class="form-dialog" :rules="dataRule" status-icon ref="form" label-position="left">
                <div class="section-lf">
                    <div class="form-item">
                        <el-form-item label="优惠卷名称:" label-width="120px" class="form-item-list">
                            {{form.couponName}}
                        </el-form-item>
                        <el-form-item label="优惠卷类型:" label-width="100px" class="form-item-list">
                            {{form.grantType == '1' ? '代金券' : '折扣券'}}
                        </el-form-item>
                    </div>
                    <el-form-item label="有效期:" label-width="100px" class="form-item-list">
                        {{form.start | timeStampTrans}}至{{form.end | timeStampTrans}}
                    </el-form-item>
                    <el-form-item label="使用条件:" label-width="120px">
                        单人单日限用{{form.useCondition.use}}张,
                        单人单日限领{{form.useCondition.get}}张,
                        最低消费{{form.useCondition.amount}}元
                    </el-form-item>
                    <div class="form-item">
                        <el-form-item label="总数量:" label-width="120px" class="form-item-list">
                            {{form.allCount}}张
                        </el-form-item>
                        <el-form-item label="剩余数量:" label-width="100px" class="form-item-list">
                            {{form.remainCount}}张
                        </el-form-item>
                    </div>
                    <el-form-item label="发放方式:" label-width="120px">
                        <template>
                            <el-radio v-model="form.grantType" label="1">批量生成优惠码</el-radio>
                            <el-radio v-model="form.grantType" label="2">选择部分会员发放</el-radio>
                            <el-radio v-model="form.grantType" label="3">按会员等级发放</el-radio>
                            <el-radio v-model="form.grantType" label="4">给全部会员发放</el-radio>
                            <el-radio v-model="form.grantType" label="5">按会员最后消费时间发放</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="单个发放数量:" label-width="120px">
                        <el-input class="input-paper" v-model="form.count" placeholder="请输入发放张数"></el-input>张/会员
                    </el-form-item>
                    <el-form-item label="优惠券发放数量:" label-width="120px" v-if="form.grantType == 1">
                        <el-input placeholder="请输入发放张数" v-model="form.applyCount" class="input-paper"></el-input>张/会员
                    </el-form-item>
                    <el-form-item label="已经选择:" label-width="120px"  v-if="form.grantType == 2 || form.grantType == 3">
                        1个
                    </el-form-item>
                    <el-form-item label="未消费天数:" label-width="120px"  v-if="form.grantType == 5">
                        <el-input v-model="form.day" placeholder="请输入未消费天数"></el-input>
                    </el-form-item>
                </div>
                <div class="section-rgt" v-if="form.grantType == 2 || form.grantType == 3">
                    <!--选择部分会员-->
                    <div class="select-little-member-section" v-if="form.grantType == 2">
                        <p>选择会员</p>
                        <el-select v-model="form.memberLevel" placeholder="按会员等级筛选">
                            <el-option
                                v-for="item in memberLevelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入内容" v-model="form.keyword" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                        </el-input>
                        <div class="member-list">
                            <div class="member-list-header">
                                <el-button class="btn-all" @click="handleAll">全选</el-button>
                                <el-button class="btn-cancle" @click="handleCancle">取消选择</el-button>
                            </div>
                            <div class="member-list-main">
                                <el-checkbox-group v-model="form.memberIds">
                                    <el-checkbox :label="item.memberId" class="member-single" v-for="(item,idx) in initDataArray" :key="idx">{{item.mobile}}({{item.userName}})<br></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                    <!--会员等级-->
                    <div class="member-level-section" v-if="form.grantType == 3">
                        <div class="member-list-main">
                            <el-checkbox-group v-model="form.memberIds">
                                <el-checkbox :label="item.accountId" v-for="(item,idx) in initDataArray" :key="idx">{{item.mobile}}({{item.userName}})<br></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">发放优惠券</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGrantCoupon,requestGetMemberList } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_COUMANAGE_LIST } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    grantType: '1',
                    count: '',
                    applyCount: '',
                    memberLevel: '',
                    keyword: '',
                    day: '',
                    memberIds: [],
                },
                initDataArray: [],
                memberLevelOptions: [
                    {
                        label: 1,
                        value: 1
                    }
                ]
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.IssueCouponsModal.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.IssueCouponsModal.status;
                if(this.modalStatus){
                    this.form = Object.assign({},this.form,this.$store.state.IssueCouponsModal.data,{
                        createDate: '',
                        useCondition: JSON.parse(this.$store.state.IssueCouponsModal.data.useCondition),
                        shopId: this.$route.params.id
                    });
                }
            }
        },
        methods: {
            handleConfirm(){
                let params = this.form;
                requestGrantCoupon(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('发放成功');
                        EventBus.$emit(UPDATE_COUMANAGE_LIST);
                    }else{
                        Message.error(res.data.msg);
                    }
                    this.handleCloseModal()
                })
            },
            handleCloseModal(){
                this.$store.dispatch('closeIssueCouponsModal')
            },
            handleSearch(){
                this.form.memberIds = [];
                let params = {
                    shopId: this.$route.params.id,
                    keyword: this.form.keyword,
                    pageNum: 1
                };
                requestGetMemberList(params).then(res=>{
                    this.initDataArray = res.data.data.list
                })
            },
            // 全选
            handleAll(){
                let arr = [];
                this.initDataArray.forEach(item=>{
                    arr.push(item.memberId)
                });
                this.form.memberIds = arr;
            },
            // 取消
            handleCancle(){
                this.form.memberIds = []
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .issue-coupon-modal{
        .form-dialog{
            display: flex;
            .section-lf{
                width: 515px;
                .form-item{
                    display: flex;
                    .form-item-list{
                        width: 50%;
                    }
                }
                .input-paper{
                    width: 150px;
                    margin-right: 5px;
                }
            }
            .section-rgt{
                width: 230px;
                .member-list{
                    .member-list-header{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        border-bottom: 1px dashed #ddd;
                        padding-bottom: 10px;
                        .btn-all{
                            @include buttonSet($color)
                        }
                    }
                    .member-single{
                        margin-top: 5px;
                    }
                }
            }
        }
        .dialog-btn{
            padding: 10px 15px;
            &:first-child{
                &:hover{
                    color: $color;
                    border-color: $color-level1;
                    background-color: $color-level2;
                }
            }
            &:last-child{
                background: $color;
                border-color: $color;
            }
        }
    }
</style>
<style lang="scss">
    .issue-coupon-modal{
        &.active{
            .el-dialog{
                width: 750px;
            }
        }
    }
</style>
