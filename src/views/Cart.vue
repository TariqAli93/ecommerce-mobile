<template>
<Page className="cart" :navigation="true" :backbutton="true" :container="true">
    <ul class="cart-list" v-if="products.length > 0">
        <div class="total d-flex align-center justify-space-between">
            <span>المجموع: </span>
            <span>${{ total_price }}</span>
        </div>

        <li class="cart-list-item" v-for="(product, index) in products" :key="product.idProduct">
            <div class="cart-list-item-product" v-touch="{left: () =>  openSwiper(index), right: () => closeSwiper(index)}">
                <div class="delete-swipe" @click="removeProduct(index)">
                    <i class="im im-x-mark"></i>
                </div>
                <div class="deleteable">
                    <div class="img">
                        <img :src="server + '/attachment/' + product.product.image">
                    </div>

                    <div class="content">
                        <h1>{{ product.product.productName }}</h1>
                        <p><i class="fa fa-dollar"></i> <span>{{ product.product.price }}</span></p>
                    </div>

                    <div class="control">
                        <span class="control-btn" @click="increaseQty(index)">
                            <i class="im im-arrow-up"></i>
                        </span>
                        <span class="control-number">{{ product.qty }}</span>
                        <span class="control-btn" @click="decreaseQty(index)">
                            <i class="im im-arrow-down"></i>
                        </span>
                    </div>
                </div>
            </div>
        </li>
    </ul>

    <div class="no-data" v-else>
        <img src="../assets/images/empty-bag-bg.png" />
        <p>لا يوجد عناصر في السلة</p>
    </div>
</Page>
</template>

<script>
import Page from '../components/Page/Page'
import server from '../plugins/server'
import {
    Plugins
} from '@capacitor/core';
const {
    Modals
} = Plugins;
export default {
    components: {
        Page
    },

    data() {
        return {
            server: server,
            swipedItem: false,
            confirm: false
        }
    },

    methods: {
        openSwiper(index) {
            let swiper = document.querySelectorAll('.delete-swipe');
            let product = document.querySelectorAll('.cart-list-item-product .deleteable');

            swiper.forEach(swipe => {
                swipe.classList.remove('active');
            });

            product.forEach(list => {
                list.classList.remove('active')
            });

            product[index].classList.add('active');
            swiper[index].classList.add('active');
        },

        closeSwiper(index) {
            let swiper = document.querySelectorAll('.delete-swipe');
            let product = document.querySelectorAll('.cart-list-item-product .deleteable');

            product[index].classList.remove('active');
            swiper[index].classList.remove('active');
        },

        removeProduct(index) {
            let listItem = document.querySelectorAll('.cart-list-item');
            let swiper = document.querySelectorAll('.delete-swipe');
            let product = document.querySelectorAll('.cart-list-item-product .deleteable');
            let confirm = Modals.confirm({
                title: 'حذف المنتج',
                message: 'هل تريد حذف المنتج من السلة؟'
            });

            confirm.then(data => {
                if (data.value === true) {
                    listItem[index].classList.add('hide');
                    setTimeout(() => {
                        this.$store.dispatch('remove_from_cart', index)
                            .then(data => {
                                this.$toast.open({
                                    type: 'success',
                                    message: 'تم حذف المنتج',
                                    position: 'top'
                                })
                                listItem[index].classList.remove('hide');
                                product[index].classList.remove('active');
                                swiper[index].classList.remove('active');
                            }).catch(err => {
                                this.$toast.open({
                                    type: 'error',
                                    message: 'لا يمكن حذف المنتج',
                                    position: 'top'
                                });
                                listItem[index].classList.remove('hide');
                            })
                    }, 700);
                } else {
                    this.$toast.open({
                        type: 'warning',
                        message: 'تم الغاء العملية',
                        position: 'top'
                    });
                    listItem[index].classList.remove('hide');
                    product[index].classList.remove('active');
                    swiper[index].classList.remove('active');
                }
            });

        },

        increaseQty(index) {
            this.$store.dispatch('increase_qty', index);
        },

        decreaseQty(index) {
            this.$store.dispatch('decrease_qty', index);
        }
    },

    computed: {
        products() {
            return this.$store.state.cart
        },

        total_price() {
            return this.$store.getters.total_price;
        },
    }
}
</script>

<style lang="scss">
$secondary: #EB9486;
$primary:#272838;
$border-radius: 10px;
.total {
    padding: 20px 10px;
    background: $primary;
    border-radius: $border-radius;
    color: $secondary;
    margin-bottom: 20px;

    span {
        font-weight: 900;

        &:last-child {
            background: $secondary;
            color: $primary;
            padding: 5PX 20PX;
            border-radius: $border-radius;
        }
    }
}
.no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 150px);
    flex-direction: column;
    padding: 0px 30px;

    img {
        display: block;
        width: 100%;
    }

    p {
        color: $primary;
        font-weight: 900;
        display: block;
        text-align: center;
        padding: 20px 0px;
    }
}

.cart-list {
    display: block !important;
    padding: 20px 0px !important;
    list-style: none !important;
    margin: 0 auto !important;
    margin-bottom: 75px !important;

    &-item {
        display: block;
        padding: 10px 0px;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid rgba($primary, .10);
        transition: cubic-bezier(0.075, 0.82, 0.165, 1) all 700ms;

        &.hide {
            visibility: hidden;
            opacity: 0;
        }

        &-product {
            position: relative;

            .delete-swipe {
                position: absolute;
                top: 0;
                right: 0;
                width: 90px;
                height: 100%;
                background: red;
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 5;
                display: flex;
                align-items: center;
                justify-content: center;
                border-top-right-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
                visibility: hidden;
                opacity: 0;
                transition: cubic-bezier(0.075, 0.82, 0.165, 1) all 500ms;

                span {
                    color: white;
                    margin: 0 10px;
                    order: 2
                }

                i {
                    color: white;
                    order: 1
                }

                &.active {
                    visibility: visible;
                    opacity: 1;
                }
            }

            .deleteable {
                background: #F4F6F8;
                position: relative;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                border-top-right-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
                transition: cubic-bezier(0.075, 0.82, 0.165, 1) all 500ms;

                &.active {
                    transform: translateX(-80px);
                }
            }

            .img {
                display: block;
                width: 160px;
                height: 100px;
                border-radius: $border-radius;
                padding: 0px;
                box-shadow: 0 5px 10px 0 rgba($primary, .10);

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: $border-radius;
                }
            }

            .content {
                display: flex;
                align-items: flex-start;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                padding: 0px 20px;

                h1 {
                    font-size: 15px;
                    font-weight: 900;
                }

                p {
                    margin: 0;
                }
            }

            .control {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                &-btn {
                    color: $primary;

                    i {
                        font-size: 13px;
                    }
                }

                &-number {
                    background: $primary;
                    color: $secondary;
                    border-radius: $border-radius;
                    padding: 10px;
                    min-width: 35px;
                    margin: 10px 0px;
                    text-align: center;
                }
            }
        }
    }
}
</style>
