<template>
    <div class="modal-container deduction-times-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="会员服务计次消费" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="container">
                <div class="container-lf">
                    <el-input
                        placeholder="刷卡或输入卡号"
                        v-model="searchKey"
                        prefix-icon="el-icon-menu"
                        >
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                    <div class="container-lf-detail">
                        <div class="section-1">
                            <p>卡号：123</p>
                            <p>姓名：123</p>
                        </div>
                        <div class="section-2">
                            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%">
                                <el-table-column prop="goodsId" label="服务名称" show-overflow-tooltip ></el-table-column>
                                <el-table-column prop="goodsName" label="剩余次数" show-overflow-tooltip >
                                    <template slot-scope="scope">
                                        <span></span>
                                        <el-button>充值</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="container-rgt">
                    <calculator
                        @handleCalcAddNum="handleCalcAddNum"
                        @handleCalcEnsure="handleCalcEnsure"
                        @handleCalcCancle="handleCalcCancle"
                    >
                        <div slot="insert-box">
                            <el-input
                                placeholder="本次扣除次数"
                                v-model="discountNum"
                                clearable>
                            </el-input>
                        </div>
                    </calculator>
                    <div class="section-3">
                        <el-table :data="initDataArray" tooltip-effect="dark" style="width: 100%">
                            <el-table-column prop="goodsId" label="本次消费服务" show-overflow-tooltip ></el-table-column>
                            <el-table-column prop="goodsName" label="扣除次数" show-overflow-tooltip >
                                <template slot-scope="scope">
                                    <span></span>
                                    <el-button>充值</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import calculator from '@/components/common/calculator';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_PRODUCT_DISCOUNT } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    import { requestGetServerlist } from '@/services/service'
    export default {
        data(){
            return{
                num: '',  // 次数
                searchKey: '',     // 搜索关键词
                initDataArray: [],
                initDataUsed: []
            }
        },
        components: {
            calculator
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.deductionTimesModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.deductionTimesModalStatus
            }
        },
        methods: {
            handleSearch(){
                let _this = this;
                let params = {
                    shopId: this.$route.params.id,
                    type: '02',
                    keyword: this.searchKey
                };
                requestGetServerlist(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                    }
                })
            },
            handleCloseModal(){
                this.$store.dispatch('closeDeductionTimesModal');
            },
            handleCalcAddNum(params){
                this.num += params;
            },
            handleCalcEnsure(){
                this.handleCloseModal();
                EventBus.$emit(UPDATE_PRODUCT_DISCOUNT,this.num);
                this.num = '';
            },
            handleCalcCancle(){
                this.handleCloseModal();
                this.num = '';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .deduction-times-modal{
        .container{
            display: flex;
            background: #F2F2F2;
            .container-lf{
                padding: 10px;
                .container-lf-detail{
                    background: #fff;
                    margin-top: 10px;
                    .section-1{
                        display: flex;
                        border-bottom: 1px dashed #ddd;
                        justify-content: space-between;
                        padding: 10px;
                        p{
                            margin: 0;
                        }
                    }
                }
            }
            .container-rgt{
                .section-3{

                }
            }
        }
    }
</style>
