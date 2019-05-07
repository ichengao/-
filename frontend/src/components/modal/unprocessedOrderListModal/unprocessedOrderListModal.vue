<template>
    <div class="modal-container unprocessed-order-list-modal" v-if="modalStatus">
        <el-dialog title="待支付订单" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="goodsId" label="订单号" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="goodsName" label="挂单时间" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="originalCount" label="会员号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updateCount" label="会员姓名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="消费金额" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.createDate | timeStampTrans }}
                    </template>
                </el-table-column>
                <el-table-column prop="opName" label="操作员工" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="opName" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="opName" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button>结算</el-button><br>
                        <el-button>修改</el-button><br>
                        <el-button>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetUnprocessedOrderList } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.unprocessedOrderListModalStatus || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.unprocessedOrderListModalStatus;
                if(this.modalStatus){
                    this.initData();
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetUnprocessedOrderList(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleCloseModal(){
                this.$store.dispatch('closeUnprocessedOrderListModalStatus');
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
