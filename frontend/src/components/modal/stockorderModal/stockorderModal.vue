<template>
    <div class="modal-container change-pwd-modal" v-if="modalStatus">
        <el-dialog title="供货记录" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-table ref="multipleTable1" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
            >
                <el-table-column prop="barcode" label="序号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="goodsName" label="进货单号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="count" label="进货数量" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="stockPrice" label="进货金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="stockPrice" label="进货时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="stockPrice" label="操作员" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import { requestStockorder } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.StockorderModal.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.StockorderModal.status;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeStockorderModal')
            },
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    warehouseId: this.$store.state.CheckStockModal.data.warehouseId
                };
                requestStockorder(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                });
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
    .change-pwd-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
