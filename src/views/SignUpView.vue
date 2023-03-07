<script setup lang="ts">
  import { defineComponent, ref } from "vue";
  import axios from 'axios'

  const redirect = ref('')
  const user_id = ref('')
  const token = ref('')

  const username = ref('')
  const email = ref('')
  const password1 = ref('')
  const password2 = ref('')
  // ユーザー名のバリデーションメッセージ
  const validation01 = ref('')
  // メールアドレスのバリデーションメッセージ
  const validation02 = ref('')
  // パスワードのバリデーションメッセージ
  const validation03 = ref('')
  const validation04 = ref('')

  const alertMessage = ref('')

  // redirectパラメータ
  if(document.location.search.match(/redirect/)) {
    redirect.value = document.location.search.split('redirect=')[1]
  }

  // cookieにtokenとuser_idがあるか
  if(document.cookie.match(/token/) && document.cookie.match(/user_id/)) {
    // tokenの有効性を確認
    token.value = document.cookie.split('token=')[1].split(';')[0]
    user_id.value = document.cookie.split('user_id=')[1].split(';')[0]

    axios.post('https://api.af-service.net/api/check_token/'+user_id.value, {
      token: token.value
    },
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(respose => {
      console.log(respose)
      // tokenが有効
      if(respose.data.status == "ok") {
        // ユーザーページに遷移
        window.location.href = '/userpg'
      } else {
        // tokenが無効
        console.log(respose.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  var isFaild = false

  const signup = (e: Event) => {
    // ユーザー名入力チェック
    if(username.value.length == 0) {
      // バリデーションクラスの追加
      document.getElementById('inputUsername')?.classList.add('is-invalid')
      validation01.value = 'ユーザー名を入力してください。'
      isFaild = true
    }else{
      // バリデーションクラスの削除
      document.getElementById('inputUsername')?.classList.remove('is-invalid')
      validation01.value = ''
    }
    // ユーザー名の有効性チェック
    if(username.value.length < 4) {
      // バリデーションクラスの追加
      document.getElementById('inputUsername')?.classList.add('is-invalid')
      validation01.value = 'ユーザー名は4文字以上で入力してください。'
      isFaild = true
    }else{
      // バリデーションクラスの削除
      document.getElementById('inputUsername')?.classList.remove('is-invalid')
      validation01.value = ''
    }
    // メールアドレスの有効性チェック
    if(!email.value.match(/.+@.+\..+/)) {
      // バリデーションクラスの追加
      document.getElementById('staticEmail')?.classList.add('is-invalid')
      validation02.value = 'メールアドレスの形式が正しくありません。'
      isFaild = true
    }else{
      // バリデーションクラスの削除
      document.getElementById('staticEmail')?.classList.remove('is-invalid')
      validation02.value = ''
    }
    // パスワードの一致を検証
    if(password1.value != password2.value) {
      // バリデーションクラスの追加
      document.getElementById('inputPassword')?.classList.add('is-invalid')
      validation04.value = 'パスワードが一致しません。'
      isFaild = true
    }else{
      // バリデーションクラスの削除
      document.getElementById('inputPassword')?.classList.remove('is-invalid')
      validation04.value = ''
    }
    // パスワードの有効性チェック
    if(!password1.value.match(/^[a-zA-Z0-9.?/-]{4,200}$/)) {
      // バリデーションクラスの追加
      document.getElementById('inputPassword')?.classList.add('is-invalid')
      validation02.value = 'パスワードは4文字以上200文字以下の半角英数字で入力してください。'
      isFaild = true
    }else{
      // バリデーションクラスの削除
      document.getElementById('inputPassword')?.classList.remove('is-invalid')
      validation02.value = ''
    }

    // 異常値がなければ新規登録処理を実行
    if(!isFaild) {
      // afnet-apiに問い合わせ
      axios.post('https://api.af-service.net/api/account_add', {
        name: username.value,
        email: email.value,
        password: password1.value
      },
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }).then(respose => {
        console.log(respose)
        if(respose.status == 200) {
          // 処理成功
          if(respose.data.status == "ok") {
            
            // 成功時の処理
            console.log(respose.data)
            // cookieにtokenを保存
            document.cookie = 'token=' + respose.data.data.token + '; path=/; max-age=2592000'
            // cookieにuser_idを保存
            document.cookie = 'user_id=' + respose.data.data.user_id + '; path=/; max-age=2592000'
            
            // リダイレクト連携の有無
            if(redirect.value == ""){
              // ユーザーページに遷移
              window.location.href = '/userpg'
            }else{
              // formをsubmit
              document.getElementsByTagName('form')[0].submit()
            }
          } else {
            // ログイン失敗時の処理
            alertMessage.value = respose.data.message
            console.log(respose.data)
          }
        } else {
          // ログイン失敗
          alertMessage.value = 'APIサーバーとの通信に失敗しました。'
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

</script>

<template>
  <div class="bkgd">
    <main>
      <div id="app">
        <div class="pop">
          <h1 class="">新規登録</h1><br>
          <div class="login-form">
          <div class="mb-3">
              <label for="staticUserName" class="col-sm-5 col-form-label">ユーザー名</label>
              <div class="col-sm-12">
                <input type="text" class="form-control" id="staticUserName" placeholder="user@example.com" aria-describedby="validation01" v-model="username" required />
                <div id="validation01" class="invalid-feedback">
                  {{validation01}}
                </div>
              </div>
              
              <label for="staticEmail" class="col-sm-5 col-form-label">メールアドレス</label>
              <div class="col-sm-12">
                <input type="text" class="form-control" id="staticEmail" placeholder="user@example.com" aria-describedby="validation02" v-model="email" required />
                <div id="validation02" class="invalid-feedback">
                  {{validation02}}
                </div>
              </div>
              
              <label for="inputPassword" class="col-sm-5 col-form-label">パスワード</label>
              <div class="col-sm-12">
                <input type="password" class="form-control" id="inputPassword" placeholder="2sEZP&H!Q4eW!B" aria-describedby="validation03" v-model="password1" required>
                <div id="validation03" class="invalid-feedback">
                  {{validation03}}
                </div>
              </div>
              
              <label for="inputPassword" class="col-sm-5 col-form-label">パスワードを再入力</label>
              <div class="col-sm-12">
                <input type="password" class="form-control" id="inputPassword" placeholder="2sEZP&H!Q4eW!B" aria-describedby="validation04" v-model="password2" required>
                <div id="validation04" class="invalid-feedback">
                  {{validation04}}
                </div>
              </div>
          </div>
          <div v-if="redirect != ''" class="alert alert-info" role="alert">
            アカウントの新規登録後、<a :href="redirect" class="alert-link" target="_blank">{{ redirect.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)![1] }}</a>へ連携情報が送信されます。
          </div>
          <div class="col-sm-10 offset-sm-10">
              <button class="btn btn-primary" v-on:click="signup">登録</button>
          </div>
          <br v-if="alertMessage">
          <div v-if="alertMessage" class="alert alert-danger" role="alert">
            {{alertMessage}}
          </div>
      </div>
        <br>
        <p v-if="redirect == ''">既にAFnetAccountをお持ちの場合<a href="/login">こちらからログイン</a>できます。</p>
        <p v-if="redirect != ''">既にAFnetAccountをお持ちの場合<a :href="'/login?redirect='+ redirect">こちらからログイン</a>できます。</p>
        </div>
      </div>
    </main>
  </div>
  <form v-if="redirect != ''" name="redirect-form" method="post" :action="redirect" style="visibility: hidden;">
    <input type="hidden" name="user_id" :value="user_id">
    <input type="hidden" name="token" :value="token">
  </form>
</template>

<style>
  .app {
    position: relative;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
  }
  .pop {
    position: absolute;
    top: 25%;
    left: 20%;
    margin-top: -75px;
    margin-left: -75px;
    max-width: 500px;
    min-width: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 50px;
  }
</style>