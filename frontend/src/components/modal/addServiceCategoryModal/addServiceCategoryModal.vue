<template>
    <div class="modal-container change-pwd-modal" v-if="modalStatus">
        <el-dialog title="新增服务分类" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="name">
                    <span>类别名称</span>
                    <el-input placeholder="请输入类别名称"  class="pwd input-box" v-model="form.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="sort">
                    <span>类别序号</span>
                    <el-input placeholder="请输入类别序号"  class="pwd input-box" v-model="form.sort" maxlength="20"></el-input>
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
    import { requestAddcategory } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { addServiceCategoryStatus } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    name: '',
                    sort: '',
                    type: '02'
                },
                dataRule: {
                    name: [
                        { required: true, message: '类别名称不能为空', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '排序序号不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.createServiceCategoryStatus|| false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.createServiceCategoryStatus
            }
        },
        methods: {
            handleConfirm(){
                let _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = {
                            shopId: this.$route.params.id
                        };
                        params = Object.assign({},this.form,params);
                        requestAddcategory(params).then(function(res){
                            _this.handleCloseModal();
                            if(res.data.code == '0000'){
                                Message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                EventBus.$emit(addServiceCategoryStatus,()=>{
                                    this.initData();
                                });
                            }else{
                                Message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(){
                            Message({
                                message:'添加失败',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            handleCloseModal(){
                this.form = {
                    name: '',
                    sort: '',
                    type: '01'
                }
                this.$store.dispatch('closeServiceCategoryModal')
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
