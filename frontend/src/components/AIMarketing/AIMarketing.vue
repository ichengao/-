<template>
    <div class="container">
        <headerSection />
        <div class='content-section'>
            <asideSection />
            <div class="content-section-right">
                <router-view></router-view>
            </div>
        </div>
        <createMemberCardModal />
        <msgModuleForMemberChooseModal />
        <msgTemplateModal />
        <addCouponModal />
        <editCouponModal />
        <IssueCouponsModal />
        <UpdateMsgTemplateModal />
    </div>
</template>
<script>
    import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
    import asideSection from '@/components/common/aside';
    import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal'
    import msgModuleForMemberChooseModal from '@/components/modal/msgModuleForMemberChooseModal';
    import msgTemplateModal from '@/components/modal/msgTemplateModal';
    import addCouponModal from '@/components/modal/addCouponModal';
    import editCouponModal from '@/components/modal/editCouponModal';
    import IssueCouponsModal from '@/components/modal/IssueCouponsModal';
    import UpdateMsgTemplateModal from '@/components/modal/UpdateMsgTemplateModal';

    export default {
        data(){
            return{
                currentId: ''
            }
        },
        components: {
            headerSection,
            asideSection,
            createMemberCardModal,
            msgModuleForMemberChooseModal,
            msgTemplateModal,
            addCouponModal,
            editCouponModal,
            IssueCouponsModal,
            UpdateMsgTemplateModal
        },
        mounted(){
            this.currentId = this.$route.params.id;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        background: #eee;
        min-height: 100vh;
        .content-section{
            display: flex;
            .content-nav{
                background: #fff;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                a{
                    div{
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }
                    &.active{
                        div{
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
            .content-section-right{
                padding: 10px 20px 0 10px;
                margin-top: 55px;
                width: 100%;
            }
        }
    }
</style>
<style lang="scss">
