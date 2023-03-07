<script setup lang="ts">
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'
import { faL } from '@fortawesome/free-solid-svg-icons';

    const username = ref('')
    const bio = ref('')
    const link = ref('')
    const setIcon = ref(false)
    const alertMessage = ref('')
    const icon_src = ref('')
    const icon_src_d = ref('@assets/images/user.png')

    const editName = ref(false)
    const editBio = ref(false)
    const editLink = ref(false)


    // 初期値を保管
    let initUsername = username.value
    let initBio = bio.value
    let initLink = link.value

    

    // cookieにtokenとuser_idがあるか
    if(document.cookie.match(/token/) && document.cookie.match(/user_id/)) {
        var token = document.cookie.split('token=')[1].split(';')[0]
        var user_id = document.cookie.split('user_id=')[1].split(';')[0]

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
            // プロフィール情報を取得
            axios.get('https://api.af-service.net/api/get_user_data/'+user_id, {
            headers: {
                'content-type': 'multipart/form-data',
            },
            }).then(respose => {
            console.log(respose)
            // プロフィール情報を表示
            if(respose.data.status == "ok") {
                username.value = respose.data.data.name
                bio.value = respose.data.data.bio
                link.value = respose.data.data.link

                if(respose.data.data.icon != null) {
                    setIcon.value = true
                    icon_src.value = 'https://api.af-service.net/api/get_icon/'+user_id
                }

                initUsername = username.value
                initBio = bio.value
                initLink = link.value
            } else {
                alertMessage.value = respose.data.message
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

    // プロフィール情報を更新
    const updateProfile = () => {
        axios.post('https://api.af-service.net/api/update_user_data/'+user_id, {
            token: token,
            name: username.value,
            bio: bio.value,
            link: link.value,
        },
        {
        headers: {
            'content-type': 'multipart/form-data',
        },
        }).then(respose => {
        console.log(respose)
        // プロフィール情報を更新
        if(respose.status == 200) {
            if(respose.data.status == "ok") {
                alert("プロフィールを更新しました")
            }else{
                alertMessage.value = respose.data.data.message
            }
        } else {
            alertMessage.value = "APIサーバーとの通信に失敗しました"
        }
        }).catch(error => {
            alertMessage.value = "APIサーバーとの通信に失敗しました"
            console.log(error)
        })
    }

    const changeIcon = () => {
        // apiにアップロード
        const fileInput = document.getElementById('imageUploader') as HTMLInputElement
        const file = fileInput.files?.item(0)
        if(file) {
            axios.post('https://api.af-service.net/api/update_user_data/'+user_id, {
                token: token,
                icon_img: file,
            }, {
            headers: {
                'content-type': 'multipart/form-data',
            },
            }).then(respose => {
                console.log(respose)
                // プロフィール情報を更新
                if(respose.status == 200) {
                    if(respose.data.status == "ok") {
                        icon_src.value = "https://api.af-service.net/api/get_icon/"+user_id
                        window.location.reload()
                    }else{
                        alertMessage.value = respose.data.data.message
                    }
                } else {
                    alertMessage.value = "APIサーバーとの通信に失敗しました"
                }
            }).catch(error => {
                alertMessage.value = "APIサーバーとの通信に失敗しました"
                console.log(error)
            })
        }
    }

    const iconSelect = () => {
        const fileInput = document.getElementById('imageUploader')
        fileInput?.click()
    }

</script>

<template>
    <main><br>
        <br v-if="alertMessage">
        <div v-if="alertMessage" class="alert alert-danger" role="alert">
            {{alertMessage}}
        </div>
        <br v-if="alertMessage">
        <h3>プロフィール</h3><br>
        <div class="cardbx">
            <div class="imgcontent">
                <img v-if="setIcon == true" v-bind:src="icon_src" class="usicon" loading="lazy"><br>
                <img v-if="setIcon == false" src="@/assets/images/user.png" class="usicon" loading="lazy"><br>
            </div>
            <div class="imgexcontent">
                <p class="text-muted">ここで設定したプロフィール画像は、AFnetAccountを利用するすべてのアプリとデバイスに表示されます。</p>
            </div>
            <div class="imgoptcontent">
                <hr class="line">
                <a href="#" @click="iconSelect">プロフィール画像を変更する</a>
                <input @change="changeIcon" type="file" accept="image/*" name="file" id="imageUploader" style="display:none;">
            </div>
        </div><br>
        
        <div class="cardbx">
            <h4>プロフィール情報</h4>
            <div class="cardbby">
                <hr class="line">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><a>名前</a></td>
                            <td v-if="editName==false"><p class="text-muted">{{username}}</p></td>
                            <td align="right" v-if="editName==false"><button type="button" class="btn" @click="editName = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button></td>
                            <td v-if="editName==true">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="name"><font-awesome-icon icon="fa-solid fa-user-large" /></span>
                                    <input type="text" class="form-control" id="name" placeholder="Username" aria-label="Username" aria-describedby="name" v-model="username">
                                </div>
                            </td>
                            <td align="right" v-if="editName==true"><button type="button" class="btn" v-on:click="updateProfile" @click="editName = false"><font-awesome-icon icon="fa-solid fa-check" /></button></td>
                        </tr>
                        <tr>
                            <td><a>ウェブサイト</a></td>
                            <td v-if="editLink==false"><a href="{{ link }}">{{link}}</a></td>
                            <td align="right" v-if="editLink==false"><button type="button" class="btn" @click="editLink = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button></td>
                            <td v-if="editLink==true">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="link"><font-awesome-icon icon="fa-solid fa-link" /></span>
                                    <input type="text" class="form-control" id="link" placeholder="https://exmaple.com" aria-label="link" aria-describedby="link" v-model="link">
                                </div>
                            </td>
                            <td align="right" v-if="editLink==true"><button type="button" class="btn" v-on:click="updateProfile" @click="editLink = false"><font-awesome-icon icon="fa-solid fa-check" /></button></td>
                        </tr>
                        <tr>
                            <td><a>自己紹介</a></td>
                            <td v-if="editBio==false"><p class="text-muted">{{bio}}</p></td>
                            <td align="right" v-if="editBio==false"><button type="button" class="btn" @click="editBio = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button></td>
                            <td v-if="editBio==true">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="bio"><font-awesome-icon icon="fa-solid fa-circle-exclamation" /></span>
                                    <textarea class="form-control" id="bio" rows="3" placeholder="自己紹介" aria-label="bio" aria-describedby="bio" v-model="bio">{{bio}}</textarea>
                                </div>
                            </td>
                            <td align="right" v-if="editBio==true"><button type="button" class="btn" v-on:click="updateProfile" @click="editBio = false"><font-awesome-icon icon="fa-solid fa-check" /></button></td>
                        </tr>
                    </tbody>
                </table>
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
    .cardbx-title {
        width: 100%;
        text-align: left;
    }
    .imgcontent {
        border-radius: 50%;
        width: 165px;
        height: 165px;
        display: block;
        overflow: clip;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgexcontent {
        padding: 20px 10px 0 30px;
        max-width: 60%;
        float: left;
        display: block;
        overflow: clip;
    }
    .imgoptcontent{
        width: 100%;
        clear: both;
        text-align: right;
        padding-top: 10px;
        margin-top: 10px;
    }
    .usicon {
        text-align: center;
        width: 160px;
        height: 160px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid #838383;
        padding: 0;
        margin: 0;

        /*ドラッグできないように*/
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }
    .cardbby {
        width: 100%;
        clear: both;
        padding-top: -10px;
        margin-top: -10px;
    }
</style>