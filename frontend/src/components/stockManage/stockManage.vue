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
        <createSupplierVendorModal />
        <editSupplierVendorModal />
        <createStoreControlModal />
        <editStoreControlModal />
        <updateProductQuantityModal />
        <inventoryRecordListModal />
    </div>
</template>
<script>
import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
import asideSection from '@/components/common/aside';
import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal';
import createSupplierVendorModal from '@/components/modal/createSupplierVendorModal/createSupplierVendorModal';
import editSupplierVendorModal from '@/components/modal/editSupplierVendorModal/editSupplierVendorModal';
import createStoreControlModal from '@/components/modal/createStoreControlModal/createStoreControlModal';
import editStoreControlModal from '@/components/modal/editStoreControlModal/editStoreControlModal';
import updateProductQuantityModal from '@/components/modal/updateProductQuantityModal/updateProductQuantityModal';
import inventoryRecordListModal from '@/components/modal/inventoryRecordListModal/inventoryRecordListModal';

export default {
    components: {
        headerSection,
        asideSection,
        createMemberCardModal,
        createSupplierVendorModal,
        editSupplierVendorModal,
        createStoreControlModal,
        editStoreControlModal,
        updateProductQuantityModal,
        inventoryRecordListModal
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
            .content-section-right{
                padding: 10px 20px 0 10px;
                margin-top: 55px;
                width: 100%;
            }
        }
    }
</style>
<style lang="scss">
