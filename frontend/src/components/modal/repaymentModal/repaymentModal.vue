<template>
    <div class="modal-container permission-detail-modal" v-if="modalStatus">
        <el-dialog title="还款" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" class="form-dialog" status-icon ref="form" label-position="left">
                <el-form-item label="请输入金额:" label-width="120px" class="form-item-list">
                    <el-input v-model="form.realAmount"></el-input>
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
    import { requestGetRefund } from '@/services/service';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                form: {
                    realAmount: '',
                    warehouseId: ''
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.RepaymentModal.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.RepaymentModal.status;
                console.log(this.modalStatus)
                if(this.modalStatus){
                    console.log(this.$store.state.RepaymentModal.data)
                    this.form = Object.assign({},this.form,this.$store.state.RepaymentModal.data,{createDate: ''})
                }
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeRepaymentModal');
            },
            handleConfirm(){
                if(!this.form.realAmount){
                    Message.error('请输入金额');
                    return
                }
                let params = {
                    supplierId: this.form.supplierId,
                    realAmount: this.form.realAmount,
                    bizId: `${new Date().getTime()}`,
                    shopId: this.$route.params.id
                };
                requestGetRefund(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('还款成功')
                    }else{
                        Message.error(res.data.msg)
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .permission-detail-modal{
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
