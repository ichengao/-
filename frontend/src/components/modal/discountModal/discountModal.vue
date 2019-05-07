<template>
    <div class="modal-container discount-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="折扣修改" :visible.sync="modalStatus" @close='handleCloseModal' >
            <calculator
                @handleCalcAddNum="handleCalcAddNum"
                @handleCalcEnsure="handleCalcEnsure"
                @handleCalcCancle="handleCalcCancle"
            >
                <div slot="insert-box">
                    <el-input
                        placeholder="折扣1-10之间"
                        v-model="discountNum"
                        clearable>
                    </el-input>
                </div>
            </calculator>
        </el-dialog>
    </div>
</template>
<script>
    import calculator from '@/components/common/calculator';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_PRODUCT_DISCOUNT } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                discountNum: ''
            }
        },
        components: {
            calculator
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.discountModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.discountModalStatus
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeDiscountModal')
            },
            handleCalcAddNum(params){
                this.discountNum += params;
            },
            handleCalcEnsure(){
                if(this.discountNum > 10){
                    Message.error('请输入0-10之间的数字');
                    return
                };
                this.handleCloseModal();
                EventBus.$emit(UPDATE_PRODUCT_DISCOUNT,this.discountNum);
                this.discountNum = '';
            },
            handleCalcCancle(){
                this.handleCloseModal();
                this.discountNum = '';
            }
        }
    }
</script>
<style lang="scss">
    .discount-modal{
        .dialog-box{
            .el-dialog{
                width: 390px;
            }
        }
    }
</style>
