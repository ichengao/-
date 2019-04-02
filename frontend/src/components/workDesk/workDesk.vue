<template>
    <div class="container">
        <headerSection></headerSection>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <changePwdModal />
        <changePhoneModal />
        <createShopModal />
    </div>
</template>
<script>
import headerSection from '../header/headerFormWorkDesk/headerForWorkDesk';
import changePwdModal from '@/components/modal/changePwdModal/changePwdModal';
import changePhoneModal from '@/components/modal/changePhoneModal/changePhoneModal';
import createShopModal from '@/components/modal/createShopModal/createShopModal';

export default {
    components: {
        headerSection,
        changePwdModal,
        changePhoneModal,
        createShopModal
    },
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/common.scss';
    
    .container{
        background: rgb(242,242,242);
        min-height: 100vh;
        padding-top: 55px;
        padding-bottom: 30px;
        font-size: 16px;
    }
</style>
   