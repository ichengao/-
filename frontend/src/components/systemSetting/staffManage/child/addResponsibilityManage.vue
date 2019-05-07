<template>
    <div class="add-responibility-container">
        <div class="container-header">
            <el-button class="btn-return" @click="handleReturn">返回</el-button>
        </div>
        <div class="container-content">
            <el-form :model="form" :rules="dataRule" status-icon ref="form" class="form-box">
                <div class="section1">
                    <el-form-item prop="userName" label="顾客姓名" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="userName" label="顾客姓名" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                    </el-form-item>
                </div>
                <div class="section2">
                    <div class="section2-header">
                        <div class="section2-lf">单项提成</div>
                        <div class="section2-rgt">

                        </div>
                    </div>
                    <div class="section2-content">
                        <div>
                            <el-form-item prop="userName" label="开卡提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="充值提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="充次提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="商品提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="section3">
                    <div class="section3-header">
                        <div class="section3-lf">个人汇总提成</div>
                        <div class="section2-rgt">

                        </div>
                    </div>
                    <div class="section3-content">
                        <div>
                            <el-form-item prop="userName" label="业绩提成" label-width="100px" class="form-item-box">
                                <el-select v-model="section2Option" placeholder="请选择">
                                    <el-option
                                        v-for="item in section2Options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div></div>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-plus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-minus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" readonly maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                        <div class="section3-btn">
                            <el-button class="btn-ensure">确定</el-button>
                        </div>
                        <div class="section3-list">
                            <ul>
                                <li>
                                    <div class="section-list-header">
                                        <div class="section-lf">充值业绩</div>
                                        <div class="section-rgt">
                                            <span class="el-icon-close"></span>
                                        </div>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥0至</span>
                                        <span>至¥2</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥3至</span>
                                        <span>至¥无限</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="section3">
                    <div class="section3-header">
                        <div class="section3-lf">店面业绩汇总提成</div>
                        <div class="section2-rgt">

                        </div>
                    </div>
                    <div class="section3-content">
                        <div>
                            <el-form-item prop="userName" label="业绩提成" label-width="100px" class="form-item-box">
                                <el-select v-model="section2Option" placeholder="请选择">
                                    <el-option
                                        v-for="item in section2Options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div></div>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-plus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-minus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" readonly maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                        <div class="section3-btn">
                            <el-button class="btn-ensure">确定</el-button>
                        </div>
                        <div class="section3-list">
                            <ul>
                                <li>
                                    <div class="section-list-header">
                                        <div class="section-lf">充值业绩</div>
                                        <div class="section-rgt">
                                            <span class="el-icon-close"></span>
                                        </div>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥0至</span>
                                        <span>至¥2</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥3至</span>
                                        <span>至¥无限</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                section2Options: [
                    {
                        label: '开卡业绩',
                        value: '01'
                    },
                    {
                        label: '充值业绩',
                        value: '02'
                    },
                    {
                        label: '商品业绩',
                        value: '03'
                    },
                    {
                        label: '充次业绩',
                        value: '04'
                    },
                ],
                section2Option: '',
                form: {

                },
                dataRule: {

                }
            }
        },
        props: ['data'],
        methods: {
            handleReturn(){
                this.$parent.currentMode = true
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .add-responibility-container{
        .container-header{
            padding: 10px;
            .btn-return{
                @include buttonSet($color);
            }
        }
        .container-content{
            margin-top: 20px;
            .section1{
                display: flex;
            }
            .section2{
                .section2-header{
                    display: flex;
                    padding: 30px;
                }
                .section2-content{
                    >div{
                        display: flex;
                    }
                }
            }
            .section3{
                .section3-header{
                    display: flex;
                    padding: 30px;
                }
                .section3-content{
                    >div{
                        display: flex;
                        .form-item-box{
                            .area-money{
                                margin: 0 10px;
                            }
                        }
                        .btn-add{
                            @include buttonSet($color);
                            height: 40px;
                            width: 70px;
                            margin-left: 20px;
                        }
                    }
                    .section3-btn{
                        display: flex;
                        justify-content: flex-end;
                        margin-right: 50px;
                        .btn-ensure{
                            @include buttonSet($color);
                        }
                    }
                    .section3-list{
                        ul{
                            width: 100%;
                            li{
                                margin: 30px;
                                background: #f5f5f5;
                                padding: 10px;
                                .section-list-header{
                                    display: flex;
                                    justify-content: space-between;
                                    span{
                                        &:hover{
                                            cursor: pointer;
                                            opacity: .7;
                                        }
                                    }
                                }
                                .section-list-content{
                                    display: flex;
                                    justify-content: space-between;
                                    margin-top: 20px;
                                    padding-right: 50px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .add-responibility-container{
        .form-item-box{
            .el-form-item__content{
                display: flex;
            }
        }
    }

</style>
