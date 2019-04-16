<template>
    <div class="container">
        <div class="section-1">
            <div class="section1">
                <div class="section-lf">
                    <span class="section-lf-title">消费积分规则</span>
                    <span>销售记账时，会员积分将依据本规则自动累加</span>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.integralRule"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <el-form :model="form1" :rules="dataRule1" status-icon ref="form1" >
                    <span>元 = </span>
                    <el-input v-model="form1.integral" placeholder="输入积分" class="el-input integral-input"></el-input>
                    <span>积分</span>
                    <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                    <el-button class="btn-save">保存</el-button>
                </el-form>
            </div>
        </div>
        <div class="section-2">
            <div class="section1">
                <span class="section-lf-title">会员级别和折扣设置(会员折扣输入范围：0--10)</span>
                <span>以历史积分为标准，设定不同的等级和折扣，刺激消费</span>
            </div>
            <div class="section2">
                <div class="section-lf">
                    <span class="section-lf-title">等级晋升规则</span>
                    <el-radio v-model="form2.levelType" label="1">按累计积分晋升等级</el-radio>
                    <el-radio v-model="form2.levelType" label="2">按当前积分晋升等级</el-radio>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.integralRule"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section3">
                <el-form :model="form2" :rules="dataRule2" status-icon ref="form2" >
                    <ul>
                        <li v-for="(item,idx) in form2.list" :key="idx">
                            <span>等级名称</span>
                            <el-input v-model="item.levelName" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>当会员积分在</span>
                            <el-input v-model="item.startArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>到</span>
                            <el-input v-model="item.endArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>之间，可享受</span>
                            <el-input v-model="item.endArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>折，</span>
                            <el-button class="btn-delete">删除</el-button>
                        </li>
                    </ul>
                </el-form>
                <div class="control-btn">
                    <el-button class="btn-control el-icon-plus"></el-button>
                    <el-button class="btn-control">保存</el-button>
                </div>
            </div>
        </div>
        <div class="section-3">
            <ul>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">会员共享</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form2.set1"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否发送短信提醒会员</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form2.set2"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否自动生成会员卡号</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form2.set3"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否禁用手动输入会员卡卡号</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form2.set4"
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
                    money: 1,
                    integral: 100,
                    integralRule: true
                },
                dataRule1: {

                },
                form2: {
                    levelType: '1',   // 晋级规则
                    list: [
                        {
                            levelName: '',
                            startArea: '0',
                            endArea: '0',
                            discount: '0'
                        }
                    ]
                },
                form3: {
                    set1: false,
                    set2: false,
                    set3: false,
                    set4: false,
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
                margin-top: 30px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .el-input{
                    width: 100px;
                    &.integral-input{
                        margin-left: 10px;
                    }
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
                .btn-save{
                    @include buttonSet($color-btn-green);
                    margin-left: 40px;
                }
            }
        };
        .section-2{
            background: #fff;
            padding: 20px;
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
            };
            .section2{
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                .section-lf-title{
                    margin-right: 10px;
                }
            };
            .section3{
                margin-top: 20px;
                li{
                    margin-top: 20px;
                    .el-input{
                        width: 100px;
                        margin-right: 10px;
                    }
                    span{
                        margin-right: 10px;
                    }
                    .btn-delete{
                        @include buttonSet($color-btn-green);
                        margin-left: 40px;
                    }
                };
                .control-btn{
                    margin-top: 20px;
                    .btn-control{
                        @include buttonSet($color-btn-green);
                        margin-right: 40px;
                    }
                }
            }
        };
        .section-3{
            ul{
                padding-bottom: 20px;
                li{
                    margin-top: 10px;
                    background: #fff;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
