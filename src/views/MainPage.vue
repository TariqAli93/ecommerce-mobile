<template>
<MainLayout :toolbar="false" :backbutton="false" :navigation="true" title="Page" className="home">
    <div class="header">
        <div class="title">
            <h1 class="secondary--text">المتجر العراقي</h1>
        </div>

        <div class="search">
            <Autocomplete :items="products" :border="true" />
        </div>
    </div>

    <div class="categories">
        <ul>
            <li v-for="category in categories" :key="category.idCategory">
                <router-link tag="button" :to="`/productsCategory/${category.idCategory}/${category.categoryName}`" exact exact-active-class="active">{{category.categoryName}}</router-link>
            </li>
        </ul>
    </div>

    <div class="products mt">
        <div class="products--title">
            <span class="products--title--text">المنتجات الجديدة</span>

            <div class="products--title--next">
                <button @click="showMoreProduct('productsStatus', new_products[0].statusId)">
                    <span>عرض المزيد</span>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="products--container">
            <div class="products--container--row">
                <div class="products--container--row--col" v-for="product in new_products" :key="product.idProduct">
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

    <div class="products mt-lg">
        <div class="products--title">
            <span class="products--title--text">افضل الاسعار</span>

            <div class="products--title--next">
                <button @click="showMoreProduct('productsStatus', best_products[0].statusId)">
                    <span>عرض المزيد</span>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="products--container">
            <div class="products--container--row">
                <div class="products--container--row--col" v-for="product in best_products" :key="product.idProduct">
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

    <div class="products mb mt-lg">
        <div class="products--title">
            <span class="products--title--text">جميع المنتجات</span>

            <div class="products--title--next">
                <router-link tag="button" to="/products">
                    <span>عرض المزيد</span>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                    </svg>
                </router-link>
            </div>
        </div>

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

    <ProductDialog :open="openProductDialog" :product_info="product_info" />
</MainLayout>
</template>

<script>
import Autocomplete from '../components/Autocomplete'
import server from '../plugins/server'
export default {
    components: {
        Autocomplete
    },

    data() {
        return {
            openProductDialog: false,
            products: [],
            new_products: [],
            best_products: [],
            product_info: {},
            server: server,
            categories: []
        }
    },

    mounted() {
        this.axios.get('products')
            .then(data => {
                this.new_products = data.data.filter(product => {
                    return product.idStatus === 1
                }).slice(0, 2);

                this.best_products = data.data.filter(product => {
                    return product.idStatus === 3
                }).slice(0, 2);

                this.products = data.data.slice(0, 4);

                console.log(data.data)
            })
            .catch(err => {
                console.error(err)
            });

        this.axios.get('categories')
        .then(data => {
            this.categories = data.data;
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

        goToProductCategory(id, name) {
            this.$router.push({path: '/productsCategory', params: {id: id }});
        },

        showMoreProduct(page, id) {
            this.$router.push({path: `/${page}/${id}`})
        },
    },
}
</script>

<style lang="scss">
@import '../variables.scss';

.header {
    background: $primary;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 10px;
    padding-top: 40px;

    .title {
        display: block;
        margin-bottom: 30px;
        font-size: 5vw;
        font-weight: 900;
    }

    .search {
        display: block;
        width: 100%;
        margin-bottom: 10px;
    }
}

.categories {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: fit-content;
    flex-direction: column;
    background: $secondary;
    width: 100%;
    position: relative;
    direction: rtl;
    padding: 0px 10px;
    overflow-x: scroll;
    color: $primary;
    width: 100vw;

    h4 {
        padding: 20px 10px 0px 10px;
        font-weight: 900;
        color: $primary;
        position: sticky;
        right: 0;
    }

    ul {
        overflow: auto;
        white-space: nowrap;
        direction: rtl;
        margin: 0;
        padding: 10px;
        overflow-x: scroll;

        li {
            display: inline-block;
            right: 0;

            &:not(:last-child),
            &:not(:first-child) {
                margin: 0 10px;
            }

            &:first-child {
                margin: 0;
                margin-left: 10px;
            }

            &:last-child {
                margin: 0;
                margin-right: 10px;
            }

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                line-height: 0;
                color: $secondary;
                min-width: 60px;
                min-height: 30px;
                padding: 20px 30px;
                background: $primary;
                border-radius: 300px;
                outline: none;
                border: none;
                box-shadow: 0 2px 4px 0 rgba(black, .10);

                &:hover,
                &:focus,
                &:active {
                    background: $primary;
                    color: $secondary;
                }
            }
        }
    }
}

.products {
    display: block;

    &.mb {
        margin-bottom: 120px;
    }

    &.mt {
        margin-top: 10px;
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
            color: $primary;

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
                    color: $primary;
                }

                svg {
                    display: block;
                    width: 20px;
                    fill: $primary;
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
                        background: lighten($primary, 30%);
                        bottom: -10px;
                        border-radius: 5px;
                    }

                    &::before {
                        width: 80%;
                        bottom: -20px;
                        background: lighten($primary, 40%);
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

.page--ios {
    .header {
        .title {
            padding-top: 50px;
        }
    }
}

.page--android,
.page--ios {
    .categories {
        ul {
            li {
                button {
                    padding-top: 25px;
                }
            }
        }
    }
}
</style>
