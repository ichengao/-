<template>
    <div class="container gifts-manage-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/shopdetail/'+currentId+'/integral/integralChange'" active-class="active">
                    <div>积分变动</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/integral/giftsExchange'" active-class="active">
                    <div>礼品兑换</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/giftsManage'" active-class="active">
                    <div>礼品管理</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <!--<span class="header-export">导出</span>-->
                <!--<span class="header-print">打印</span>-->
            </div>
            <div class="section-header-rgt">
                <el-button class="el-icon-plus el-btn" @click="createNewGift">新建礼品</el-button>
                <el-input placeholder="请输入内容"  class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%" class="data-table">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column label="礼品编号" show-overflow-tooltip prop="no"></el-table-column>
                <el-table-column label="礼品名称" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="礼品价格" show-overflow-tooltip prop="gradeName"></el-table-column>
                <el-table-column label="所需积分" show-overflow-tooltip prop="needIntegral"></el-table-column>
                <el-table-column label="礼品总数" show-overflow-tooltip prop="allCount"></el-table-column>
                <el-table-column label="礼品单位" show-overflow-tooltip prop="unit"></el-table-column>
                <el-table-column label="剩余礼品数量" show-overflow-tooltip prop="amount"></el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import { requestGetGiftList,requestDeleteGift } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { GIFTS_CHANGE } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui'
    export default {
        data(){
            return{
                form: {
                    transType: '1',   //   1增加  2减少
                },
                currentId: '',
                initDataArray: []
            }
        },
        mounted() {
            this.currentId = this.$route.params.id;
            this.initData();
            EventBus.$on(GIFTS_CHANGE,()=>{
                this.initData();
            })
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetGiftList(params).then((res)=>{
                    this.initDataArray = res.data.data.list
                })
            },
            // 新建礼品
            createNewGift(){
                this.$store.dispatch('openCreateGiftsModal');
            },
            handleSelectionChange(){},
            handleEdit(){},
            handleDelete(params1){
                let params = {
                    shopId: this.$route.params.id,
                    giftIds: params1.giftId
                };
                requestDeleteGift(params).then((res)=>{
                    if(res.data.code == '0000'){
                        Message.success('删除成功');
                        this.initData();
                    }else{
                        Message.error(res.data.msg);
                    }
                }).catch(()=>{
                    Message.success('删除失败');
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .container{
        .section-header{
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .section-header-lf{
                display: flex;
                a{
                    div{
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }
                    &.active{
                        div{
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
            .section-header-rgt{
                display: flex;
                .el-btn{
                    @include buttonType1();
                    margin-right: 10px;
                }
            }
        }
        .section-content{
            background: #fff;
            margin-top: 10px;
            padding: 20px 0;
        }
    }
</style>
