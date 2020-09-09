<template>
<MainLayout :navigation="true" :toolbar="true" :backbutton="true" :title="title" className="products--category">
    <div class="products mb mt" v-if="products.length > 0">
        <div class="products--container">
            <div class="products--container--row">
                <div class="products--container--row--col" v-for="product in products" :key="product.idProduct">
                    <div class="products--container--row--col--card" @click="openCard(product)">
                        <img :src="server + '/attachment/' + product.image" />
                        <div class="products--container--row--col--card--content">
                            <h5>{{ product.productName }}</h5>
                            <span>{{ product.categoryName }}</span>
                            <small>$ {{ product.price }} </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="empty" v-else>
        <img src="../assets/images/empty-bag-bg.png" />
        <span>لا يتوفر هذا التصنيف على اي منتج</span>
        <router-link tag="button" to="/">
            <span>العودة الى الرئيسية</span>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
            </svg>
        </router-link>
    </div>

    <ProductDialog :product_info="product_info" />
</MainLayout>
</template>

<script>
import server from '../plugins/server'
export default {
    data() {
        return {
            products: [],
            title: '',
            server: server,
            openProductDialog: false,
            product_info: {}
        }
    },

    mounted() {
        this.title = this.$route.params.name;
        this.axios.get(`productCategory/${this.$route.params.id}`)
            .then(data => {
                this.products = data.data;
            })
            .catch(err => {
                console.log(err)
            });
    },

    methods: {
        openCard(product) {
            this.$store.dispatch('toggleProductDialog');
            this.product_info = product;
        },
    },

    computed: {
        toggleDialog() {
            return this.openProductDialog = !this.openProductDialog
        }
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.page--products--category {
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

.products {
    display: block;

    &.mb {
        margin-bottom: 140px;
    }

    &.mt {
        margin-top: 20px;
    }

    &.mt-lg {
        margin-top: 30px;
    }

    &--title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 12px;

        &--text {
            position: relative;
            padding-right: 40px;
            margin: 0;

            &:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 1px;
                right: 0px;
                top: 49%;
                background: $primary;
                transform: translateY(-49%);
            }
        }

        &--next {
            display: flex;
            align-items: center;
            justify-content: center;
            color: $primary;

            button {
                border: none;
                outline: none;
                box-shadow: none;
                line-height: 0;
                margin-right: 10px;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    margin-left: 10px;
                }

                img {
                    display: block;
                    width: 20px;
                }
            }
        }
    }

    &--container {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding: 0px 10px;

        &--row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 50px 10px;

            &--col {
                &--card {
                    background: $primary;
                    position: relative;
                    border-radius: 5px;
                    top: 0;
                    right: 0;
                    transform: translateY(0px);
                    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 300ms;

                    &>* {
                        transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 300ms;
                    }

                    &::before,
                    &::after {
                        content: "";
                        position: absolute;
                        width: 90%;
                        height: 90%;
                        left: 0;
                        right: 0;
                        margin: auto;
                        background: lighten($primary, 71%);
                        bottom: -10px;
                        border-radius: 5px;
                    }

                    &::before {
                        width: 80%;
                        bottom: -20px;
                        background: lighten($primary, 74%);
                    }

                    &--btn {
                        display: none
                    }

                    &--favorite {
                        display: none;
                    }

                    img {
                        display: block;
                        min-height: 260px;
                        max-height: 260px;
                        height: 100%;
                        width: 100%;
                        border-radius: 5px;
                        position: relative;
                        z-index: 9;
                    }

                    &--content {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        padding: 20px 10px;
                        bottom: 0;
                        right: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-end;
                        color: $secondary;
                        z-index: 10;
                        background: rgba($primary, .33);
                        background: rgb(0, 0, 0);
                        background: linear-gradient(0deg, rgba(0, 0, 0, 0.6898109585631127) 0%, rgba(255, 255, 255, 0) 100%);
                        border-radius: 5px;

                        &--btn {
                            display: none;
                        }

                        h5 {
                            color: $secondary;
                            font-weight: 700;
                            position: relative;
                            margin: 0;
                            text-align: center;
                            display: block;
                            width: 100%;
                            font-size: 20px;
                        }

                        span {
                            color: $secondary;
                            font-weight: 400;
                            font-size: 13px;
                            text-align: center;
                            display: block;
                            width: 100%;
                        }

                        small {
                            color: $secondary;
                            font-weight: 200;
                            text-align: center;
                            display: block;
                            width: 100%;
                        }

                        p {
                            display: none;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
