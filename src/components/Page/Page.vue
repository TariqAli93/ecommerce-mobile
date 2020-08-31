<template>
<div :class="className">
    <div v-if="loaded">
        <div class="top_bar" v-if="backbutton">
            <h4>سلة المشتريات</h4>
            <v-btn color="primary" icon @click="$router.go(-1)">
                <i class="im im-arrow-left"></i>
            </v-btn>
        </div>

        <div :class="className + '-container'">
            <v-container v-if="container" :fluid="container">
                <slot></slot>
            </v-container>

            <div v-else>
                <slot></slot>
            </div>
        </div>

        <div v-if="navigation" class="navigation-bottom" ref="navigation">
            <ul class="navigation-bottom-list">
                <li class="navigation-bottom-list-item">
                    <router-link to="/" tag="a" :ripple="true">
                        <i class="im im-home"></i>
                    </router-link>
                </li>
                <li class="navigation-bottom-list-item">
                    <router-link to="/" tag="a" :ripple="true">
                        <i class="im im-user-male"></i>
                    </router-link>
                </li>

                <li class="navigation-bottom-list-item fab">
                    <router-link to="/cart" tag="a" :ripple="true">
                        <span class="badge" v-if="$store.getters.product_count > 0">
                            {{ $store.getters.product_count }}
                        </span>
                        <i class="im im-shopping-cart"></i>
                    </router-link>
                </li>

                <li class="navigation-bottom-list-item">
                    <router-link to="/" tag="a" :ripple="true">
                        <i class="im im-heart"></i>
                    </router-link>
                </li>
                <li class="navigation-bottom-list-item">
                    <router-link to="/" tag="a" :ripple="true">
                        <i class="im im-cubes"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <div v-else>
        <div class="loading-screen">
            <Loading />
        </div>
    </div>
</div>
</template>

<style lang="scss">
$secondary: #EB9486;
$primary:#272838;
$border-radius: 25px;

.loading-screen {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 54000;
    background: $primary;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.top_bar {
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    box-shadow: 0 5px 10px 0 rgba($primary, .08);

    h4 {
        font-size: 20px;
        color: $primary;
    }
}

.navigation-bottom {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 75px;
    padding: 10px;
    background: white;
    box-shadow: 0 -5px 10px 0 rgba($primary, .08);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    z-index: 1000000;

    &-list {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        height: 100%;

        &-item {
            padding: 5px;

            a {
                text-decoration: none;
                color: $primary !important;
                display: block;
                padding: 10px 20px;

                i {
                    font-size: 19px;
                }
            }

            &.fab {
                background: $primary;
                border: 5px solid white;
                color: $primary;
                border-radius: 500px;
                width: 65px;
                height: 65px;
                position: relative;
                top: -25px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;

                a {
                    color: $primary;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    padding: 10px;

                    i {
                        font-size: 25px;
                        color: $secondary;
                    }

                    .badge {
                        position: absolute;
                        background: $secondary;
                        width: 30px;
                        height: 30px;
                        border-radius: 500px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        top: -10px;
                        left: 20px;
                        color: $primary;
                    }
                }
            }
        }
    }
}
</style>

<script>
import Loading from '../Loading'
export default {
    components: {
        Loading
    },
    name: 'Page',
    props: {
        className: {
            type: String,
            default: 'page'
        },

        container: {
            type: Boolean,
            default: false
        },

        wild: {
            type: Boolean,
            default: false
        },

        navigation: {
            type: Boolean,
            default: false
        },

        backbutton: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            loaded: false,
            window_width: '',
        }
    },

    mounted() {
        setTimeout(() => {
            this.loaded = true;
            this.window_width = document.body.clientWidth;
        }, 2000);
    },
}
</script>
