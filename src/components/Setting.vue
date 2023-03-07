<script setup lang="ts">
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'

    const alertMessage = ref('')
    const email = ref('')
    const old_email = ref('')
    const password1 = ref('')
    const password2 = ref('')
    const old_password = ref('')

    const editEmail = ref(false)
    const editPassword = ref(false)

    const showApplicationToken = ref(false)
    const applicationToken = ref('')
    const applicationUserId = ref('')

    
    // cookieにtokenとuser_idがあるか
    if(document.cookie.match(/token/) && document.cookie.match(/user_id/)) {
        var token = document.cookie.split('token=')[1].split(';')[0]
        var user_id = document.cookie.split('user_id=')[1].split(';')[0]

        // 表示用変数に代入
        applicationToken.value = token
        applicationUserId.value = user_id

        // tokenの有効性を確認
        axios.post('https://api.af-service.net/api/check_token/'+user_id, {
        token: token
        },
        {
        headers: {
            'content-type': 'multipart/form-data',
        },
        }).then(respose => {
        console.log(respose)
        // tokenが有効
        if(respose.data.status == "ok") {
            axios.post('https://api.af-service.net/api/get_email/'+user_id, {
            token: token
            },
            {
            headers: {
                'content-type': 'multipart/form-data',
            },
            }).then(respose => {
            console.log(respose)
            if(respose.status == 200) {
                if(respose.data.status == "ok") {
                    email.value = respose.data.data.email
                    old_email.value = respose.data.data.email
                } else {
                    alertMessage.value = 'apiサーバーとの通信に失敗しました。'
                }
            } else {
                alertMessage.value = 'apiサーバーとの通信に失敗しました。'
            }
            }).catch(error => {
            console.log(error)
            })
        } else {
            // ログインページに遷移
            window.location.href = '/login'
        }
        }).catch(error => {
        console.log(error)
        })
    } else {
        // ログインページに遷移
        window.location.href = '/login'
    }

    // メールアドレス変更
    const changeEmail = async () => {
        // 入力確認
        if (email.value == '') {
            alertMessage.value = 'メールアドレスを入力してください。'
            return
        }
        // メールアドレスが正しいか確認
        if (!email.value.match(/.+@.+\..+/)) {
            alertMessage.value = 'メールアドレスの形式が正しくありません。'
            return
        }
        // メールアドレスが変更されているか確認
        if (email.value == old_email.value) {
            alertMessage.value = '現在のメールアドレスと同じものは設定できません。'
            return
        }
        // 更新
        axios.post('https://api.af-service.net/api/update_user_data/'+user_id, {
            token: token,
            email: email.value,
        },
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(respose => {
            console.log(respose)
            if(respose.status == 200) {
                if(respose.data.status == "ok") {
                    alert('メールアドレスを変更しました。')
                } else {
                    alertMessage.value = respose.data.message
                }
            } else {
                alertMessage.value = 'apiサーバーとの通信に失敗しました。'
            }
        }).catch(error => {
            console.log(error)
            alertMessage.value = 'apiサーバーとの通信に失敗しました。'
        })
    }

    // パス変更
    const changePassword = async () => {
        // 入力確認
        if (password1.value == '' || password2.value == '' || old_password.value == '') {
            alertMessage.value = 'パスワードを入力してください。'
            return
        }
        // パスワードが一致しているか確認
        if (password1.value != password2.value) {
            alertMessage.value = 'パスワードが一致しません。'
            return
        }
        // パスワードが8文字以上か確認
        if (password1.value.length < 4) {
            alertMessage.value = 'パスワードは4文字以上にしてください。'
            return
        }
        // パスワードが半角英数字か確認
        if (!password1.value.match(/^[a-zA-Z0-9.?/-]{4,200}$/)) {
            alertMessage.value = 'パスワードは4文字以上200文字以下の半角英数字にしてください。'
            return
        }
        // パスワードが変更されているか確認
        if (password1.value == old_password.value) {
            alertMessage.value = '現在のパスワードと同じものは設定できません。'
            return
        }
        // パスワードを変更
        axios.post('https://api.af-service.net/api/update_user_data/'+user_id, {
            token: token,
            password: password1.value,
        },
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(respose => {
            console.log(respose)
            if(respose.status == 200) {
                if(respose.data.status == "ok") {
                    alert('パスワードを変更しました。')
                } else {
                    alertMessage.value = respose.data.message
                }
            } else {
                alertMessage.value = 'apiサーバーとの通信に失敗しました。'
            }
        }).catch(error => {
            console.log(error)
            alertMessage.value = 'apiサーバーとの通信に失敗しました。'
        })
    }

    const renewToken = () => {
        axios.post('https://api.af-service.net/api/renew_token/'+user_id, {
            token: token,
        },
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(respose => {
            console.log(respose)
            if(respose.status == 200) {
                if(respose.data.status == "ok") {
                    // 新しいトークンを適用
                    token = respose.data.data.new_token
                    applicationToken.value = respose.data.data.new_token

                    // 既存のcookieを更新
                    document.cookie = 'token=' + respose.data.data.new_token + '; path=/; max-age=2592000'

                    // 再読み込み
                    location.reload()
                } else {
                    alertMessage.value = respose.data.message
                }
            } else {
                alertMessage.value = 'apiサーバーとの通信に失敗しました。'
            }
        }).catch(error => {
            console.log(error)
            alertMessage.value = 'apiサーバーとの通信に失敗しました。'
        })
    }

</script>

<template>
    <main><br>
        <br v-if="alertMessage">
        <div v-if="alertMessage" class="alert alert-danger" role="alert">
            {{alertMessage}}
        </div>
        <br v-if="alertMessage">

        <h3>設定</h3><br>
        <div class="cardbx">
            <h4>プロファイル情報</h4>
            <div class="cardbby">
                <hr class="line">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><a>E-mail</a></td>
                            <td v-if="editEmail==false"><p class="text-muted">{{old_email}}</p></td>
                            <td align="right" v-if="editEmail==false"><button type="button" class="btn" @click="editEmail = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button></td>
                            <td v-if="editEmail==true">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="name"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                                    <input type="text" class="form-control" id="name" placeholder="email" aria-label="email" aria-describedby="name" v-model="email">
                                </div>
                            </td>
                            <td align="right" v-if="editEmail==true"><button type="button" class="btn" v-on:click="changeEmail" @click="editEmail = false"><font-awesome-icon icon="fa-solid fa-check" /></button></td>
                        </tr>
                        <tr>
                            <td><a>パスワード</a></td>
                            <td v-if="editPassword==false"><p class="text-muted">********(セキュリティ上の観点から、パスワードはハッシュ値のみ保存しています。)</p></td>
                            <td align="right" v-if="editPassword==false"><button type="button" class="btn" @click="editPassword = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button></td>
                            <td v-if="editPassword==true">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="old_password"><font-awesome-icon icon="fa-solid fa-key" /></span>
                                    <input type="password" class="form-control" id="old_password" placeholder="現在のパスワード" aria-label="old_password" aria-describedby="old_password" v-model="old_password">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="password1"><font-awesome-icon icon="fa-solid fa-key" /></span>
                                    <input type="password" class="form-control" id="password1" placeholder="新しいパスワード" aria-label="password1" aria-describedby="password1" v-model="password1">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="password2"><font-awesome-icon icon="fa-solid fa-key" /></span>
                                    <input type="password" class="form-control" id="password2" placeholder="新しいパスワード" aria-label="password2" aria-describedby="password2" v-model="password2">
                                </div>
                            </td>
                            <td align="right" v-if="editPassword==true"><button type="button" class="btn" v-on:click="changePassword" @click="editPassword = false"><font-awesome-icon icon="fa-solid fa-check" /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div><br>

        <div class="cardbx">
            <h4>アプリケーション連携情報</h4>
            <div class="cardbby">
                <hr class="line">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><a>User ID</a></td>
                            <td><p class="text-muted">{{applicationUserId}}</p></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><a>Token</a></td>
                            <td v-if="showApplicationToken==false"><p class="text-muted">	********(非表示になっています。表示するには右側の表示ボタンをクリックしてください)</p></td>
                            <td align="right" v-if="showApplicationToken==false"><button type="button" class="btn" @click="showApplicationToken = true"><font-awesome-icon icon="fa-solid fa-eye" /></button></td>
                            <td v-if="showApplicationToken==true"><p class="text-muted">{{applicationToken}}</p></td>
                            <td align="right" v-if="showApplicationToken==true"><button type="button" class="btn" @click="showApplicationToken = false"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div><br>

        <div class="cardbx den-cr">
            <h4>ログイン用トークンの再生成</h4>
            <div class="cardbby">
                <hr class="line">
                <p class="text-muted">AFnetAccountログインに使用される内部トークンを再生成します。ログイン用トークンの再生成を実行するとすると、全てのサービス・アプリでログアウトが実行されます。<br>通常この操作を行う必要はありません。</p>
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-danger" type="button" v-on:click="renewToken">ログイン用トークンの再生成</button>
                </div>
            </div>
        </div><br>
        <br v-if="alertMessage">
        <div v-if="alertMessage" class="alert alert-danger" role="alert">
            {{alertMessage}}
        </div>
        <br v-if="alertMessage">
    </main>
</template>
<style>
    main {
        display: block;
        min-height: 100vh;
        min-width: 100vh;
    }
    .cardbx {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        border-radius: 10px;
        box-shadow: 1px 1px 5px 1px #eee;
        background-color: #fff;
    }
    .cardbby {
        width: 100%;
        clear: both;
        padding-top: -10px;
        margin-top: -10px;
    }
    .cardbx-title {
        width: 100%;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .den-cr {
        border: 1px solid #dc3545;
    }
</style>