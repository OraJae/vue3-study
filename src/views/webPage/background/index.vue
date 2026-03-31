<template>
    <a-layout style="height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="light">
            <div class="logo">后台管理</div>
            <a-menu v-model:selectedKeys="state.selectedKeys" mode="inline" :open-keys="state.openKeys" :items="items" @openChange="onOpenChange"></a-menu>
        </a-layout-sider>
        <a-layout>
            <!-- <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header> -->
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                {{ state.selectedKeys }}
                <box-list v-if="state.selectedKeys.includes('boxList')"></box-list>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
import boxList from './boxManage/boxList.vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
const collapsed = ref(false);

function getItem(label, key, icon, children, type) {
    return {
        label,
        key,
        icon,
        children,
        type,
    };
}
const items = reactive([
    getItem('物品管理系统', 'grp', () => h(MailOutlined), [getItem('盒子列表', 'boxList'), getItem('Option 14', '14')], 'group'),
    getItem('Navigation One', 'sub1', () => h(MailOutlined), [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
]);
const state = reactive({
    rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
    openKeys: ['sub1'],
    selectedKeys: ['boxList'],
});
const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};
</script>
<style scoped>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}
.trigger:hover {
    color: #1890ff;
}
.logo {
    height: 32px;
    background-color: rgba(80, 89, 168, 0.8);
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    font-size: 20px;
    box-sizing: border-box;
    color: #fff;
}

.site-layout .site-layout-background {
    /* background: #fff; */
}
</style>