<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="true" title="المفضلة" className="favorite" :search="false">
    <div class="favorite" v-if="products.length > 0">
        <div class="favorite--list">
            <div class="favorite--list--item" v-for="(product, index) in products" :key="product.idProduct">
                <div class="favorite--list--item--inner" v-hammer:pan.horizontal="(event) => onSwipe(event, index)">
                    <div class="favorite--list--item--inner--img">
                        <img :src="server + '/attachment/' + product.image" />
                    </div>

                    <div class="favorite--list--item--inner--content">
                        <span class="favorite--list--item--inner--content--name">{{ product.productName }}</span>
                        <span class="favorite--list--item--inner--content--price">${{ product.price }}</span>
                    </div>
                </div>

                <div class="favorite--list--item--delete">
                    <button @click="removeItem(index)"><i class="im im-trash-can"></i></button>
                    <button><i class="im im-shopping-cart" @click="save_product(product, index)"></i></button>
                </div>
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

    mounted() {},

    computed: {
        products() {
            return this.$store.getters.favorite_products
        }
    },

    methods: {
        onSwipe(e, i) {
            let inner = document.querySelectorAll('.favorite--list--item--inner');
            let remove = document.querySelectorAll('.favorite--list--item--delete');

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
                inner[i].style.transform = 'translateX(200px)'
                remove[i].style.opacity = 1;
            }

        },
        removeItem(index) {
            let confirm = Modals.confirm({
                title: 'حذف المنتج',
                message: 'هل تريد حف المنتج ؟'
            }).then(data => {
                if (data.value === true) {
                    this.$store.dispatch('remove_from_favorite', index);
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

                let inner = document.querySelectorAll('.favorite--list--item--inner');
                let remove = document.querySelectorAll('.favorite--list--item--delete');

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

        save_product(product, index) {
            this.$store.dispatch('save_product', {
                    product: product,
                    qty: 1
                })
                .then(data => {
                    this.$toast.open({
                        type: 'success',
                        message: 'تم اضافة المنتج الى السلة',
                        position: 'bottom'
                    });
                    setTimeout(() => {
                        this.$store.dispatch('remove_from_favorite', index);
                        this.$toast.open({
                            type: 'success',
                            message: 'تم حذف المنتج من المفضلة',
                            position: 'bottom'
                        });
                    }, 1200)
                }).catch(err => {
                    console.error(err)
                });
        }
    },

}
</script>

<style lang="scss">
@import '../variables.scss';
$trans: cubic-bezier(0.075, 0.82, 0.165, 1) 300ms all;

.page--favorite {
    height: calc(100vh - 90px);
    width: 100%;

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

.favorite {
    display: block;
    padding: 10px;
    margin-bottom: 90px;

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
                width: 200px;
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

                    &.add-button {
                        background: $primary;

                        i {
                            color: $secondary;
                        }
                    }

                    &:nth-child(2) {
                        background: $primary;
                        color: $secondary;

                        i {
                            color: $secondary;
                        }
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
