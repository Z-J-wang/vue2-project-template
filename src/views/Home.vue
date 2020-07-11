<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-header style="text-align: right; font-size: 12px">
                <header-bar></header-bar>
            </el-header>
            <el-container>
                <el-aside
                    width="200px"
                    style="background-color: rgb(238, 241, 246)"
                >
                    <aside-menu></aside-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer>
                <footer-bar></footer-bar>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import asideMenu from "@c/common/AsideMenu.vue";
import headerBar from "@c/common/HeaderBar.vue";
import footerbar from "@c/common/FooterBar.vue";

export default {
    components: {
        "aside-menu": asideMenu,
        "header-bar": headerBar,
        "footer-bar": footerbar
    }
};
</script>

<style lang="less" scoped>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}
.el-aside {
    color: #333;
}
.el-footer {
    color: #ffffff;
    background-color: #484545;
}
</style>