<template>
    <div class="msg-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/AIMarketing/'+currentId+'/msg/msgSending'" active-class="active">
                    <div>短信发送</div>
                </router-link>
                <router-link :to="'/AIMarketing/'+currentId+'/msg/msgList'" active-class="active">
                    <div>短信记录</div>
                </router-link>
                <router-link :to="'/AIMarketing/'+currentId+'/msg/msgConfig'" active-class="active">
                    <div>短信配置</div>
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
    .container {
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

