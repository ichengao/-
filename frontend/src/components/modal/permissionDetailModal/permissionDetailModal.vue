<template>
    <div class="modal-container permission-detail-modal" v-if="modalStatus">
        <el-dialog title="设置权限" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="permission-list">
                <ul class="permission-section">
                    <li v-for="(item,idx) in initDataArray" :key="idx">
                        <el-checkbox @change="handleGroupChange($event,idx)" v-model="item.checked" :label="item.authId">{{ item.authName }}</el-checkbox>
                        <div class="permission-section-content">
                            <el-checkbox @change="handleItemChange($event,idx)" v-for="childItem in item.children" v-model="childItem.checked" :label="childItem.authId" :key="childItem.authId">{{ childItem.authName }}</el-checkbox>
                        </div>
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
    import { requestGetAuthList,requestGetStaffAllMenu,requestAddcommission } from '@/services/service';
    export default {
        data(){
            return{
                initDataArray: [],
                checked: false,
                selectedArr: []
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
                    shopId: this.$route.params.id,
                    authId: this.$store.state.permissionDetailModalStatus.data,
                    roleId: this.$store.state.updatePermissionModalStatus.data
                };
                requestGetStaffAllMenu(params).then(res=>{
                    this.initDataArray = res.data.data.children;
                    try{
                        this.initDataArray.forEach(item=>{
                            this.$set(item,'checked',false)
                            (item.children.length > 0) && item.children.forEach(childItem=>{
                                childItem.checked = false;
                            })
                        });
                    }catch (e) {

                    }
                    this.getAuth(params);
                });
            },
            // 匹配已经存在的
            getAuth(params){
                requestGetAuthList(params).then((res)=>{
                    let auths = res.data.data.auths;
                    let authArr = [];
                    auths.forEach(item => {
                        authArr.push(item.authId);
                        item.children.forEach(childItem=>{
                            authArr.push(childItem.authId);
                        })
                    });
                    this.initDataArray.forEach(item=>{
                        if(item.children.length){
                            let isAllChecked = true;
                            item.children.forEach(childItem=>{
                                (authArr.indexOf(childItem.authId) != -1) && this.$set(childItem,'checked',true)
                                isAllChecked = isAllChecked && (authArr.indexOf(childItem.authId) != -1)
                            });
                            isAllChecked && this.$set(item,'checked',true)
                        }else{
                            (authArr.indexOf(item.authId) != -1) && this.$set(item,'checked',true)
                        }
                    })
                });
            },
            // 组更新
            handleGroupChange(status,idx){
                this.initDataArray[idx].children.length && this.initDataArray[idx].children.forEach(item => {
                    this.$set(item,'checked',status)
                })
            },
            // 单个更新
            handleItemChange(status,idx){
                let currentStatus = true;
                this.initDataArray[idx].children.forEach(item=>{
                    currentStatus = currentStatus && item.checked
                });
                this.$set(this.initDataArray[idx],'checked',currentStatus);
            },
            handleCloseModal(){
                this.$store.dispatch('closePermissionDetailModal');
            },
            handleConfirm(){
                let auths = [];
                this.initDataArray.forEach(item=>{
                    let isChecked = false;
                    if(item.children.length){
                        item.children.forEach(childItem=>{
                            childItem.checked && auths.push(childItem.authId);
                            isChecked = isChecked || childItem.checked
                        });
                        isChecked && auths.push(item.authId);
                    }else{
                        item.checked && auths.push(item.authId);
                    }
                });
                let params = {
                    shopId: this.$route.params.id,
                    auths: auths,
                    roleId: this.$store.state.updatePermissionModalStatus.data,
                    authId: this.$store.state.permissionDetailModalStatus.data
                };
                requestAddcommission(params)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .permission-detail-modal{
        .permission-section{
            li{
                border-bottom: 1px solid #ddd;
                padding: 15px 0;
                .permission-section-content{
                    padding-left: 40px;
                }
            }
        }
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
