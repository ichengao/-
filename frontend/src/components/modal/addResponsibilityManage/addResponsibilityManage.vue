<template>
    <div class="modal-container change-pwd-modal" v-if="modalStatus">
        <el-dialog title="新增员工岗位" :visible.sync="modalStatus" @close='handleCloseModal' >
            <div class="section-content">
                <ul>
                    <li>
                        <p>1.项目提成</p>
                        <img src="../../../assets/images/gw01.png" alt="">
                        <p>
                            员工根据服务客户的项目进行相应 提成
                        </p>
                        <span :class="{'el-icon-check': true,'active': checkList.indexOf(0) != -1}" @click="handleClick(0)"></span>
                    </li>
                    <li>
                        <p>2.个人业绩汇总提成</p>
                        <img src="../../../assets/images/gw02.png" alt="">
                        <p>
                            员工根据本人各项业绩汇总进行相 应提成，可以对业绩汇总进行分阶 段提成
                        </p>
                        <span class="el-icon-check" :class="{'el-icon-check': true,'active': checkList.indexOf(1) != -1}" @click="handleClick(1)"></span>
                    </li>
                    <li>
                        <p>3.店面业绩汇总提成</p>
                        <img src="../../../assets/images/gw03.png" alt="">
                        <p>
                            员工根据店面经营业绩进行相应提 成或分红
                        </p>
                        <span class="el-icon-check" :class="{'el-icon-check': true,'active': checkList.indexOf(2) != -1}" @click="handleClick(2)"></span>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="footer-lf">
                    提示：可以选择一种或多种(1,2种不能合选)
                </div>
                <div class="footer-rgt">
                    <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { ADD_RESPONSIBILITY_MANAGE } from '@/components/eventEmitter/eventName';
    export default {
        data(){
            return{
                checkList: []
            }
        },
        computed: {
            modalStatus: {
                get(){
                    return (this.$store.state.addResponsibilityManageStatus || false)
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.addResponsibilityManageStatus
            }
        },
        methods: {
            handleClick(params){
                switch (params) {
                    case 0:
                        console.log(this.checkList.indexOf(0),this.checkList.indexOf(1));
                        if(this.checkList.indexOf(0) != -1){
                            this.checkList.splice(this.checkList.indexOf(0),1);
                        }else{
                            this.checkList.push(0);
                            if(this.checkList.indexOf(1) != -1){
                                this.checkList.splice(this.checkList.indexOf(1),1);
                            }
                        }
                        break;
                    case 1:
                        if(this.checkList.indexOf(1) != -1){
                            this.checkList.splice(this.checkList.indexOf(1),1);
                        }else{
                            this.checkList.push(1);
                            if(this.checkList.indexOf(0) != -1){
                                this.checkList.splice(this.checkList.indexOf(0),1);
                            }
                        }
                        break;
                    case 2:
                        if(this.checkList.indexOf(2) != -1){
                            this.checkList.splice(this.checkList.indexOf(2),1);
                        }else{
                            this.checkList.push(2);
                        }
                        break;
                    default:
                        break;
                }
            },
            handleConfirm(){
                if(!this.checkList.length){
                    return
                }
                EventBus.$emit(ADD_RESPONSIBILITY_MANAGE,this.checkList);
                this.handleCloseModal();
            },
            handleCloseModal(){
                this.$store.dispatch('closeAddResponsibilityManage')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';

    .section-content{
         ul{
             display: flex;
             li{
                 border-left: 1px solid #ddd;
                 padding: 0 5px;
                 text-align: center;
                 p{
                     text-align: left;
                     height: 57px;
                 }
                 span{
                     display: flex;
                     width: 20px;
                     height: 20px;
                     border-radius: 50%;
                     cursor: pointer;
                     border: 1px solid #ddd;
                     margin: 0 auto;
                     align-items: center;
                     justify-content: center;
                     &:hover,&.active{
                         background: $color;
                         color: #fff;
                         border-color: $color;
                     }
                 }
                 &:last-child{
                     border-right: 1px solid #ddd;

                 }
             }
         }
    }
    .dialog-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
