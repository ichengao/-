<template>
    <div class="modal-container create-supplier-vendor-modal" v-if="modalStatus">
        <el-dialog title="编辑供应商" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="name" label="供应商名称" label-width="100px">
                    <el-input placeholder="请输入供应商名称"  class="pwd input-box" v-model="form.name" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item prop="contact" label="联系人" label-width="100px">
                    <el-input placeholder="请输入联系人"  class="pwd input-box" v-model="form.contact" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="联系电话" label-width="100px">
                    <el-input placeholder="请输入联系电话"  class="pwd input-box" v-model="form.mobile" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="地址" label-width="100px">
                    <el-input placeholder="请输入地址"  class="pwd input-box" v-model="form.address" maxlength="20"></el-input>
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
    import { requestUpdatesupplier } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { CREATE_SUPPLIER_VENDOR } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    name: '',
                    contact: '',
                    mobile: '',
                    address: '',
                    remark: ''
                },
                dataRule: {
                    name: [
                        { required: true, message: '供应商名称不能为空', trigger: 'blur' }
                    ],
                    contact: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.editSupplierVendorModalStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.editSupplierVendorModalStatus.status;
                if(this.modalStatus){
                    let data = this.$store.state.editSupplierVendorModalStatus.data;
                    this.form = {
                        name: data.name,
                        contact: data.contact,
                        mobile: data.mobile,
                        address: data.address,
                        remark: data.remark
                    }
                }
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = {
                            shopId: this.$route.params.id,
                            supplierId: this.$store.state.editSupplierVendorModalStatus.data.supplierId
                        };
                        params = Object.assign({},this.form,params);
                        requestUpdatesupplier(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                                EventBus.$emit(CREATE_SUPPLIER_VENDOR);
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
                    name: '',
                    contact: '',
                    mobile: '',
                    address: '',
                    remark: ''
                }
                this.$store.dispatch('closeEditSupplierVendorModal')
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
