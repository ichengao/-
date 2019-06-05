<template>
    <div class="msg-config-container">
        <div class="section-header">
            <div class="section1">
                <span>会员关怀短信智能发送</span>
                <span>|勾选后，对应条件下的短信将自动发送</span>
            </div>
            <div class="section2">
                <el-checkbox>新会员欢迎</el-checkbox>
                <el-checkbox>消费账单（含储值、计次）</el-checkbox>
                <el-checkbox>储值充值感谢</el-checkbox>
                <el-checkbox>计次充值感谢</el-checkbox>
                <el-checkbox>会员生日祝福(每天定时10点钟左右发送)</el-checkbox>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      >
                <el-table-column label="短信类别" width="80" show-overflow-tooltip >
                    <template slot-scope="scope">
                        {{scope.row.msgType}}
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="短信内容" show-overflow-tooltip >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="120"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleChangeTemplate(scope.$index, scope.row)">更换模板</el-button>
                    </template>
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
    </div>
</template>
<script>
    import { requestGetMsgConfig } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                totalCount: 0
            }
        },
        created(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetMsgConfig(params).then(res=>{
                    this.initDataArray = res.data.data;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            pageChange(){},
            handleChangeTemplate(idx,item){
                this.$store.dispatch('openUpdateMsgTemplate',item)
            }

        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .msg-config-container{
        margin-top: 10px;
        .section-header{
            background: #fff;
            padding: 20px;
            .section1{
                span{
                    &:first-child{
                        border-left: 2px solid $color;
                        padding-left: 5px;
                        color: #717171;
                    }
                    &:last-child{
                        color: #A8A8A8;
                        margin-left: 5px;
                    }
                }
            }
            .section2{
                border-top: 2px solid #F3F3F3;
                padding: 20px 0 10px;
                margin-top: 20px;
            }
        }
        .section-content{
            margin-top: 10px;
            padding: 10px 0;
            background: #fff;
            .pagenation{
                text-align: right;
                padding: 10px;
            }
        }
    }
</style>
