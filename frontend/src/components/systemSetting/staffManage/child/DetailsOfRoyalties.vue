<template>
    <div class="detail-of-royalties-container">
        <div class="container-header">
            <el-button class="btn-return" @click="handleReturn">返回</el-button>
        </div>
        <div class="container-content">
            <span class="content-header">薪酬汇总</span>
            <div class="content-main">
                <ul>
                    <li>基本工资： <span>￥0</span></li>
                    <li>提成： <span>￥0</span></li>
                    <li>手动调整： <span>￥0</span><b>调整</b></li>
                    <li>合计： <span>￥0</span></li>
                </ul>
            </div>
        </div>
        <div class="container-footer">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      >
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="age" label="项目提成归属人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="roleName" label="消费类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="会员卡号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="payment" label="提成类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="(消费/业绩)金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="提成金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="手工金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="消费日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="消费店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="注册店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="备注" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initDataArray"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetRolestaff } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                totalCount: 0,
            }
        },
        props: [
            'currentStatus'
        ],
        computed: {
            currentPageStatus(){
                this.currentStatus && this.initData()
                return this.currentStatus
            }
        },
        watch: {
            currentPageStatus(newVal,oldVal){

            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    staffId: this.$parent.currentSelectId
                };
                requestGetRolestaff(params).then(res=>{

                })
            },
            handleReturn(){
                this.$parent.currentStatus = false;
            },
            pageChange(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .detail-of-royalties-container{
        background: #fff;
        width: 100%;
        padding-bottom: 20px;
        .container-header{
            padding: 10px;
            .btn-return{
                @include buttonSet($color);
            }
        }
        .container-content{
            background: #f5f5f5;
            margin: 20px 10px;
            padding: 20px;
            .content-main{
                ul{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 10px;
                    li{
                        span{
                            color: #e4393c;
                        }
                        b{
                            color: $color;
                            cursor: pointer;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .container-footer{
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
