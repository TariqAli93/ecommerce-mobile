<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="true" title="سلة المشتريات" className="cart" :search="false">
    <div class="cart" v-if="products.length > 0">
        <div class="cart--head">
            <span>المجموع</span>
            <span>${{ $store.getters.total_price }}</span>
        </div>

        <div class="cart--list">
            <div class="cart--list--item" v-for="(product, index) in products" :key="product.idProduct">
                <div class="cart--list--item--inner" v-hammer:pan.horizontal="(event) => onSwipe(event, index)">
                    <div class="cart--list--item--inner--img">
                        <img :src="server + '/attachment/' + product.product.image" />
                    </div>

                    <div class="cart--list--item--inner--content">
                        <span class="cart--list--item--inner--content--name">{{ product.product.productName }}</span>
                        <span class="cart--list--item--inner--content--price">${{ product.product.price }}</span>
                    </div>

                    <div class="cart--list--item--inner--quantity">
                        <span class="nmbr">{{ product.qty }}</span>
                        <div class="btns">
                            <span class="btn" @click="$store.dispatch('increase_qty', index)"><i class="im im-arrow-right"></i></span>
                            <span class="btn" @click="$store.dispatch('decrease_qty', index)"><i class="im im-arrow-left"></i></span>
                        </div>
                    </div>
                </div>

                <div class="cart--list--item--delete">
                    <button @click="removeItem(index)">
                        <i class="im im-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="cart--control">
            <div class="cart--control--input">
                <input type="text" placeholder="قسية الخصم">
                <button><i class="im im-check-mark"></i></button>
            </div>
        </div>
    </div>

    <div class="empty" v-else>
        <img src="../assets/images/empty-bag-bg.png" />
        <span>لا يتوفر اي منتج في السلة</span>
        <router-link tag="button" to="/">
            <span>العودة الى الرئيسية</span>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
            </svg>
        </router-link>
    </div>
</MainLayout>
</template>

<script>
import server from '../plugins/server'
import {
    Plugins
} from '@capacitor/core'
const {
    Modals
} = Plugins;

export default {
    data() {
        return {
            server: server
        }
    },
    mounted() {

    },
    computed: {
        products() {
            return this.$store.getters.products
        }
    },
    methods: {
        log(e) {
            console.log(e)
        },

        removeItem(product) {
            let confirm = Modals.confirm({
                title: 'حذف المنتج',
                message: 'هل تريد حف المنتج ؟'
            }).then(data => {
                if (data.value === true) {
                    this.$store.dispatch('remove_from_cart', product);
                    this.$toast.open({
                        type: 'success',
                        message: 'تم حذف المنتج',
                        position: 'bottom'
                    });
                } else {
                    this.$toast.open({
                        type: 'warning',
                        message: 'لم يتم حذف المنتج',
                        position: 'bottom'
                    });
                }

                let inner = document.querySelectorAll('.cart--list--item--inner');
                let remove = document.querySelectorAll('.cart--list--item--delete');

                inner.forEach(item => {
                    item.style.transform = 'translateX(0)';
                });

                remove.forEach(item => {
                    item.style.opacity = 0;
                });
            }).catch(err => {
                console.error(err)
            })
        },

        onSwipe(e, i) {
            let inner = document.querySelectorAll('.cart--list--item--inner');
            let remove = document.querySelectorAll('.cart--list--item--delete');

            inner.forEach(item => {
                item.style.transform = 'translateX(0)';
            });

            remove.forEach(item => {
                item.style.opacity = 0;
            });

            if (e.direction === 2) {
                inner[i].style.transform = 'translateX(0)'
                remove[i].style.opacity = 0;
            } else if (e.direction === 4) {
                inner[i].style.transform = 'translateX(100px)'
                remove[i].style.opacity = 1;
            }

        }
    },
}
</script>

<style lang="scss">
@import '../variables.scss';

$trans: cubic-bezier(0.075, 0.82, 0.165, 1) 300ms all;

.page--cart {
    height: calc(100vh - 90px);

    .page--content {
        height: 100%;
    }
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    padding: 20px;

    img {
        display: block;
        width: 100%;
    }

    span {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: $primary;
        text-align: center;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 3px;
        border: none;
        outline: none;
        box-shadow: none;
        background: transparent;

        span {
            font-size: 13px;
            color: $primary;
        }

        svg {
            fill: $primary;
        }
    }
}

.cart {
    display: block;
    padding: 10px;

    &--head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        border-bottom: 1px solid rgba($primary, .10);
        margin-bottom: 10px;
    }

    &--list {
        display: block;

        &--item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;
            width: 100%;
            position: relative;
            border-bottom: 1px solid rgba($primary, .10);

            &--inner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #F4F6F8;
                width: 100%;
                position: relative;
                z-index: 2;
                touch-action: unset !important;
                user-select: unset !important;
                user-drag: unset !important;
                tap-highlight-color: unset !important;
                transition: $trans;

                &--img {
                    width: 160px;
                    height: 100px;
                    padding: 5px 0;
                    background: transparent;
                    border-radius: 5px;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }

                &--content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    width: 100%;
                    padding: 10px;
                }

                &--quantity {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .nmbr {
                        background: $primary;
                        color: $secondary;
                        border-radius: 5px;
                        width: 60px;
                        height: 40px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-top: 3px;
                    }

                    .btns {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 10px;

                            i {
                                font-size: 18px;
                            }
                        }
                    }
                }
            }

            &--delete {
                position: absolute;
                width: 100px !important;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: $trans;

                button {
                    background: $secondary;
                    border: none;
                    outline: none;
                    display: block;
                    width: 100%;
                    height: 100%;

                    i {
                        color: $primary;
                    }
                }
            }
        }
    }

    &--control {
        height: 70px;
        display: flex;
        background: transparent;
        align-items: stretch;
        justify-content: center;
        position: relative;
        padding: 0;
        margin-bottom: 105px;
        margin-top: 10px;

        &--input {
            display: block;
            width: 100%;
            height: 100%;
            background: $primary;
            border: none;
            outline: none;
            box-shadow: none;
            position: relative;
            border-radius: 10px;

            input {
                display: block;
                width: 100%;
                height: 100%;
                background: $primary;
                color: $secondary;
                padding: 0px 20px;
                border-radius: 10px;
                border: none;
                outline: none;
                box-shadow: none;
            }

            button {
                position: absolute;
                background: $secondary;
                border: none;
                outline: none;
                box-shadow: none;
                border-radius: 10px;
                color: $primary;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    font-size: 14px;
                    margin-top: 3px;
                }
            }
        }
    }
}
</style>
