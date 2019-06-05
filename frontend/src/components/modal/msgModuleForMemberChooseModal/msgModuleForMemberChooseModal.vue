<template>
    <div class="modal-container choose-member-modal" v-if="modalStatus">
        <el-dialog title="选择会员" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="section-header">
                <el-select v-model="form.level" class="section-select" placeholder="请选择">
                    <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.group" class="section-select" placeholder="请选择">
                    <el-option
                        v-for="item in groupOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.tag" class="section-select" placeholder="请选择">
                    <el-option
                        v-for="item in tagOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
                </el-input>
            </div>
            <div class="section-content">
                <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="25"> </el-table-column>
                    <el-table-column label="卡号" show-overflow-tooltip prop="accountId"></el-table-column>
                    <el-table-column prop="userName" label="会员姓名" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column prop="gradeId" label="会员等级" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话号码" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="pagenation">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change='pageChange'
                        :total="totalCount">
                    </el-pagination>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="footer-left">
                    <el-checkbox v-model="form.send">过滤<el-input class="input-box" v-model="form.sendNum"></el-input>天内发送过的会员</el-checkbox>
                    <el-checkbox v-model="form.sell">过滤<el-input class="input-box" v-model="form.sellNum"></el-input>天内销售过的会员</el-checkbox>
                </div>
                <div class="footer-right">
                    <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetMemberList } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_MSG_MEMBER } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                levelOptions: [
                    {
                        label: '所有等级',
                        value: '00'
                    },
                ],
                groupOption: [
                    {
                        label: '所有分组',
                        value: '00'
                    },
                ],
                tagOption: [
                    {
                        label: '所有标签',
                        value: '00'
                    }
                ],
                form: {
                    level: '00',
                    group: '00',
                    tag: '00',
                    send: true,
                    sendNum: 5,
                    sell: true,
                    sellNum: 5
                },
                totalCount: 0,
                searchKey: '',
                initDataArray: [],
                selectedMember: {},
                currentPage: 1,
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.msgModuleForMemberChooseModalStatus || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.msgModuleForMemberChooseModalStatus;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            initData(){
                this.currentPage = 1;
                this.selectedMember = {};
                let params = {
                    shopId: this.$route.params.id,
                    keyword: this.searchKey,
                    pageNum: 1
                };
                requestGetMemberList(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount
                })
            },
            // 分页
            pageChange(num){
                this.currentPage = num;
                let params = {
                    shopId: this.$route.params.id,
                    keyword: this.searchKey,
                    pageNum: num
                };
                requestGetMemberList(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                    this.handleDefaultSelection();
                })
            },
            // 选中匹配
            handleDefaultSelection(){
                let data = this.selectedMember[`${this.currentPage}`];
                if(!data){return}

                let dataArr = [];
                data.forEach(item=>{
                    dataArr.push(item.memberId)
                });
                setTimeout(()=>{
                    this.initDataArray.forEach((item,idx)=>{
                        if(dataArr.indexOf(item.memberId) != -1){
                            this.$refs.multipleTable.toggleRowSelection(this.initDataArray[idx],true)
                        }
                    });
                },50)

            },
            handleConfirm(){
                let paramsArr= [];
                for(let item in this.selectedMember){
                    paramsArr = paramsArr.concat(this.selectedMember[item])
                }
                EventBus.$emit(UPDATE_MSG_MEMBER,paramsArr);
                this.handleCloseModal();
            },
            handleCloseModal(){
                this.form = {
                    name: '',
                    contact: '',
                    mobile: '',
                    address: '',
                    remark: ''
                };
                this.$store.dispatch('closeMsgModuleForMemberChooseModalStatus');
            },
            handleSelectionChange(params){
                this.selectedMember[this.currentPage] = params;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .choose-member-modal{
        .section-header{
            display: flex;
            justify-content: space-between;
            .section-select{
                margin-right: 10px;
            }
        }
        .section-content{
            padding: 10px 0;
            .pagenation{
                text-align: right;
                padding: 10px;
            }
        }
        .dialog-footer{
            display: flex;
            justify-content: space-between;
            .footer-left{
                .input-box{
                    width: 50px;
                    margin: 0 5px;
                }
            }
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

    }
</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';
    .choose-member-modal{
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
    }
</style>
