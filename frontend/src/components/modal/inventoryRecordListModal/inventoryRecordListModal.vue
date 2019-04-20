<template>
    <div class="modal-container change-product-quantity-modal" v-if="modalStatus">
        <el-dialog title="盘点记录" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="goodsId" label="序号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="originalCount" label="调整前数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateCount" label="调整后数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="调整时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.createDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column prop="opName" label="操作员" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import { requestInventoryLog } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.inventoryRecordListModalStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.inventoryRecordListModalStatus.status;
                if(this.modalStatus){
                    this.initData();
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    goodsId: this.$store.state.inventoryRecordListModalStatus.data.goodsId
                };
                requestInventoryLog(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleCloseModal(){
                this.form = {
                    count: ''
                };
                this.$store.dispatch('closeInventoryRecordListModal');
            },
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
