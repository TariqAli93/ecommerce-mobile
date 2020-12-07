<template>
<MainLayout :toolbar="false" :backbutton="false" :navigation="false" title="Login" className="loginPage">
    <div class="login">
        <div class="logo">
            <img src="@/assets/images/logo_store.png">
        </div>

        <div class="form">
            <form @submit.prevent="login()">
                <div class="login-form-input">
                    <i class="im im-mail"></i>
                    <input type="email" v-model="email" placeholder="البريد الالكتروني">
                </div>

                <div class="login-form-input">
                    <i class="im im-key"></i>
                    <input type="password" v-model="password" placeholder="كلمة المرور">
                </div>

                <button type="submit">
                    تسجيل الدخول
                </button>
            </form>


            <button @click="openModel = true">استعادة كلمة المرور</button>
        </div>

        <div class="footer">
            <button>ليس لديك حساب ؟ انشاء حساب جديد</button>
        </div>

        <div :class="{'open': openModel}" class="model">
            <button class="close" @click="openModel = false"><i class="im im-x-mark"></i></button>
            <div class="model-overlay"></div>
            <div class="model-content">
                <div class="model-content-body" v-show="resetPassForm">
                    <h1>استعادة كلمة المرور</h1>
                    <form>
                        <div class="form-input">
                            <i class="im im-mail"></i>
                            <input type="email" v-model="resetEmail" placeholder="البريد الالكتروني">
                        </div>
                        <button @click.prevent="resetPassCode = true; resetPassForm = false">
                            استعادة كلمة المرور
                        </button>
                    </form>
                </div>

                <div class="model-content-body" v-show="resetPassCode">
                    <h1>كود استرجاع كلمة المرور</h1>
                    <form class="resetCode">
                        <div class="form-input">
                            <input type="email" v-model="resetEmail">
                            <input type="email" v-model="resetEmail">
                            <input type="email" v-model="resetEmail">
                            <input type="email" v-model="resetEmail">
                        </div>
                        <button type="submit">
                            استعادة كلمة المرور
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</MainLayout>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            resetEmail: '',
            openModel: false,
            resetPassForm: true,
            resetPassCode: false
        }
    },

    methods: {
        login() {
            let user = {
                email: this.email,
                password: this.password
            };
        }
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.page--loginPage {
    position: relative;
    height: 100vh;
    width: 100%;
    background: $primary !important;
    display: flex;
    align-items: center;
    justify-content: center;

    .page--content {
        width: 100%;
        height: 100%;
    }

    .login {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;
            width: 100%;
            margin-top: auto;
        }

        .form {
            display: block;
            width: 100%;

            form {
                width: 100%;
                padding: 10px;

                .login-form-input {
                    display: block;
                    width: 100%;
                    position: relative;

                    i {
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translateY(-50%);
                        color: $secondary;
                        font-size: 15px;
                    }

                    input {
                        display: block;
                        width: 100%;
                        padding: 20px 10px;
                        border: none;
                        border-bottom: 5px solid $secondary;
                        background: transparent;
                        outline: none;
                        box-shadow: none;
                        margin-bottom: 10px;
                        opacity: 1;
                        color: $secondary;
                        border-radius: 0;
                        padding-right: 30px;

                        &::-webkit-input-placeholder {
                            /* Chrome/Opera/Safari */
                            color: $secondary !important;
                        }

                        &::-moz-placeholder {
                            /* Firefox 19+ */
                            color: $secondary !important;
                        }

                        &:-ms-input-placeholder {
                            /* IE 10+ */
                            color: $secondary !important;
                        }

                        &:-moz-placeholder {
                            /* Firefox 18- */
                            color: $secondary !important;
                        }

                        &:hover,
                        &:focus {
                            opacity: 1;
                        }
                    }
                }

                button {
                    background: $secondary;
                    border: none;
                    outline: none;
                    box-shadow: none;
                    color: $primary;
                    border-radius: 0;
                    width: 100%;
                    padding: 20px 0;
                    margin-top: 10px;
                    font-weight: bolder;
                }
            }

            button {
                background: transparent;
                color: $secondary;
                border: none;
                box-shadow: none;
                outline: none;
                font-size: 15px;
                padding: 10px 10px;
            }
        }

        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: auto;

            button {
                background: transparent;
                color: $secondary;
                border: none;
                box-shadow: none;
                outline: none;
                font-size: 14px;
                padding: 20px 0;
                font-weight: 100;
            }
        }

        .model {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 100000;
            top: 0;
            left: 0;
            visibility: hidden;
            opacity: 0;
            transition: all ease-in-out 500ms;

            &-overlay {
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba($primary, .40);
            }

            .close {
                position: absolute;
                width: 50px;
                height: 50px;
                border: none;
                outline: none;
                box-shadow: none;
                background: transparent;
                z-index: 500;
                color: $primary;
                top: 20px;
                left: 0;
            }

            &-content {
                position: absolute;
                right: 0;
                width: 100%;
                background: $secondary;
                top: -100%;
                transition: all ease-in-out 500ms;

                &-body {
                    padding: 10px 10px;

                    h1 {
                        color: $primary;
                        font-size: 25px;
                        padding: 15px 0px;
                    }

                    form {
                        display: block;
                        margin-bottom: 10px;

                        .form-input {
                            display: block;
                            position: relative;

                            i {
                                position: absolute;
                                top: 50%;
                                right: 0;
                                transform: translateY(-50%);
                                color: $primary;
                            }

                            input {
                                display: block;
                                width: 100%;
                                padding: 20px 10px;
                                border: none;
                                border-bottom: 5px solid $primary;
                                background: transparent;
                                outline: none;
                                box-shadow: none;
                                margin-bottom: 10px;
                                opacity: 1;
                                color: $primary;
                                border-radius: 0;
                                padding-right: 30px;

                                &::-webkit-input-placeholder {
                                    /* Chrome/Opera/Safari */
                                    color: $primary !important;
                                }

                                &::-moz-placeholder {
                                    /* Firefox 19+ */
                                    color: $primary !important;
                                }

                                &:-ms-input-placeholder {
                                    /* IE 10+ */
                                    color: $primary !important;
                                }

                                &:-moz-placeholder {
                                    /* Firefox 18- */
                                    color: $primary !important;
                                }

                                &:hover,
                                &:focus {
                                    opacity: 1;
                                }
                            }
                        }

                        &.resetCode {
                            .form-input {
                                display: flex;

                                input {
                                    margin: 0 10px;
                                }
                            }
                        }

                        button {
                            background: $primary;
                            color: $secondary;
                            border: none;
                            box-shadow: none;
                            outline: none;
                            font-size: 15px;
                            padding: 20px 0;
                            display: block;
                            width: 100%;
                            margin-top: 15px;
                        }
                    }
                }
            }

            &.open {
                visibility: visible;
                opacity: 1;

                .model-content {
                    top: 0;
                }
            }
        }
    }
}
</style>
