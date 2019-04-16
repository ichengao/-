<template>
    <div class="modal-container exchange-intergral-modal" v-if="modalStatus">
        <el-dialog title="兑换纪录" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%" border class="data-table">
                <el-table-column label="会员卡号" show-overflow-tooltip prop="memberNo"></el-table-column>
                <el-table-column label="会员姓名" show-overflow-tooltip prop="userName"></el-table-column>
                <el-table-column label="礼品名称" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="兑换数量" show-overflow-tooltip prop="amount"></el-table-column>
                <el-table-column label="兑换积分" show-overflow-tooltip prop="needIntegral"></el-table-column>
                <el-table-column label="剩余积分" show-overflow-tooltip prop="afterIntegral"></el-table-column>
                <el-table-column label="操作人员" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="table-footer" v-show="initDataArray.length">
                <span>总计：</span>
                <span>{{ allIntr }}</span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetGiftList } from '@/services/service';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                initDataArray: [],
                allIntr: ''
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.exchangeIntegralModalStatus || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.exchangeIntegralModalStatus;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetGiftList(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleCloseModal(){
                this.form = {
                    no: '',
                    name: '',
                    needIntegral: '',
                    count: '',
                    unit: ''
                };
                this.$store.dispatch('closeExchangeIntegralModalStatus')
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
    .create-gifts-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
