<script setup lang="ts">
</script>

<template>
  <div class="col-lg-8 mx-auto p-3 py-md-5">
    <header class="d-flex align-items-center pb-3 mb-5 border-bottom">
      <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
        <img src="@/assets/images/logo-snap.png" alt="Logo" class="logo">
      </a>
    </header>

    <main>
      <h1>AFnetAccountを入手する</h1>
      <p class="fs-5 col-md-8">Share.aup, Mercrypt等のサービスで高度な機能をご利用いただくためにはAFnetAccuntへの登録が必要です。<br>今後もより充実したサービスを提供するため、ご登録をお願いします。</p>

      <div class="mb-5">
        <a href="/signup" class="btn btn-primary btn-lg px-4">新規登録</a>
      </div>

      <hr class="col-3 col-md-2 mb-5">

      <div class="row g-5">
        <div class="col-md-6">
          <h2>サイトマップ</h2>
          <p>当サイトのサイトマップをご覧いただくことで、サイト内のページ構造や全体像をきっと把握しやすくなります。</p>
          <ul class="icon-list">
            <li><a href="/">ページトップ</a></li>
            <li><a href="/signup">新規登録</a></li>
            <li><a href="/login">ログイン</a></li>
            <ul>
              <li><a href="/userpg">ユーザー情報</a></li>
              <li><a href="/userpg/setting">アカウント設定</a></li>
            </ul>
            <li><a>規約・ポリシー</a></li>
            <ul>
              <li><a href="/about/terms">利用規約</a></li>
              <li><a href="/about/privacy">プライバシーポリシー</a></li>
            </ul>
          </ul>
        </div>

        <div class="col-md-6">
          <h2>関連リンク</h2>
          <p>AFnetAccountでご利用いただけるサービスには以下のようなものがあります。</p>
          <ul class="icon-list">
            <li><a href="https://share-aup.com" target="_blank">Share.aup</a></li>
            <li><a href="https://pack-anm.com" target="_blank">Pack.anm</a></li>
            <li><a href="https://mercrypt.com" target="_blank">Mercrypt</a></li>
          </ul>
          <br>
          <p>お問い合わせ等は<a href="https://twitter.com/mai_llj" target="_blank">@mai_llj</a>までお願いします。</p>
        </div>
      </div>
    <footer class="pt-5 my-5 text-muted border-top">
      Created by mai_llj · © 2023
    </footer>
    </main>
  </div>
</template>

<style>
  .logo {
    width: 100%;
    max-width: 300px;
    border-radius: 15px;
  }
</style>