<template>
    <div class="container pay-setting-detail-container">
        <div class="section-1">
            <span>微信支付设置</span>
            <div class="section-item">
                <el-radio v-model="wxStatus" label="0">不开启（收银时只标记为微信付款）</el-radio>
                <el-radio v-model="wxStatus" label="1">开启微信支付</el-radio>
            </div>
            <div class="section-item">
                <el-button class="btn-save">保存</el-button>
            </div>
        </div>
        <div class="section-2">
            <span>支付宝支付设置</span>
            <div class="section-item">
                <el-radio v-model="alipayStatus" label="0">不开启（收银时只标记为支付宝付款）</el-radio>
                <el-radio v-model="alipayStatus" label="1">开启支付宝支付</el-radio>
            </div>
            <div class="section-item">
                <el-button class="btn-save">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                wxStatus: '1',
                alipayStatus: '1'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .pay-setting-detail-container{
        .section-1{
            padding: 20px;
            background: #fff;
            .section-item{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        };
        .section-2{
            padding: 20px;
            background: #fff;
            margin-top: 10px;
            .section-item{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
    }
</style>
