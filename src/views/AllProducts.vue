<template>
<MainLayout :navigation="true" :toolbar="true" :backbutton="true" :title="title" className="products-status">
    <div class="search--box" :class="{'open': $store.state.showSearchBox}">
        <input type="text" v-model="search_input" class="search--box--input" placeholder="بحث في المنتجات">
    </div>

    <div class="products mb mt">
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

    <ProductDialog :product_info="product_info" />
</MainLayout>
</template>

<script>
import server from '../plugins/server'
export default {
    data() {
        return {
            products: [],
            title: 'جميع المنتجات',
            server: server,
            openProductDialog: false,
            product_info: {},
            search_input: '',
        }
    },

    mounted() {
        this.axios.get('products')
            .then(data => {
                this.products = data.data;
            })
            .catch(err => {
                console.error(err)
            })
    },

    methods: {
        openCard(product) {
            this.$store.state.product_dialog = true;
            this.product_info = product;
        },
    },

    computed: {
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

.search--box {
    position: relative;
    width: 100%;
    height: 0;
    background: $secondary;
    margin-bottom: 20px;
    visibility: hidden;
    opacity: 0;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) all 400ms;

    &.open {
        visibility: visible;
        opacity: 1;
        height: 50px;
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

    .alert {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }

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
