<template>
    <div class="modal-container change-product-quantity-modal" v-if="modalStatus">
        <el-dialog title="数量调整" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="count" label="商品数量:">
                    <el-input placeholder="请输入调整后的数量"  class="pwd input-box" v-model="form.count" maxlength="20"></el-input>
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
    import { requestUpdateInventory } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_PRODUCT_QUANTITY } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    count: '',
                },
                dataRule: {
                    count: [
                        { required: true, message: '数量不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.updateProductQuantityStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updateProductQuantityStatus.status
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.form,{
                            shopId: this.$route.params.id,
                            goodsId: this.$store.state.updateProductQuantityStatus.data.goodsId
                        });
                        requestUpdateInventory(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                                EventBus.$emit(UPDATE_PRODUCT_QUANTITY);
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
                this.$store.dispatch('closeUpdateProductQuantityModal')
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
    .change-product-quantity-modal{
        .el-form-item__error{
            left: 105px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
