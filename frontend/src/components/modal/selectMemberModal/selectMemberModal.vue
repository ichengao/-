<template>
    <div class="modal-container member-manage-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="选择会员" :visible.sync="modalStatus" @close='handleCloseModal' >

        </el-dialog>
    </div>
</template>
<script>
    export default {
        components: {

        },
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.selectMemberModalStatus || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.selectMemberModalStatus
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeSelectMemberModal');
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
