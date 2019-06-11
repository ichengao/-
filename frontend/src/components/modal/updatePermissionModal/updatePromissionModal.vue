<template>
    <div class="modal-container update-permission-modal" v-if="modalStatus">
        <el-dialog title="设置权限" :visible.sync="modalStatus" @close='handleCloseModal' >
            <ul class="permission-list">
                <li v-for="(item,idx) in initDataArray" :key="idx" @click="handleClick(item.authId)">
                    <div></div>
                    <span>{{ item.authName }}</span>
                </li>
            </ul>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestGetStaffMenu } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.updatePermissionModalStatus.status || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.updatePermissionModalStatus.status;
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
                requestGetStaffMenu(params).then((res)=>{
                    this.initDataArray = res.data.data;
                })
            },
            handleCloseModal(){
                this.$store.dispatch('closeUpdatePermissionModal');
            },
            handleClick(params){
                this.$store.dispatch('openPermissionDetailModal',params);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .update-permission-modal{
        .permission-list{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 25%;
                text-align: center;
                cursor: pointer;
                margin-top: 20px;
                &:hover{
                    >div{
                        top: -10px;
                        transition: top .1s;
                    }
                }
                >div{
                    height: 82px;
                    width: 82px;
                    margin: 0 auto 10px;
                    position: relative;
                    top: 0;
                    transition: top .1s;
                    background: url("../../../assets/images/qxidocn.png") no-repeat;
                }
                &:first-child{
                    div{
                        background-position: -21px -23.1px;
                    }
                }
                &:nth-child(2){
                    div{
                        background-position: -21px -123.1px;
                    }
                }
                &:nth-child(3){
                    div{
                        background-position: -21px -222.1px;
                    }
                }
                &:nth-child(4){
                    div{
                        background-position: -21px -321.1px;
                    }
                }
                &:nth-child(5){
                    div{
                        background-position: -21px -421.1px;
                    }
                }
                &:nth-child(6){
                    div{
                        background-position: -21px -521.1px;
                    }
                }
                &:nth-child(7){
                    div{
                        background-position: -126px -123px;
                    }
                }
                &:nth-child(8){
                    div{
                        background: url("../../../assets/images/cashier.png") center center no-repeat;
                    }
                }
                &:nth-child(9){
                    div{
                        background: url("../../../assets/images/Privilegemaent.png") center center no-repeat;
                    }
                }
            }
        }
    }
</style>
