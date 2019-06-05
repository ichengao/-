<template>
    <div class="modal-container select-member-by-hand-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="手动快速选择会员" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="select-container">
                <el-input placeholder="请输入手机号/卡号/姓名" v-model="searchKey" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
                <div class="select-content">
                    <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                    >
                        <el-table-column label="卡号" show-overflow-tooltip prop="accountId"></el-table-column>
                        <el-table-column prop="userName" label="会员姓名" show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="integral" label="可用积分" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="balance" label="卡内余额" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="arrearsBalance" label="欠款" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="handleEnsure(scope.row.accountId)">选择</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagenation" v-show="initDataArray.length">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change='pageChange'
                            :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetMemberList } from '@/services/service';
    import EventEmitter from '@/components/eventEmitter/eventEmitter';
    import { SELECT_MEMBER_BY_HAND } from '@/components/eventEmitter/eventName'
    export default {
        data(){
            return{
                searchKey: '',
                memberData: {},        // 选中的会员信息
                initDataArray: [],
                totalCount: 0,
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.selectMemberByHandModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.selectMemberByHandModalStatus;
                if(this.modalStatus){
                    this.searchKey= '';
                    this.memberData= {};
                    this.initDataArray= [];
                    this.totalCount= 0;
                }
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeSelectMemberByHandModalStatus');
            },
            handleSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    keyword: this.searchKey,
                };
                requestGetMemberList(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            pageChange(params1){
                let _this = this;
                let params = {
                    pageNum: params1,
                    keyword: this.searchKey,
                    shopId: this.$route.params.id
                };
                requestGetMemberList(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                });
            },
            handleEnsure(accountId){
                EventEmitter.$emit(SELECT_MEMBER_BY_HAND,accountId);
                this.handleCloseModal();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .select-member-by-hand-modal{
        .dialog-box{
            .el-dialog{
                .select-container{
                    .pagenation{
                        text-align: right;
                        padding: 20px 0 0;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .select-member-modal{
        .el-dialog__body{
            background: #F2F2F2;
        }
    }
</style>
