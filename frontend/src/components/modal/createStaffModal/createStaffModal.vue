<template>
    <div class="modal-container create-staff-modal" v-if="modalStatus">
        <el-dialog title="新增员工" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="name" label="员工姓名" label-width="100px">
                    <el-input placeholder="请输入员工姓名"  class="pwd input-box" v-model="form.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="员工年龄" label-width="100px">
                    <el-input placeholder="请输入员工年龄"  class="pwd input-box" v-model="form.age" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="员工电话" label-width="100px">
                    <el-input placeholder="请输入员工电话"  class="pwd input-box" v-model="form.mobile" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="birthday" label="员工生日" label-width="100px">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择员工生日">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="shopId" label="所属店铺" label-width="100px">
                    <el-input placeholder="请输入所属店铺"  class="pwd input-box" v-model="form.shopId" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="roleId" label="职员岗位" label-width="100px">
                    <el-input placeholder="请输入职员岗位"  class="pwd input-box" v-model="form.roleId" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="payment" label="基本工资" label-width="100px">
                    <el-input placeholder="请输入基本工资"  class="pwd input-box" v-model="form.payment" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="entryDate" label="入职时间" label-width="100px">
                    <el-date-picker
                        v-model="form.entryDate"
                        type="date"
                        placeholder="选择入职日期">
                    </el-date-picker>
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
    import { requestCreateStaff } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { addCategoryStatus,GIFTS_CHANGE } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    name: '',
                    age: '',
                    mobile: '',
                    birthday: '',
                    shopId: '',
                    roleId: '',
                    payment: '',
                    entryDate: ''
                },
                dataRule: {
                    name: [
                        { required: true, message: '员工姓名不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.createStaffModal || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.createStaffModal
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.form,{shopId: this.$route.params.id});
                        requestCreateStaff(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '新建成功',
                                    type: 'success'
                                })
                                EventBus.$emit(addCategoryStatus,()=>{
                                    this.initData();
                                });
                                EventBus.$emit(GIFTS_CHANGE,()=>{
                                    // this.initData();
                                });
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
                    no: '',
                    name: '',
                    needIntegral: '',
                    count: '',
                    unit: ''
                }
                this.$store.dispatch('closeCreateStaffModal')
            },
            handleSelectionChange(){}
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
    .create-gifts-modal{
        .el-form-item__error{
            left: 88px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }


</style>
