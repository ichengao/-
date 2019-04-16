<template>
    <div class="container bind-pay-way-container">
        <div class="section-header">
            <ul>
                <li :class="currentType == '0' ? 'checked' : '' " @click="handleTypeToggle">微信支付绑定</li>
                <li :class="currentType == '1' ? 'checked' : '' " @click="handleTypeToggle">支付宝支付绑定</li>
            </ul>
        </div>
        <div class="section-wx" v-if="currentType == '0'">
            <div class="section1">
                <p>1. 选择微信的公众号的类型</p>
                <div class="section-item">
                    <span>请选择公众号类型：</span>
                    <el-checkbox v-model="form.wxType">服务号</el-checkbox>
                </div>
                <div class="section-item">
                    <span>公众号是否已认证：</span>
                    <el-radio v-model="form.wxReg" label="0">已认证</el-radio>
                    <el-radio v-model="form.wxReg" label="1">未认证</el-radio>
                </div>
            </div>
            <div class="section2">
                <p class="section-title">2. 从微信公众平台获取下列参数</p>
                <p>AppId(应用Id)：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入AppId(应用Id)" class="el-input"></el-input>
                </div>
                <p>应用秘钥(AppSecret)：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入应用秘钥(AppSecret)" class="el-input"></el-input>
                </div>
                <p>微信加解密串(EncodingAESKey)：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入微信加解密串" class="el-input"></el-input>
                </div>
                <p>微信商户号：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入微信商户号" class="el-input"></el-input>
                </div>
                <p>微信支付Key：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入微信支付Key" class="el-input"></el-input>
                </div>
                <p>令牌(Token)：</p>
                <div class="section-item">
                    <el-input v-model="form.money" placeholder="输入令牌(Token)" class="el-input"></el-input>
                </div>
                <p>微信验证文件</p>
                <div class="section-item">
                    <el-button class="btn-control">请选择上传文件</el-button>
                    <el-button class="btn-control">查看流程</el-button>
                </div>
            </div>
            <div class="section3">
                <el-button class="btn-control">确定</el-button>
            </div>
        </div>
        <div class="section-alipay" v-else>
            <span>扫码绑定</span>
            <img src="../../../assets/images/alipayImg.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentType: '0',
                form: {
                    wxType: true,
                    wxReg: '0',
                    AppId: '',
                    AppSecret: '',
                    EncodingAESKey: '',
                    wxShopId: '',
                    wxKey: '',
                    wxToken: ''
                }
            }
        },
        methods: {
            handleTypeToggle(){
                this.currentType = this.currentType == '0' ? '1' : '0';
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .bind-pay-way-container{
        background: #fff;
        padding: 20px;
        .section-header{
            ul{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                li{
                    width: 150px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    &:last-child{
                        border-left: none;
                    }
                    &.checked{
                        background: $color-btn-green;
                        color: #fff;
                    }
                }
            }
        }
        .section-wx{
            .section1{
                padding-top: 20px;
                .section-item{
                    padding-left: 15px;
                    margin-top: 20px;
                }
            }
            .section2{
                padding-top: 20px;
                p{
                    padding-left: 15px;
                    &.section-title{
                        padding-left: 0;
                    }
                }
                .section-item{
                    padding-left: 15px;
                    width: 400px;
                    .btn-control{
                        @include buttonSet($color-btn-green);
                    }
                }
            }
            .section3{
                padding-left: 15px;
                margin-top: 20px;
                .btn-control{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-alipay{
            display: flex;
            align-items: flex-start;
            padding-top: 20px;
            padding-left: 20px;
            span{
                margin-right: 20px;
            }
        }
    }
</style>
