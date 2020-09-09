<template>
<div :class="`page page--${className} page--${platform}`">
    <div class="page--toolbar" v-show="toolbar">
        <div class="page--toolbar--inner">
            <button class="search-button" v-show="search" @click="$store.commit('TOGGLE_SEARCH')">
                <i class="im im-magnifier"></i>
            </button>

            <span>{{ title }}</span>
            
            <button class="backbutton" v-show="backbutton" @click="$router.go(-1)">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
            </button>
        </div>
    </div>

    <div class="page--content">
        <slot></slot>
    </div>

    <div class="page--navigation" v-show="navigation">
        <div class="draw"></div>
        <ul class="page--navigation--list">
            <li class="page--navigation--list--item">
                <router-link to="/" tag="button" exact exact-active-class="active">
                    <i class="im im-home"></i>
                </router-link>
            </li>

            <li class="page--navigation--list--item fab--right">
                <router-link to="/profile" tag="button" exact exact-active-class="active">
                    <i class="im im-user-male"></i>
                </router-link>
            </li>

            <li class="page--navigation--list--item fab">
                <router-link to="/cart" tag="button">
                    <small v-show="$store.getters.product_count > 0">{{ $store.getters.product_count }}</small>
                    <i class="im im-shopping-cart"></i>
                </router-link>
            </li>

            <li class="page--navigation--list--item fab--left">
                <router-link to="/favorite" tag="button" exact exact-active-class="active">
                    <i class="im im-heart"></i>
                </router-link>
            </li>

            <li class="page--navigation--list--item">
                <router-link to="/categories" tag="button" exact exact-active-class="active">
                    <i class="im im-cubes"></i>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {
    Capacitor
} from '@capacitor/core'
export default {
    props: {
        className: {
            type: String,
            default: 'default'
        },

        toolbar: {
            type: Boolean,
            default: false
        },

        navigation: {
            type: Boolean,
            default: false,
        },

        title: {
            type: String,
            default: 'Title'
        },

        backbutton: {
            type: Boolean,
            default: false
        },
        
        search: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {
            platform: '',
            showSearchBox: false,
            search_input: '',
        }
    },

    mounted() {
        this.platform = Capacitor.platform
    },
}
</script>

<style lang="scss">
@import '../../variables.scss';

.page {
    background: #F4F6F8;

    &--toolbar {
        position: relative;
        width: 100%;
        padding: 15px 12px;
        background: $primary;
        z-index: 400;

        &--inner {
            display: block;
            width: 100%;
            text-align: center;
            position: relative;
            color: $secondary;
            padding: 10px 0px;

            span {
                color: $secondary;
                font-size: 20px;
                margin-top: 2px;
                display: block;
            }

            .backbutton {
                position: absolute;
                top: 50%;
                left: 0;
                border: none;
                outline: none;
                background: transparent;
                line-height: 0;
                color: $secondary;
                transform: translateY(-50%);

                svg {
                    fill: $secondary;
                }
            }

            .search-button {
                position: absolute;
                top: 50%;
                right: 0;
                border: none;
                outline: none;
                background: transparent;
                line-height: 0;
                color: $secondary;
                transform: translateY(-50%);

                i {
                    font-size: 20px;
                }
            }
        }
    }

    &--navigation {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 70px;
        background: transparent;
        // box-shadow: 0 -5px 20px 0 rgba(black, .10);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding: 0px;
        z-index: 50000;

        &--list {
            display: flex;
            align-items: center;
            justify-content: center;
            list-style: none;
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;

            &--item {
                display: flex;
                height: 100%;
                align-items: stretch;
                justify-content: center;
                padding: 0;
                background: $primary;
                width: calc(100% - 50px);
                position: relative;
                z-index: 20;

                button {
                    background: transparent;
                    line-height: 0;
                    border: none;
                    box-shadow: none;
                    outline: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0px 15px;

                    i {
                        margin: 0;
                        color: $secondary;
                        line-height: 0;
                        font-size: 20px;
                    }
                }

                &:not(.fab) {
                    button.active {
                        position: relative;

                        &:before {
                            content: "";
                            display: block;
                            width: 100%;
                            height: 5px;
                            background: $secondary;
                            top: 0;
                            right: 0;
                            position: absolute;
                            transition: all ease-in-out 300ms;
                        }
                    }
                }

                &.fab {
                    position: relative;
                    width: 50px;
                    background: transparent;
                    z-index: 10;

                    button {
                        position: relative;
                        z-index: 2;
                        top: -25px;
                        background: $primary;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        i {
                            font-size: 20px;
                            color: $secondary;
                            position: relative;
                            z-index: 2;
                        }

                        small {
                            position: absolute;
                            top: -5px;
                            right: -5px;
                            background: $secondary;
                            color: $primary;
                            width: 25px;
                            height: 25px;
                            border-radius: 500px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 15px;
                            font-weight: 900;
                            padding-top: 3px;
                        }
                    }

                    &:before,
                    &:after {
                        content: "";
                        position: absolute;
                    }

                    &:before {
                        background: transparent;
                        width: 125%;
                        height: 50%;
                        margin: 0 auto;
                        border-bottom-right-radius: 100px;
                        border-bottom-left-radius: 100px;
                        z-index: 1;
                        box-shadow: 0 29px 0px 13px $primary;
                    }

                    &:after {
                        background: $primary;
                        width: 100%;
                        height: 20%;
                        bottom: 0;
                        left: 0;
                    }
                }

                &.fab--right {
                    border-top-left-radius: 30px;
                }

                &.fab--left {
                    border-top-right-radius: 30px;
                }
            }
        }
    }

    &--ios {
        .page--toolbar {
            padding: 10px 10px;

            h1 {
                padding-top: 5px;
            }
        }
    }

    &--android {
        .page--toolbar {
            padding: 10px 10px;

            h1 {
                padding-top: 5px;
            }
        }
    }

    &--android,
    &--ios {
        .page--navigation--list {
            &--item {
                &.fab {
                    button {
                        padding-top: 5px;
                    }
                }

                button {
                    padding-top: 3px;
                }
            }
        }
    }
}
</style>
