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
                <el-input placeholder="请输入内容"  class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"  class="data-table">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column label="会员名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="卡号" show-overflow-tooltip></el-table-column>
                <el-table-column label="电话号码" show-overflow-tooltip prop="beforeBalance"></el-table-column>
                <el-table-column label="服务项目" show-overflow-tooltip prop="rechargeAmount"></el-table-column>
                <el-table-column label="累计充值" show-overflow-tooltip prop="giveAmount"></el-table-column>
                <el-table-column label="剩余次数" show-overflow-tooltip prop="transAmount"></el-table-column>
                <el-table-column label="到期时间" show-overflow-tooltip prop="createDate"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: []
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
                }

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
            display: flex;
            flex: 1;
        }
    }
</style>
