<template>
    <div class="modal-container add-coupon-modal" v-if="modalStatus">
        <el-dialog title="修改优惠卷" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" label-position="left">
                <el-form-item prop="couponName" label="优惠卷名称" label-width="100px">
                    <el-input placeholder="请输入优惠卷名称"  class="pwd input-box" v-model="form.couponName" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item label="优惠类型" label-width="100px">
                    <el-radio v-model="form.couponType" label="1">代金券</el-radio>
                    <el-radio v-model="form.couponType" label="2">折扣券</el-radio>
                </el-form-item>
                <el-form-item prop="faceAmount" label="优惠金额" label-width="100px" v-if="form.couponType == 1">
                    <el-input placeholder="请输入优惠金额"  class="pwd input-box" v-model="form.faceAmount" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item prop="count" label="折扣比例" label-width="100px" v-else>
                    <el-input placeholder="请输入折扣比例"  class="pwd input-box" v-model="form.count" maxlength="20" >
                        <span slot="append">%</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="优惠券数量" label-width="100px">
                    <el-input placeholder="请输入发放数量"  class="pwd input-box" v-model="form.allCount" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item label="有效期" label-width="100px" >
                    <div class="data-item">
                        <el-radio v-model="form.expireType" label="0">永久有效</el-radio>
                    </div>
                    <div class="data-item">
                        <el-radio v-model="form.expireType" label="1">
                            <el-date-picker
                                v-model="timePicker"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-radio>
                    </div>
                    <div class="data-item">
                        <el-radio v-model="form.expireType" label="2">
                            从发行日起 <el-input class="day-item" placeholder="天数" v-model="form.days"></el-input> 有效
                        </el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="使用条件" label-width="100px">
                    <div class="data-item">
                        单人单日限用<el-input class="condition-item" v-model="form.useCondition.use" maxlength="20" ></el-input>张
                    </div>
                    <div class="data-item">
                        单人单日限领<el-input class="condition-item" v-model="form.useCondition.get" maxlength="20" ></el-input>张[0表示不限制]
                    </div>
                    <div class="data-item">
                        最低消费<el-input class="condition-item" v-model="form.useCondition.amount" maxlength="20" ></el-input>元[达到可用]
                    </div>
                </el-form-item>
                <el-form-item label="备注" label-width="100px">
                    <el-input placeholder="备注信息" type="textarea" class="pwd input-box" v-model="form.remark" maxlength="200" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="footer-lf">
                    <el-checkbox v-model="form.overlay == '1'" @change="handleChange">是否可叠加使用</el-checkbox>
                </div>
                <div class="footer-rgt">
                    <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestUpdateCoupon } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_COUMANAGE_LIST } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    couponName: '',
                    couponType: '1', //1 代金券 2 折扣券
                    count: '',
                    faceAmount: '',
                    allCount: '',
                    effectiveType: '1',  //1 日期 2 天数
                    startDate: '',
                    endDate: '',
                    days: '',
                    useCondition: {
                        use: 0,
                        get: 0,
                        amount: 0
                    },
                    remark: '',
                    overlay: 1,

                    expireType: '0',   // 有效期类型

                },
                timePicker: '',
                dataRule: {

                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.editCouponModalStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.editCouponModalStatus.status;
                if(this.modalStatus){
                    this.form = Object.assign({},this.form,this.$store.state.editCouponModalStatus.data,{
                        createDate: '',
                        useCondition: JSON.parse(this.$store.state.editCouponModalStatus.data.useCondition)
                    })
                }
            },
            timePicker(){
                this.form.startDate = this.timePicker[0];
                this.form.endDate = this.timePicker[1];
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let typeConifg = {};
                        if(this.expireType == '0'){
                            typeConifg = {
                                effectiveType: 2,
                                days: 10000000,
                                useCondition: JSON.stringify(this.form.useCondition)
                            }
                        }else if(this.expireType == '1'){
                            typeConifg = {
                                effectiveType: 1,
                                useCondition: JSON.stringify(this.form.useCondition)
                            }
                        }else{
                            typeConifg = {
                                effectiveType: 2,
                                useCondition: JSON.stringify(this.form.useCondition)
                            }
                        }
                        let params = Object.assign({},this.form,typeConifg,{shopId: this.$route.params.id});
                        requestUpdateCoupon(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '更新成功',
                                    type: 'success'
                                })
                                EventBus.$emit(UPDATE_COUMANAGE_LIST);
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'更新失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    couponName: '',
                    couponType: '1', //1 代金券 2 折扣券
                    count: '',
                    faceAmount: '',
                    allCount: '',
                    effectiveType: '1',  //1 日期 2 天数
                    startDate: '',
                    endDate: '',
                    days: '',
                    useCondition: {
                        use: 0,
                        get: 0,
                        amount: 0
                    },
                    remark: '',

                    expireType: '0',   // 有效期类型
                };
                this.timePicker = '';
                this.$store.dispatch('closeEditCouponModal')
            },
            handleChange(val){
                this.form.overlay = val ? '1' : '0'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .add-coupon-modal{
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
        .data-item{
            margin-bottom: 10px;
        }
        .day-item,.condition-item{
            width: 100px;
            margin: 0 5px;
        }
        .dialog-footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';
    .add-coupon-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 10px;
        }
        .el-dialog__headerbtn{
            .el-dialog__close{
                &:hover{
                    color: $color !important;
                }
            }
        }
    }
</style>
