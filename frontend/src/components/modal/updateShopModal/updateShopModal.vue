<template>
    <div class="modal-container change-product-quantity-modal" v-if="modalStatus">
        <el-dialog title="数量调整" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="shopName" label="店铺名称:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入店铺名称"  class="pwd input-box" v-model="form.shopName" ></el-input>
                </el-form-item>
                <el-form-item prop="shopManager" label="店主姓名:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入店主姓名"  class="pwd input-box" v-model="form.shopManager" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="businessBelong" label="行业类型:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入行业类型"  class="pwd input-box" v-model="form.businessBelong" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="simpleName" label="店铺简称:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入店铺简称"  class="pwd input-box" v-model="form.simpleName" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="shopTel" label="店铺电话:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入店铺电话"  class="pwd input-box" v-model="form.shopTel" maxlength="20"></el-input>
                </el-form-item>
                <!--<el-form-item prop="count" label="注册时间:" label-width="100px" class="form-item">-->
                    <!--<el-date-picker-->
                        <!--v-model="form.createDate"-->
                        <!--format="yyyy-MM-dd"-->
                        <!--type="date"-->
                        <!--placeholder="请选择注册时间">-->
                    <!--</el-date-picker>-->
                <!--</el-form-item>-->
                <el-form-item prop="address" label="店铺地址:" label-width="100px" class="form-item">
                    <el-input placeholder="请输入店铺地址"  class="pwd input-box" v-model="form.address" maxlength="100"></el-input>
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
    import { requestUpdateShopDetail } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_SHOP_DETAIL } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    shopName: '',
                    shopManager: '',
                    businessBelong: '',
                    simpleName: '',
                    shopTel: '',
                    // createDate: '',
                    address: ''
                },
                dataRule: {
                    shopName: [
                        { required: true, message: '店铺名称不能为空', trigger: 'blur' }
                    ],
                    shopManager: [
                        { required: true, message: '店主姓名不能为空', trigger: 'blur' }
                    ],
                    businessBelong: [
                        { required: true, message: '行业类型不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.updateShopModal.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updateShopModal.status;
                if(this.modalStatus){
                    let storeData = this.$store.state.updateShopModal.data;
                    this.form = {
                        shopName: storeData.shopName,
                        shopManager: storeData.shopManager,
                        businessBelong: storeData.businessBelong,
                        simpleName: storeData.simpleName,
                        shopTel: storeData.shopTel,
                        // createDate: '',
                        address: storeData.address
                    };
                }
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.form,{
                            shopId: this.$route.params.id
                        });
                        requestUpdateShopDetail(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                                EventBus.$emit(UPDATE_SHOP_DETAIL);
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
                    count: ''
                };
                this.$store.dispatch('closeUpdateShopModal')
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
    .form-item{
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
</style>
