<template>
    <div class="modal-container create-store-control-modal" v-if="modalStatus">
        <el-dialog title="新增仓库" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="name" label="仓库名称" label-width="100px">
                    <el-input placeholder="请输入仓库名称"  class="pwd input-box" v-model="form.name" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item prop="admin" label="管理员" label-width="100px">
                    <el-input placeholder="请输入管理员"  class="pwd input-box" v-model="form.admin" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="tel" label="联系电话" label-width="100px">
                    <el-input placeholder="请输入联系电话"  class="pwd input-box" v-model="form.tel" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="仓库地址" label-width="100px">
                    <el-input placeholder="请输入仓库地址"  class="pwd input-box" v-model="form.address" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="备注" label-width="100px">
                    <el-input placeholder="备注" type="textarea" class="pwd input-box" v-model="form.remark" maxlength="200"></el-input>
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
    import { requestAddWarehouse } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { CREATE_STORE_CONTROL } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    name: '',
                    admin: '',
                    tel: '',
                    address: '',
                    remark: ''
                },
                dataRule: {
                    name: [
                        { required: true, message: '仓库名称不能为空', trigger: 'blur' }
                    ],
                    admin: [
                        { required: true, message: '管理员不能为空', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.createStoreControlModalStatus|| false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.createStoreControlModalStatus
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = {
                            shopId: this.$route.params.id,
                        };
                        params = Object.assign({},this.form,params);
                        requestAddWarehouse(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                EventBus.$emit(CREATE_STORE_CONTROL);
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'添加失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    name: '',
                    admin: '',
                    tel: '',
                    address: '',
                    remark: ''
                }
                this.$store.dispatch('closeCreateStoreControlModal')
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
    .change-pwd-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
