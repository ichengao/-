<template>
    <div class="modal-container member-manage-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="会员管理" :visible.sync="modalStatus" @close='handleCloseModal' >
            <memberManage />
        </el-dialog>
    </div>
</template>
<script>
    import memberManage from '@/components/memberManager/memberManager'
    export default {
        components: {
            memberManage
        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.memberManageModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.memberManageModalStatus
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeMemberManageModal');
            },
        }
    }
</script>
<style lang="scss" scoped>
    .member-manage-modal{
        .dialog-box{
            .el-dialog{
                width: 1151px;
            }
        }
    }
</style>
