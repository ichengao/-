<template>
    <div class="calculator">
        <slot name="insert-box"></slot>
        <div class="section-btn">
            <div class="section-lf">
                <div class="section-lf-list">
                    <span @click="handleChange(1)">1</span>
                    <span @click="handleChange(2)">2</span>
                    <span @click="handleChange(3)">3</span>
                </div>
                <div class="section-lf-list">
                    <span @click="handleChange(4)">4</span>
                    <span @click="handleChange(5)">5</span>
                    <span @click="handleChange(6)">6</span>
                </div>
                <div class="section-lf-list">
                    <span @click="handleChange(7)">7</span>
                    <span @click="handleChange(8)">8</span>
                    <span @click="handleChange(9)">9</span>
                </div>
                <div class="section-lf-list">
                    <span class="btn-sero" @click="handleChange(0)">0</span>
                    <span @click="handleChange('.')">.</span>
                </div>
            </div>
            <div class="section-rgt">
                <span @click="handleBtnCancle">取消</span>
                <span @click="handleBtnEnsure">确<br>定</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            handleChange(params){
                this.$emit('handleCalcAddNum',params+"")
            },
            handleBtnEnsure(){
                this.$emit('handleCalcEnsure')
            },
            handleBtnCancle(){
                this.$emit('handleCalcCancle')
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/scss/common.scss";
    .calculator{
        padding: 10px;
        background: #F2F2F2;
        .section-btn{
            display: flex;
            .section-lf{
                .section-lf-list{
                    display: flex;
                    span{
                        width: 55px;
                        height: 55px;
                        background: #fff;
                        text-align: center;
                        line-height: 55px;
                        margin: 10px;
                        font-weight: bold;
                        font-size: 18px;
                        cursor: pointer;
                        &.btn-sero{
                            width: 130px;
                        }
                        &:hover{
                            opacity: .7;
                        }
                    }
                }
            }
            .section-rgt{
                span{
                    font-size: 20px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 87px;
                    height: 55px;
                    cursor: pointer;
                    background: $color;
                    margin: 10px 10px 20px;
                    &:last-child{
                        height: 205px;
                        margin-bottom: 10px;
                    }
                    &:hover{
                        opacity: .7;
                    }
                }
            }
        }
    }
</style>
