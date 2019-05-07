<template>
    <div class="modal-container change-pwd-modal" v-if="modalStatus">
        <el-dialog title="新增角色" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="step-one">

            </div>
            <div class="step-two">
                <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                    <el-form-item prop="oldPwd">
                        <span>原始密码</span>
                        <el-input placeholder="请输入原始密码"  class="pwd input-box" type="password" v-model="form.oldPwd" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newPwd">
                        <span>最新密码</span>
                        <el-input placeholder="请输入最新密码"  class="pwd input-box" type="password" v-model="form.newPwd" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="confirm_password">
                        <span>确认密码</span>
                        <el-input placeholder="请再输入一次新密码" class="pwd input-box" type="password" v-model="form.confirm_password" maxlength="20" ></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm" class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import { requestUpdatePwd } from '@/services/service';
    import { Message } from 'element-ui'
    export default {
        data(){
            // 确认输入密码校验
            let checkConfirmPwd = (rule, value, callback)=>{
                if(value != this.form.newPwd){
                    callback(new Error('两次输入的密码不一致'));
                }else{
                    callback();
                }
            };
            return{
                form: {
                    oldPwd: '',
                    newPwd: '',
                    confirm_password: ''
                },
                dataRule: {
                    oldPwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    ],
                    newPwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    ],
                    confirm_password: [
                        { required: true, message: '重复密码不能为空', trigger: 'blur' },
                        { validator: checkConfirmPwd,trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.createRoleModal || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.createRoleModal
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = {
                            oldPwd: md5(this.form.oldPwd),
                            newPwd: md5(this.form.newPwd)
                        }
                        requestUpdatePwd(params).then(function(res){
                            _this.handleCloseModal()
                            if(res.data.msg == 'success'){
                                Message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'修改失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    oldPwd: '',
                    newPwd: '',
                    confirm_password: ''
                };
                this.$store.dispatch('closeCreateRoleModal')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';

    .dialog-btn{
        padding: 10px 15px;
        &:first-child{
            &:hover{
                color: $color;
                border-color: $color-level1;
                background-color: $color-level2;
            }
        }
        &:last-child{
            background: $color;
            border-color: $color;
        }
    }
    .input-box{
        width: 80%;
        margin-left: 20px;
        margin-top: 20px;
    }

</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';

    .el-dialog__headerbtn{
        .el-dialog__close{
            &:hover{
                color: $color !important;
            }
        }
    }
    .change-pwd-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
