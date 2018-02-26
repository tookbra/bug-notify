<style scoped>
    .layout{
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
<template>
    <div class="layout">
        <Header style="background: #fff;">
            <Menu mode="horizontal" :theme="theme" active-name="index" @on-select="routerToView">
                <MenuItem name="index">
                    <Icon type="home"></Icon>
                    主页
                </MenuItem>
                <MenuItem name="product-setting">
                    <Icon type="bug"></Icon>
                    产品设置
                </MenuItem>
                <MenuItem name="setting">
                    <Icon type="settings"></Icon>
                    设置
                </MenuItem>
            </Menu>
        </Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        theme: 'light',
      };
    },
    created() {
      this.$router.push({ path: '/index' });
    },
    methods: {
      routerToView(name) {
        switch (name) {
          case 'index':
            this.$router.push({ path: '/index' });
            break;
          case 'product-setting':
            this.$router.push({ path: '/setting' });
            break;
          case 'setting':
            this.$router.push({ path: '/config' });
            break;
          default:
            break;
        }
      },
    },
  };
</script>

<style scoped>
    a {
        color:#333;
    }
</style>