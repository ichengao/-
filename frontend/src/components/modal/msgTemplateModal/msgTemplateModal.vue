<template>
    <div class="modal-container choose-member-modal" v-if="modalStatus">
        <el-dialog title="选择模板" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="section-content">
                <el-radio-group v-model="form.selectedTemplate">
                    <ul>
                        <li v-for="(item,idx) in initDataArray" :key="idx" class="item-list">
                            <el-radio :label="item.content"></el-radio>
                        </li>
                    </ul>
                </el-radio-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetMsgTemplate } from '@/services/service';
    import { Message } from 'element-ui';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_MSG_TEMPLATE } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                form: {
                    selectedTemplate: ''
                },
                activeName: '01',
                initDataArray: [],
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.msgTemplateModal.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.msgTemplateModal.status;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                    msgType: this.$store.state.msgTemplateModal.data.type
                };
                requestGetMsgTemplate(params).then(res=>{
                    this.initDataArray = res.data.data
                })
            },
            handleConfirm(){
                EventBus.$emit(UPDATE_MSG_TEMPLATE,this.form.selectedTemplate);
                this.handleCloseModal();
            },
            handleCloseModal(){
                this.form = {
                    name: '',
                    contact: '',
                    mobile: '',
                    address: '',
                    remark: ''
                };
                this.$store.dispatch('closeMsgTemplateModal');
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .choose-member-modal{
        .section-header{
            display: flex;
            justify-content: space-between;
            .section-select{
                margin-right: 10px;
            }
        }
        .section-content{
            padding: 10px 0;
            min-height: 400px;
            .item-list{
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
            }
        }
        .dialog-footer{
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
        }
    }
</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';
    .choose-member-modal{
        .el-radio, .el-radio__input{
            white-space: normal;
        }
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
    }
</style>
