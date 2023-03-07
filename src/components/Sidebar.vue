<script setup lang="ts">
    import { defineComponent, ref } from 'vue'


    // url 取得
    const url = window.location.href
    const path = url.split('/userpg/')[1]
    console.log(path)

    // ログアウト
    const logout = () => {
        // cookieの削除
        document.cookie = 'token=; max-age=0'
        document.cookie = 'user_id=; max-age=0'
        // ログインページに遷移
        window.location.href = '/login'
    }
    
</script>

<template>
    <div class="sidebar">
    <div class="sidebar-wrapper">
        <div class="sidebar-top-area">
            <div class="sidebar-top">
                <div class="sidebar-top-title">
                    <img src="@/assets/images/logo-snap.png" alt="logo" class="sidebar-logo">
                </div>
            </div>
        </div>
        <div class="sidebar-link-area">
            <div class="sidebar-link-div" v-bind:class="{'active-page':path === 'profile'}">
                <router-link to="/userpg/profile" class="sidebar-link"><font-awesome-icon icon="fa-regular fa-address-card" />&nbsp;<span>プロフィール</span></router-link>
            </div>
            <div class="sidebar-link-div" v-bind:class="{'active-page':path === 'setting'}">
                <router-link to="/userpg/setting" class="sidebar-link"><font-awesome-icon icon="fa-solid fa-sliders" />&nbsp;<span>設定</span></router-link>
            </div>

            <div class="sidebar-bottom">
                <hr>
                <div class="sidebar-link-div">
                    <a class="sidebar-link" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" />&nbsp;<span>ログアウト</span></a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style>
    .sidebar {
        background-color: #fff;
        min-height: 100vh;
        min-width: 300px;
        max-width: 300px;
        padding-left: 30px;
        padding-right: 30px;
        opacity: 0.9.5;
        flex: left;
    }

    .sidebar-logo {
        width: 100%;
        border-radius: 10px;
    }
    
    .sidebar-top-area {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .sidebar-link-area {
        width: 100%;
    }

    .sidebar-link-div {
        border-radius: 30px;
        padding: 10px 50px 10px 30px;
    }

    .sidebar-link-div:hover {
        background-color: #f43d831f;
        border-radius: 30px;
        padding: 10px 50px 10px 30px;
    }

    .active-page {
        background-color: #f43d831f;
        border-radius: 30px;
        padding: 10px 50px 10px 30px;
    }

    .sidebar-link {
        color: #f43d83;
        font-weight: bold;
        text-decoration: none;
    }

    .sidebar-link:hover {
        color: #f43d83;
        font-weight: bold;
        text-decoration: none;
    }

    .sidebar-bottom {
        position: absolute;
        bottom: 20px;
        min-width: 230px;
        max-width: 230px;
    }
</style>