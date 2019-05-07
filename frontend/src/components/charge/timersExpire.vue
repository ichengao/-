<template>
    <div class="container charge-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/shopdetail/'+currentId+'/charge/chargeMoney'" active-class="active">
                    <div>会员充值</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/charge/chargeTimers'" active-class="active">
                    <div>会员充次</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/timersExpire'" active-class="active">
                    <div>记次过期明细</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <span class="header-export el-icon-download">导出</span>
                <span class="header-print el-icon-printer">打印</span>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容" class="input-with-select" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="handSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"  class="data-table">
                <el-table-column label="会员名称" show-overflow-tooltip prop="memberName"></el-table-column>
                <el-table-column label="卡号" prop="memberNo" show-overflow-tooltip></el-table-column>
                <el-table-column label="电话号码" show-overflow-tooltip prop="mobile"></el-table-column>
                <el-table-column label="服务项目" show-overflow-tooltip prop="goodsName"></el-table-column>
                <el-table-column label="累计充值" show-overflow-tooltip prop="allTimes"></el-table-column>
                <el-table-column label="剩余次数" show-overflow-tooltip prop="times"></el-table-column>
                <el-table-column label="到期时间" show-overflow-tooltip >
                    <template slot-scope="scope">
                        {{scope.row.deadDate | timeStampTrans}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initDataArray.length"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetTimescardlist } from '@/services/service'
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: [],
                totalCount: 0,
                keyword: ''
            }
        },
        mounted(){
            this.currentId = this.$route.params.id;
            this.initData()
        },
        methods: {
            initData(){
                let params = {
                    keyword: this.searchKey,
                    shopId: this.$route.params.id
                };
                requestGetTimescardlist(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    keyword: this.keyword
                };
                requestGetTimescardlist(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount
                })
            },
            // 分页
            pageChange(params1){
                let _this = this;
                let params = {
                    pageNum: params1,
                    keyword: this.keyword,
                    shopId: this.$route.params.id
                };
                requestGetTimescardlist(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
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
            .section-header-center{
                span{
                    font-size: 18px;
                    cursor: pointer;
                    margin-right: 10px;
                    padding-left: 10px;
                    &:before{
                        margin-right: 5px;
                    }
                    &:hover{
                        opacity: .5;
                    }
                }
            }
        }
        .section-content{
            margin-top: 10px;
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
