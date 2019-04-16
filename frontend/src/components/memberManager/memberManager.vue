<template>
    <div class="member-container main-container">
        <div class="section-header">
            <div class="section-header-lf">
                <span>会员列表</span>
                <!-- <el-button class="btn-new">会员开卡</el-button> -->
            </div>
            <div class="section-header-center">
                <ul>
                    <li>修改</li>
                    <li>导入</li>
                    <li>导出</li>
                    <li>筛选</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchKey">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <ul class="section-content-box">
                <li class="item-birth">
                    <p>今日生日会员</p>
                    <div class="item-content">
                        <span>{{baseData.thisMonthBirthday}}</span>位
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            本月生日会员<span>{{baseData.todayBirthday}}</span>位
                        </div>
                        <span class="item-footer-rgt">详情</span>
                    </div>
                </li>
                <li class="item-all">
                    <p>会员总数</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.memberCount)}}</span>位
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            本月日增会员<span>{{parseInt(baseData.dayAddMember)}}</span>位
                        </div>
                        <span></span>
                    </div>
                </li>
                <li class="item-pay">
                    <p>累计消费</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.sumAmount)}}</span>元
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            平均日消费金额<span>{{parseInt(baseData.eveyAmount)}}</span>元
                        </div>
                        <span class="item-footer-rgt">详情</span>
                    </div>
                </li>
                <li class="item-ranking">
                    <p>会员消费排行榜(前三名)</p>
                    <ul>
                        <li v-for="(item,idx) in baseData.list" :key='idx'>
                            <div class="rank-lf">
                                TOP{{idx+1}}. <span>{{item.memberName}}</span>
                            </div>
                            <div class="rank-rgt">
                                {{item.totalAmount}}元
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="section-footer">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column label="卡号" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column prop="gradeName" width="80" label="会员姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" width="80" label="手机号码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="gradeId" width="80" label="会员等级" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="integral" width="80" label="可用积分" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="balance" label="卡内余额" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="guestFromName" label="来源" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" label="开卡员工" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="所属店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="操作"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEditMember(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteMmeber(scope.row)">删除</el-button>
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
import { 
    requestGetMemberbaseData,
    requestSearchMemberlist,
    requestGetMemberList,
    requestDeleteMember
} from '@/services/service';
import { Message } from 'element-ui' 
export default {
    data(){
        return{
            initData: [],
            baseData: {},
            searchKey: '',
            totalCount: 0,
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        handleSelectionChange(){},
        init(){
            let _this  = this
            let params = {
                shopId: this.$route.params.id
            }
            requestGetMemberbaseData(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.baseData = res.data.data
                }
            })
            requestGetMemberList(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initData = res.data.data.list
                    _this.totalCount = res.data.data.totalCount
                }
            })
        },
        // 编辑操作
        handleEditMember(params1,params2){
            let memberId = params2.memberId
            this.$store.dispatch('openEditMemberCardStatus',memberId)
        },
        // 删除操作
        handleDeleteMmeber(arr){
            let params = {
                memberId: arr.memberId
            }
            let _this = this
            requestDeleteMember(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.init();
                    Message({
                        message: '删除成功',
                        type: 'success'
                    })
                }else{
                    Message({
                        message:res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(){
                Message({
                    message: '删除失败',
                    type: 'error'
                });
            })
        },
        // 搜索
        handleSearch(){
            let _this = this
            let params = {
                keyword: this.searchKey,
                shopId: this.$route.params.id
            }
            if(this.searchKey){
                requestSearchMemberlist(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initData = res.data.data.list
                    }
                })
            }else{
                requestGetMemberList(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initData = res.data.data.list
                    }
                })
            }
            
        },
        // 分页
        pageChange(){

        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .main-container{
        width: 100%;
        .section-header{
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding: 0 20px;
            .section-header-lf{
                font-size: 18px;
                span{
                    padding-left: 10px;
                    border-left: 3px solid $color;
                }
                .btn-new{
                    padding: 5px 15px 5px 40px;
                    background: url('../../assets/images/icon_card.png') 10px center no-repeat;
                    background-size: 20px;
                    @include buttonType1;
                    margin-left: 20px;
                }
            }
            .section-header-center{
                ul{
                    display: flex;
                    li{
                        padding-left: 40px;
                        margin-right: 20px;
                        font-size: 16px;
                        cursor: pointer;
                        &:hover{
                            opacity: .6;
                        }
                        &:first-child{
                            background: url('../../assets/images/icon_edit.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                        &:nth-child(2){
                            background: url('../../assets/images/icon_import.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                        &:nth-child(3){
                            background: url('../../assets/images/icon_export.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                        &:nth-child(4){
                            background: url('../../assets/images/icon_type.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                    }
                }
            }
        }
        .section-content{
            .section-content-box{
                display: flex;
                justify-content: flex-start;
                padding: 0;
                margin-top: 20px;
                >li{
                    width: 22%;
                    margin-right: 4%;
                    background: #fff;
                    font-size: 12px;
                    p{
                        padding-left: 10px;
                    }
                    .item-content{
                        text-align: center;
                        span{
                            font-size: 40px;
                            color: $color;
                            margin-right: 5px;
                        }
                    }
                    .item-footer{
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        align-items: center;
                        .item-footer-lf{
                            span{
                                color: $color;
                            }
                        }
                        .item-footer-rgt{
                            background: $color;
                            color: #fff;
                            padding: 0 5px;
                            cursor: pointer;
                            border-radius: 3px;
                        }
                    }
                    ul{
                        padding: 0 10px;
                        li{
                            display: flex;
                            margin-bottom: 5px;
                            font-size: 14px;
                            width: 100%;
                            justify-content: space-between;
                            align-items: center;
                            &:first-child{
                                color: $color;
                            }
                        }
                    }
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
        .section-footer{
            margin-top: 20px;
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
