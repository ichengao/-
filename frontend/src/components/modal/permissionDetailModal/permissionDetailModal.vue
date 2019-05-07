<template>
    <div class="modal-container permission-detail-modal" v-if="modalStatus">
        <el-dialog title="设置权限" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="permission-list">
                <ul class="permission-section">
                    <li>
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetUnprocessedOrderList } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: [],
                checked: false
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.permissionDetailModalStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.permissionDetailModalStatus.status;
                if(this.modalStatus){
                    this.initData();
                }
            }
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetUnprocessedOrderList(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleCloseModal(){
                this.$store.dispatch('closePermissionDetailModal');
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .permission-detail-modal{
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
</style>
