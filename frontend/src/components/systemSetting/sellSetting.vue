<template>
    <div class="container">
        <div class="section-1">
            <div class="section1">
                <div class="section-lf">
                    <span class="section-lf-title">系统支付方式设置（灰色停用）</span>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.payTypeSetting"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <ul>
                    <li class="icontype10 icontype"></li>
                </ul>
            </div>
        </div>
        <div class="section-2">
            <div class="section1">
                <span class="section-lf-title">流水单号设置</span>
                <span>特别适合餐饮行业，每次销售后单号+1，最多支持8位数字。</span>
            </div>
            <div class="section2">
                <el-checkbox v-model="form1.autoOrderId" class="el-cbx">自动流水单号</el-checkbox>
                <el-tooltip class="item" effect="dark" content="自定义初始流水单号后，每次销售后单号自动+1" placement="right">
                    <span class="el-icon-question icon-question"></span>
                </el-tooltip>
            </div>
            <div class="section3">
                <span>初始流水单号</span>
                <el-input v-model="form1.autoOrderId" placeholder="输入初始流水号" class="el-input"></el-input>
            </div>
            <div class="section4">
                <el-button class="btn-save">保存设置</el-button>
            </div>
        </div>
        <div class="section-3">
            <div class="section1">
                <div class="section-lf">
                    <span>积分抵现设置</span>
                    <el-tooltip class="item" effect="dark" content="设置后销售时积分将按比例抵现，积分数需个位数为0（刷新销售页面后生效）暂不支持跨店抵现" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.payTypeSetting"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <el-input v-model="form1.integral" placeholder="输入等级名称" class="el-input"></el-input>
                <span>积分=1元</span>
            </div>
            <div class="section3">
                <el-button class="btn-save">保存设置</el-button>
            </div>
        </div>
        <div class="section-4">
            <div class="section1">
                <div class="section-lf">
                    <span>是否启用每日流水号</span>
                    <el-tooltip class="item" effect="dark" content="特别适合餐饮行业,每日流水号重置" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.payTypeSetting"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <span>编号前缀</span>
                <el-input v-model="form2.extraCode" placeholder="输入编号前缀" class="el-input"></el-input>
                <span>最小长度</span>
                <el-input v-model="form2.minLength" placeholder="输入最小长度" class="el-input"></el-input>
                <span>填充字符</span>
                <el-input v-model="form2.insertCode" placeholder="输入填充字符" class="el-input"></el-input>
                <span>最大长度</span>
                <el-input v-model="form2.maxLength" placeholder="输入最大长度" class="el-input"></el-input>
            </div>
            <div class="section3">
                <el-button class="btn-save">保存设置</el-button>
            </div>
        </div>
        <div class="section-5">
            <ul>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用会员密码</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用员工提成</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用交接班</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用交接班备用金</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">收银前台无图展示</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否允许零库存销售</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form1.payTypeSetting"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form1: {
                    payTypeSetting: true,
                    autoOrderId: '1',  //自动流水单号
                    integral: '100',
                },
                form2: {
                    extraCode: '',
                    minLength: '',
                    insertCode: '',
                    maxLength: ''
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
            padding: 20px;
            background: #fff;
            .section1{
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
            };
            .section2{
                ul{
                    li{
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }
        .section-2{
            padding: 20px;
            background: #fff;
            margin-top: 10px;
            .section1{
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
            .section2{
                margin-top: 20px;
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
                .el-cbx{
                    margin-right: 0;
                }
            }
            .section3{
                margin-top: 20px;
                .el-input{
                    width: 150px;
                }
            }
            .section4{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-3{
            margin-top: 10px;
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    color: #4a4a4a;
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
            }
            .section2{
                margin-top: 20px;
                .el-input{
                    width: 100px;
                    margin-right: 10px;
                }
            }
            .section3{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-4{
            margin-top: 10px;
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    color: #4a4a4a;
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
            }
            .section2{
                margin-top: 20px;
                .el-input{
                    width: 100px;
                    margin-right: 10px;
                }
                span{
                    margin-right: 10px;
                }
            }
            .section3{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-5{
            padding-bottom: 20px;
            ul{
                li{
                    padding: 20px;
                    background: #fff;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
