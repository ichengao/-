<template>
    <div class="modal-container create-staff-modal" v-if="modalStatus">
        <el-dialog title="更改模板" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-radio-group v-model="currentId">
                <ul>
                    <li ></li>
                </ul>
            </el-radio-group>

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
    import { ADD_ADMIN_STAFF } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                currentId: '',
                initDataArray: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.updateMsgTemplate.status || false)
                },
                set(){

                }
            },
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updateMsgTemplate.status;
                if(this.modalStatus){
                    this.initData()
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id,
                };
                requestGetMsgTemplate(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleConfirm(){
                let _this = this;

            },
            handleCloseModal(){
                this.$store.dispatch('closeUpdateMsgTemplate')
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
