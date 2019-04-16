<template>
    <div class="modal-container create-gifts-modal" v-if="modalStatus">
        <el-dialog title="新增礼品" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="no">
                    <span>礼品编号</span>
                    <el-input placeholder="请输入礼品编号"  class="pwd input-box" v-model="form.no" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <span>礼品名称</span>
                    <el-input placeholder="请输入礼品名称"  class="pwd input-box" v-model="form.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="needIntegral">
                    <span>所需积分</span>
                    <el-input placeholder="请输入所需积分"  class="pwd input-box" v-model="form.needIntegral" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="count">
                    <span>礼品数量</span>
                    <el-input placeholder="请输入礼品数量"  class="pwd input-box" v-model="form.count" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="unit">
                    <span>礼品单位</span>
                    <el-input placeholder="请输入礼品单位"  class="pwd input-box" v-model="form.unit" maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestAddGift } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { addCategoryStatus,GIFTS_CHANGE } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    no: '',
                    name: '',
                    needIntegral: '',
                    count: '',
                    unit: ''
                },
                dataRule: {
                    no: [
                        { required: true, message: '礼品编号不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '礼品名称不能为空', trigger: 'blur' }
                    ],
                    needIntegral: [
                        { required: true, message: '所需积分不能为空', trigger: 'blur' }
                    ],
                    count: [
                        { required: true, message: '数量不能为空', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '单位不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.createGiftsModalStatus || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.createGiftsModalStatus
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.form,{shopId: this.$route.params.id});
                        requestAddGift(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '新建成功',
                                    type: 'success'
                                })
                                EventBus.$emit(addCategoryStatus,()=>{
                                    this.initData();
                                });
                                EventBus.$emit(GIFTS_CHANGE,()=>{
                                    // this.initData();
                                });
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'新建失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    no: '',
                    name: '',
                    needIntegral: '',
                    count: '',
                    unit: ''
                }
                this.$store.dispatch('closeCreateGiftsModal')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';

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
    .input-box{
        width: 80%;
        margin-left: 20px;
        margin-top: 20px;
    }

</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';

    .el-dialog__headerbtn{
        .el-dialog__close{
            &:hover{
                color: $color !important;
            }
        }
    }
    .create-gifts-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
