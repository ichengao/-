<template>
    <div class="member-container main-container">
        <div class="section-header">
            <div class="section-header-lf">
                <span>商品列表</span>
                <el-button class="btn-new el-icon-plus">新增商品</el-button>
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
                <el-input placeholder="请输入内容"  class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <ul class="section-content-box">
                <li class="item-birth">
                    <p>共有商品</p>
                    <div class="item-content">
                        <span>{{baseData.thisMonthBirthday}}</span>种
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            库存中商品共<span>{{baseData.todayBirthday}}</span>件
                        </div>
                        <span class="item-footer-rgt"></span>
                    </div>
                </li>
                <li class="item-all">
                    <p>库存中商品总成本</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.memberCount)}}</span>元
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            库存中商品<span>{{parseInt(baseData.dayAddMember)}}</span>件，共<span>222</span>元
                        </div>
                        <span></span>
                    </div>
                </li>
                <li class="item-pay">
                    <p>库存中低于100件的商品</p>
                    <div class="item-content">
                        <span>{{parseInt(baseData.sumAmount)}}</span>件
                    </div>
                    <div class="item-footer">
                        <div class="item-footer-lf">
                            平均日消费金额<span>{{parseInt(baseData.eveyAmount)}}</span>元
                        </div>
                        <span class="item-footer-rgt">详情</span>
                    </div>
                </li>
                <li class="item-ranking">
                    <p>近七天热卖商品(前三名)</p>
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
                <el-table-column label="序号" show-overflow-tooltip prop="accountId"></el-table-column>
                <el-table-column prop="gradeName" width="80" label="商品名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" width="80" label="商品类别" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="gradeId" width="80" label="商品编码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="integral" width="80" label="商品规格" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="balance" label="销售单价" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="guestFromName" label="库存数量" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" label="入库时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="所属店铺" show-overflow-tooltip>
                </el-table-column>
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
                        @click="handleDeleteMmeber(scope.row)">删除</el-button>
                    </template> 
                
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { 
    requestGetProductData,
    requestGetProductList,
    requestDeleteMember
} from '@/services/service';
import { Message } from 'element-ui' 
export default {
    data(){
        return{
            initData: [],
            baseData: {},
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        handleSelectionChange(){},
        init(){
            let _this  = this;
            let params = {
                shopId: this.$route.params.id,
                type: '01'
            }
            requestGetProductData(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.baseData = res.data.data
                }
            })
            requestGetProductList(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initData = res.data.data.list
                }
            })
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
                    @include buttonType1;
                    margin-left: 20px;
                    padding: 8px 10px;
                    &:before{
                        margin-right: 15px;
                    }
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
        }
    }
</style>
