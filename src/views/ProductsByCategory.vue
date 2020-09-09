<template>
<MainLayout :navigation="true" :toolbar="true" :backbutton="true" :title="title" className="products--category">
    <div class="search--box" :class="{'open': $store.state.showSearchBox}">
        <input type="text" v-model="search_input" class="search--box--input" placeholder="بحث في المنتجات">
    </div>

    <div class="products mb mt" v-if="products.length > 0">
        <div class="products--container">
            <div class="products--container--row" v-if="filterProducts.length > 0">
                <div class="products--container--row--col" v-for="product in filterProducts" :key="product.idProduct">
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

            <div class="alert primary" v-else>
                <span class="secondary--text">لم يتم العثور على نتائج</span>
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
            product_info: {},
            search_input: '',
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
        },

        filterProducts() {
            return this.products.filter(product => {
                return product.productName.toLowerCase().includes(this.search_input.toLowerCase());
            });
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

.search--box {
    position: relative;
    width: 100%;
    height: 0;
    background: $secondary;
    margin-bottom: 0;
    visibility: hidden;
    opacity: 0;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) all 400ms;

    &.open {
        visibility: visible;
        opacity: 1;
        height: 50px;
        margin-bottom: 20px;
    }

    input {
        display: block;
        padding: 20px;
        color: $primary;
        background: transparent;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        box-shadow: none;
        border-radius: 5px;
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
}
</style>
