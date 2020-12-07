<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="false" :search="false" className="product" :title="product.name">
    <div class="cover">
        <div class="cover--container">
            <img v-for="(image, index) in images" :key="index" :id="`slide-${index}`" :src="server + '/attachment/' + image.imageUrl" />
        </div>
    </div>

    <div class="content">
        <span class="content--name">{{ product.name }}</span>
        <span class="content--price">${{ product.price }}</span>
        <div class="content--desc">
            <p>{{ product.description }}</p>
        </div>
    </div>

    <div class="control">
        <button class="control--button" @click="save_product(product_for_cart)">
            <i class="im im-shopping-cart"></i>
            <span>السلة</span>
        </button>

        <button class="control--button" @click="favorite_product(product_for_cart)">
            <i class="im im-heart"></i>
            <span>المفضلة</span>
        </button>
    </div>
</MainLayout>
</template>

<script>
import server from '../plugins/server'
import {
    gsap
} from 'gsap'
export default {
    data() {
        return {
            server: server,
            product_id: '',
            product: {
                name: '',
                price: '',
                description: '',
                image: ''
            },
            product_for_cart: [],
            images: [],
            desc_length: 100
        }
    },

    mounted() {
        this.product_id = this.$route.params.id;

        this.axios.get(`product/${this.product_id}`)
            .then((result) => {
                this.product = {
                    id: result.data.idProduct,
                    name: result.data.productName,
                    price: result.data.price,
                    description: result.data.description,
                    image: result.data.image
                };
                this.product_for_cart = result.data;

                this.axios.get(`productImage/${this.product_id}`)
                    .then(data => {
                        if (data.data.length > 0) {
                            this.images = data.data;
                        } else {
                            this.images.push({
                                imageUrl: result.data.image
                            })
                        }
                    }).catch(err => {
                        console.error(err.response)
                    })
            })
    },

    methods: {
        save_product(product) {
            this.$store.dispatch('save_product', {product: product, qty: 1})
            .then(data => {
                this.$toast.open({
                    type: 'success',
                    message: 'تم حفظ المنتج',
                    position: "bottom"
                })
            }).catch(err => {
                this.$toast.open({
                    type: 'error',
                    message: 'المنتج محفوظ مسبقا',
                    position: "bottom"
                })
            })
        },

        favorite_product(product) {
            this.$store.dispatch('favorite_product', product)
            .then(data => {
                this.$toast.open({
                    type: 'success',
                    message: 'تم حفظ المنتج',
                    position: "bottom"
                })
            }).catch(err => {
                this.$toast.open({
                    type: 'error',
                    message: 'المنتج محفوظ مسبقا',
                    position: "bottom"
                })
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.cover {
    width: 100%;
    text-align: center;
    height: 300px;
    position: relative;
    padding: 0px;
    overflow: hidden;
    transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &--container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        overflow-scrolling: touch;
        height: 100%;
        position: relative;

        img {
            scroll-snap-align: start;
            flex-shrink: 0;
            width: 100%;
            height: 100%;
            transform-origin: center center;
            transform: scale(1);
            transition: transform 0.5s;
            position: relative;
            margin-right: 10px;
        }

        &::-webkit-scrollbar {
            width: 1px;
            height: 1px;
        }

        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 0;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }
    }
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    padding-top: 40px;
    height: fit-content;
    background: white;

    &--name {
        align-self: flex-start;
        font-size: 30px;
        position: relative;
        padding-right: 60px;
        color: $primary;

        &:before {
            content: "";
            position: absolute;
            width: 50px;
            height: 2px;
            background: $primary;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &--price {
        align-self: flex-start;
        font-size: 20px;
        position: relative;
        color: $primary;
        margin-bottom: 10px;
    }

    &--desc {
        display: block;
        padding-bottom: 50px;

        p {
            line-height: 1.5;
            text-align: right;
            word-wrap: break-word;
            white-space: pre-wrap;
            line-break: strict;
            padding-bottom: 30px;

            button {
                border: none;
                outline: none;
                background: transparent;
                color: $primary;
                font-weight: 900;
            }
        }
    }
}

.control {
    display: flex;
    align-items: stretch;
    justify-content: center;
    background: transparent;
    padding: 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;

    &--button {
        background: $primary;
        color: $secondary;
        border-radius: 0px;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 20px;
        width: 100%;
        flex: 0 0 50%;

        i {
            font-size: 15px;
            margin-left: 10px;
        }

        span {
            font-size: 17px;
        }

        &:last-child {
            background: $secondary;
            color: $primary;
        }
    }
}
</style>
