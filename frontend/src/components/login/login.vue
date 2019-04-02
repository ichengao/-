<template>
    <div class="container">
        <div class="container-box">
            <div class="container-header">
                <p class="header-title">众维智能</p>
                <p class="header-content">众维智能众维智能众维智能</p>
            </div>
            <div class="container-content">
                <h3 class="page-title">登录</h3>
                <el-form ref="form" class="login-form" :model="form" :rules="dataRule" status-icon @keyup.enter.native="doLogin" >
                    <el-form-item prop="phone">
                        <el-input placeholder="手机号码" class="user input-box" v-model.number="form.phone" auto-complete="false" prefix-icon="el-icon-mobile-phone" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码"  class="pwd input-box" type="password" v-model="form.password" auto-complete="false" maxlength="20" prefix-icon="el-icon-goods"></el-input>
                    </el-form-item>
                    <div class="pwd-control">
                        <el-checkbox v-model="form.checked" >记住密码</el-checkbox>
                        <span class="form-pwd-forget">忘记密码?</span>
                    </div>
                    <el-button type="success" class="login-submit" @click="doLogin">登录</el-button>
                </el-form>
                <div class="do-reg">还没有账号? <a href="./register.html">立即注册</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import { requestLogin } from '../../services/service';
import md5 from 'js-md5';
export default {
    data(){
        return{
            form: {
                checked: false,
                phone: '',
                password: '',
            },
            dataRule: {
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        doLogin(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // let params = {
                    //     mobile: this.form.phone + '',
                    //     password: md5(this.form.password)
                    //     // 
                    // }
                    let params = {
                        mobile: 15705593859 + '',
                        password: '22222222222222222222222222222222'
                    }
                    
                    requestLogin(params).then(function(res){
                        if(res.data.msg == 'success'){
                            sessionStorage.setItem('userMsg',JSON.stringify(res.data.data));
                            localStorage.setItem('access_token',res.data.token.access_token);
                            window.location.href = '/'
                        }
                    })
                }
            }) 
        }
    }
}
</script>
<style lang="scss">
    $color:#ff6600;  
    .container{
        background: url('../../assets/images/login_bg.jpg') 0 0 no-repeat;
        background-size: cover;
        .container-box{
            min-height: 100vh;
            background-color: rgba(0,0,0,.5); 
            .container-header{
                text-align: center;
                padding: 50px 20px 20px;
                .header-title{
                    margin: 0 0 15px;
                    font-size: 38px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #fff;
                }
                .header-content{
                    font-size: 16px;
                    line-height: 1.5;
                    color: #909399;
                }
            }
            .container-content{
                width: 360px;
                padding: 15px 30px;
                background-color: #fff;
                margin: 0 auto;
                text-align: center;
                h3{
                    margin: 10px 0;
                    padding-bottom: 30px;
                }
                .login-form{
                    .pwd-control{
                        display: flex;
                        margin-top: 20px;
                        justify-content: space-between;
                    }
                    .login-submit{
                        margin-top: 20px;
                        width: 100%;
                        background-color: $color;
                        border-color: $color;
                    }
                    .pwd-box{
                        input{
                            padding-left: 31px;
                            background: url('../../assets/images/icon_pwd.png') 8px center no-repeat;
                            background-size: 18px auto; 
                        }
                    }
                    .phone-box{
                        input{
                            padding-left: 31px;
                            background: url('../../assets/images/icon_phone.png') 8px center no-repeat;
                            background-size: 18px auto; 
                        }
                    }
                }
                .do-reg{
                    text-align: center;
                    padding: 20px 0;
                    a{
                        color: $color;
                    }
                }
            }
        }
        
    }
</style>