<template>
    <div class="modal-container create-staff-modal" v-if="modalStatus">
        <el-dialog title="新增管理员" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="account" label="账号预览" label-width="100px">
                    <el-input readonly class="pwd input-box" v-model="account" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="staffNo" label="员工工号" label-width="100px">
                    <el-input placeholder="请输入员工工号"  class="pwd input-box" v-model="form.staffNo" maxlength="200"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码" label-width="100px">
                    <el-input placeholder="请输入登录密码" type="password" class="pwd input-box" v-model="form.password" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="选择员工" label-width="100px">
                    <el-select v-model="form.staffId" placeholder="请选择">
                        <el-option
                            v-for="item in staffOptions"
                            :key="item.staffId"
                            :label="item.name"
                            :value="item.staffId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestUpdateAdminStaff,requestGetAllStaff } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { ADD_ADMIN_STAFF } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    staffId: '',
                    staffNo: '',
                    account: '',
                    password: ''
                },
                dataRule: {
                    staffNo: [
                        { required: true, message: '工号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
                staffOptions: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.updateAdminStaffModal.status || false)
                },
                set(){

                }
            },
            account: {
                get() {
                    const mobile = JSON.parse(sessionStorage.getItem('userMsg')).mobile;
                    this.form.account = `${mobile}@${this.form.staffNo}`;
                    return `${mobile}@${this.form.staffNo}` ;
                },
                set() {
                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updateAdminStaffModal.status;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    pageSize: 1000000
                };
                requestGetAllStaff(params).then((res)=>{
                    this.staffOptions = res.data.data.list;
                })
                this.form = Object.assign({},this.form,this.$store.state.updateAdminStaffModal.data)
            },
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.form,{shopId: this.$route.params.id});
                        requestUpdateAdminStaff(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '新建成功',
                                    type: 'success'
                                })
                                EventBus.$emit(ADD_ADMIN_STAFF);
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'新建失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    staffId: '',
                    staffNo: '',
                    account: '',
                    password: ''
                };
                this.$store.dispatch('closeUpdateAdminStaffModal')
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
</style>
