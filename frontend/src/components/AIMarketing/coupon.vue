<template>
    <div class="coupon-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/AIMarketing/'+currentId+'/coupon/couponManage'" active-class="active">
                    <div>优惠卷管理</div>
                </router-link>
                <router-link :to="'/AIMarketing/'+currentId+'/coupon/couponList'" active-class="active">
                    <div>优惠卷发放记录</div>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentId: ''
            }
        },
        mounted() {
            this.currentId = this.$route.params.id
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .coupon-container {
        .section-header {
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 20px;
            .section-header-lf {
                display: flex;
                a {
                    div {
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }

                    &.active {
                        div {
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
        }
    }
</style>

