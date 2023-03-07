<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import Setting from '../components/Setting.vue'

</script>

<template>
    <div id="app" class="bg-light">
        <sidebar class="sidebar-area"></sidebar>
        <div class="main-contents">
            <setting class="cont"></setting>
        </div>
        <bottom class="footer-area"></bottom>
    </div>
</template>

<style>
    #app {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
    }
    .sidebar-area {
        float: left;
        max-width: 300px;
        min-width: 300px;
        border-right: 1px solid #ebebeb;
    }
    .main-contents {
        max-width: 80%;
        padding-left: 30px;
        padding-right: 50px;
        width: calc(100% - 350px);
        float: right;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
    }
</style>