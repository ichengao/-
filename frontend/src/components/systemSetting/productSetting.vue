<template>
    <div class="container">
        <div class="section-1">
            <div class="section1">
                <div class="section-lf">
                    <span class="section-lf-title">库存预警</span>
                    <span>当库存数量不足时，库存预警能够帮助店铺及时处理库存商品</span>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.stockWarn"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <el-form :model="form1" :rules="dataRule1" status-icon ref="form1" >
                    <ul>
                        <li>
                            <span class="list-title">预值设置</span>
                            <span>商品低于</span>
                            <el-input v-model="form1.productNum" placeholder="输入商品数量" class="el-input-box"></el-input>
                            <span>件时，请通知我。</span>
                        </li>
                        <li>
                            <span class="list-title">预值设置</span>
                            <el-radio v-model="form1.warnType" label="1">站内推送</el-radio>
                            <el-radio v-model="form1.warnType" label="2">移动端推送</el-radio>
                        </li>
                        <li>
                            <span class="list-title">预值设置</span>
                            <span>提醒发货时间</span>
                            <el-time-select
                                v-model="form1.timer"
                                class="el-select-box"
                                :picker-options="{
                                    start: '00:00',
                                    step: '01:00',
                                    end: '23:00'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </li>
                    </ul>
                </el-form>
                <div class="btn-group">
                    <el-button class="btn-save">保存</el-button>
                </div>
            </div>
        </div>
        <div class="section-2">
            <div class="section-lf">
                <span class="section-lf-title">是否自动生成商品编码</span>
            </div>
            <div class="section-rgt">
                <el-switch
                    v-model="form1.autoCreateCode"
                    active-text="启用"
                    inactive-text="关闭">
                </el-switch>
            </div>
        </div>
        <div class="section-3">
            <span>产品单位设置</span>
            <el-tooltip class="item" effect="dark" content="销售预设折扣，收银记账时直接选择 设置后，刷新销售页面后生效" placement="right">
                <span class="el-icon-question icon-question"></span>
            </el-tooltip>
            <div class="units-list">
                <ul>
                    <li>
                        个
                        <span class="el-icon-edit"></span>
                        <span class="el-icon-delete"></span>
                    </li>
                    <li>
                        支
                        <span class="el-icon-edit"></span>
                        <span class="el-icon-delete"></span>
                    </li>
                    <li class="el-icon-plus btn-add"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form1: {
                    stockWarn: true,
                    productNum: '100',
                    warnType: '1',      //提醒方式
                    timer: '',
                    autoCreateCode: false,   //自动生成编码
                },
                dataRule1: {

                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .container{
        margin-top: 10px;
        .section-1{
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                .section-lf{
                    .section-lf-title{
                        padding-right: 5px;
                        margin-right: 2px;
                        border-right: 1px solid #ddd;
                        color: #4a4a4a;
                    }
                    span{
                        color: rgb(218,218,218);
                    }
                }
            }
            .section2{
                ul{
                    li{
                        margin-top: 20px;
                        .list-title{
                            margin-right: 20px;
                        }
                        .el-input-box{
                            width: 100px;
                            margin: 0 10px;
                        }
                        .el-select-box{
                            margin: 0 10px;
                        }
                    }
                };
                .btn-save{
                    margin-top: 20px;
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-2{
            padding: 20px;
            margin-top: 10px;
            background: #fff;
            display: flex;
            justify-content: space-between;
            .section-lf{
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    color: #4a4a4a;
                }
                span{
                    color: rgb(218,218,218);
                }
            }
        }
        .section-3{
            padding: 20px;
            margin-top: 10px;
            background: #fff;
            span{
                &.icon-question{
                    color: $color-btn-green;
                    font-size: 18px;
                    margin-left: 5px;
                }
            }
            .units-list{
                ul{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 20px;
                    li{
                        padding: 0 30px;
                        height: 35px;
                        line-height: 35px;
                        margin-right: 20px;
                        border-radius: 5px;
                        @include buttonSet($color-btn-green);
                        background: #ddd;
                        position: relative;
                        cursor: pointer;
                        &.btn-add{
                            @include buttonSet($color-btn-green);
                        }
                        .el-icon-edit{
                            position: absolute;
                            top: 2px;
                            right: 5px;
                            display: none;
                            &:hover{
                                color: $color;
                            }
                        }
                        .el-icon-delete{
                            position: absolute;
                            bottom: 2px;
                            right: 5px;
                            display: none;
                            &:hover{
                                color: $color;
                            }
                        }
                        &:hover{
                            @include buttonSet($color-btn-green);
                            .el-icon-edit,.el-icon-delete{
                                display: inline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
