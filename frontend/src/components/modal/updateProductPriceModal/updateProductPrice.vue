<template>
    <div class="modal-container change-price-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="价格修改" :visible.sync="modalStatus" @close='handleCloseModal' >
            <calculator
                @handleCalcAddNum="handleCalcAddNum"
                @handleCalcEnsure="handleCalcEnsure"
                @handleCalcCancle="handleCalcCancle"
            >
                <div slot="insert-box">
                    <el-input
                        placeholder="请输入价格"
                        v-model="priceNum"
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
    import { UPDATE_PRODUCT_PRICE } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                priceNum: ''
            }
        },
        components: {
            calculator
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.updateProductPriceModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updateProductPriceModalStatus
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeUpdateProductPriceModal');
            },
            handleCalcAddNum(params){
                this.priceNum += params;
            },
            handleCalcEnsure(){
                this.handleCloseModal();
                EventBus.$emit(UPDATE_PRODUCT_PRICE,this.priceNum);
                this.priceNum = '';
            },
            handleCalcCancle(){
                this.handleCloseModal();
                this.priceNum = '';
            }
        }
    }
</script>
<style lang="scss">
    .change-price-modal{
        .dialog-box{
            .el-dialog{
                width: 390px;
            }
        }
    }
</style>
