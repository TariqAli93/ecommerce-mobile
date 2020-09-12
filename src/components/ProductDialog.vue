<template>
<div class="dialog">
    <div class="product--dialog" :class="{'open' : $store.state.product_dialog}" v-hammer:swipe.right="(event) => onSwipe(event)">
        <div class="product--dialog--container">
            <div class="product--dialog--container--cover">
                <img :src="server + '/attachment/' + product_info.image" />
                <button class="product--dialog--container--cover--btn" @click="$store.state.product_dialog = false;">
                    <i class="im im-x-mark"></i>
                </button>

                <button class="product--dialog--container--cover--favorite" @click="likeProduct(product_info)">
                    <i class="im im-heart"></i>
                </button>
            </div>

            <div class="product--dialog--container--content">
                <div class="product--dialog--container--content--name">
                    <h2>{{ product_info.productName }}</h2>
                </div>

                <div class="product--dialog--container--content--price">
                    <p>${{ product_info.price }}</p>
                </div>

                <div class="product--dialog--container--content--description">
                    <p>{{ product_info.description }}</p>
                </div>

                <div class="product--dialog--container--content--control" @click="save_product(product_info)">
                    <button class="product--dialog--container--content--control--btn">
                        <span>اطلب الان</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import server from '../plugins/server'
export default {
    props: {
        product_info: {
            type: Object,
            required: true,
            default: []
        }
    },
    data() {
        return {
            server: server,
            isOpen: false
        }
    },

    mounted() {
        
    },

    methods: {
        onSwipe(e) {
            this.$store.dispatch('toggleProductDialog');
        },

        likeProduct(product) {
            this.$store.dispatch('favorite_product', product)
                .then(data => {
                    this.$toast.open({
                        type: 'success',
                        message: 'تم حفظ المنتج',
                        position: 'bottom',
                    })
                })
                .catch(err => {
                    this.$toast.open({
                        type: 'error',
                        message: 'المنتج محفوظ مسبقا',
                        position: 'bottom'
                    })
                })
        },

        save_product(product) {
            this.$store.dispatch('save_product', {
                    product: product,
                    qty: 1
                })
                .then(data => {
                    this.$toast.open({
                        type: 'success',
                        message: 'تم حفظ المنتج في سلة المشتريات',
                        position: 'bottom',
                    })
                })
                .catch(err => {
                    this.$toast.open({
                        type: 'error',
                        message: 'المنتج محفوظ مسبقا',
                        position: 'bottom'
                    })
                })
        }
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.product--dialog {
    position: fixed;
    top: 0px;
    right: 0;
    width: 100%;
    height: calc(100%);
    z-index: 900000;
    background: white;
    overflow: hidden;
    transform: translateX(100%);
    visibility: hidden;
    opacity: 0;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 400ms;

    &.open {
        visibility: visible;
        opacity: 1;
        transform: translateX(0px);
    }

    &--container {
        display: block;
        position: relative;
        height: 100%;

        &--cover {
            display: block;
            height: 350px;
            position: relative;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }

            &--btn {
                position: absolute;
                width: 35px;
                height: 35px;
                background: white;
                top: 10px;
                right: 10px;
                border: none;
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 500px;

                i {
                    margin-top: 3px;
                    font-size: 15px;
                    color: black;
                }
            }

            &--favorite {
                position: absolute;
                width: 60px;
                height: 60px;
                background: lighten(red, 15%);
                bottom: -30px;
                right: 10px;
                border: none;
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 500px;
                box-shadow: 0 2px 10px 0 rgba(black, .10);

                i {
                    margin-top: 3px;
                    font-size: 20px;
                    color: white
                }

                &:focus,
                &:active {
                    background: white;
                    color: lighten(red, 15%);

                    i {
                        color: lighten(red, 15%);
                    }
                }
            }
        }

        &--content {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            padding: 20px;
            padding-top: 30px;
            height: calc(100% - 350px);

            &--name {
                margin-top: 10px;

                h2 {
                    color: $primary;
                    font-size: 30px;
                    font-weight: 900;
                }
            }

            &--price {
                p {
                    font-weight: 400;
                }
            }

            &--description {
                height: 150px;
                overflow: scroll;

                p {
                    display: block;
                    font-weight: 500;
                }
            }

            &--control {
                display: block;
                padding: 0;
                margin-top: 20px;
                width: 100%;

                &--btn {
                    display: block;
                    width: 100%;
                    border: none;
                    outline: none;
                    box-shadow: none;
                    border-radius: 500px;
                    background: $primary;
                    color: $secondary;
                    padding: 10px 20px;
                    padding-top: 12px;
                    transition: all ease-in-out 400ms;

                    span {
                        color: $secondary;
                    }

                    &:hover,
                    &:focus,
                    &:active {
                        box-shadow: 0 5px 20px 0 rgba($primary, .33);
                    }
                }
            }
        }
    }
}

.page--ios {
    .product--dialog--container--cover--btn {
        top: 45px;
    }
}
</style>
