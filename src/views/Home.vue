<template>
<Page className="home" :navigation="true">
    <div class="header">
        <v-container fluid>
            <h1>المتجر العراقي</h1>
            <v-autocomplete class="search_wrap" v-model="search_model" flat dark :items="search_items" :search-input.sync="search_input" item-text="productName" item-value="idProduct" :loading="search_loading" hide-details solo-inverted clearable placeholder="هل تبحث عن منتج؟" append-icon=""></v-autocomplete>
            <div class="categories">
                <ul class="categories-list">
                    <li>
                        <router-link to="/" tag="a" exact-active-class="active" exact>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-.569 6.134v4.96l-4.25-2.421v-5.134l4.25 2.595zm-5.83 14.842l-4.421-2.539v-5.176l4.421 2.595v5.12zm-3.773-8.702l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm10.586 5.115l-4.722-2.757v-5.116l4.722 2.754v5.119zm-4.074-8.861l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z" />
                            </svg>
                            <span>الكل</span>
                        </router-link>
                    </li>

                    <li v-for="category in categories" :key="category.idCategory">
                        <router-link :to="`category/${category.idCategory}`" tag="a" exact-active-class="active" exact>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-.569 6.134v4.96l-4.25-2.421v-5.134l4.25 2.595zm-5.83 14.842l-4.421-2.539v-5.176l4.421 2.595v5.12zm-3.773-8.702l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm10.586 5.115l-4.722-2.757v-5.116l4.722 2.754v5.119zm-4.074-8.861l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z" />
                            </svg>
                            <span>{{ category.categoryName }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </v-container>
    </div>

    <v-container fluid>
        <div class="custom-carousel">
            <v-carousel :show-arrows="false" cycle continuous hide-delimiter-background delimiter-icon="fa-minus" progress progress-color="secondary" vertical vertical-delimiters>
                <v-carousel-item v-for="(item,i) in carousel" :key="i" :src="`${server}/attachment/${item.image}`"></v-carousel-item>
            </v-carousel>
        </div>
    </v-container>

    <v-container>
        <div class="section-title">
            <h1><span>احدث المنتجات</span></h1>
        </div>
        <v-row>
            <v-col v-for="product in newProducts" :key="product.idProducts" cols="12">
                <div class="spacer small"></div>
                <div class="card large">
                    <div class="img">
                        <div class="p-btn">
                            <v-btn icon color="secondary" class="ml-3" @click="addFavorite(product)">
                                <v-icon>fa-heart-o</v-icon>
                            </v-btn>

                            <v-btn icon color="secondary" :to="`/product/${product.idProduct}`">
                                <v-icon>fa-eye</v-icon>
                            </v-btn>
                        </div>
                        <img :src="`${server}/attachment/${product.image}`">
                    </div>
                    <div class="content">
                        <h1>{{ product.productName.substr(0, 10) + '...' }}</h1>
                        <p><span>$</span><span>{{ product.price }}</span></p>
                    </div>
                    <div class="footer">
                        <v-btn color="primary" block rounded depressed dark :disabled="product.quantity < 1" @click="bay_product(product)">
                            <span v-if="product.quantity > 0">اضافة الى السلة</span>
                            <span v-else>المنتج غير متوفر</span>
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <div class="section-title">
            <h1><span>جميع المنتجات</span></h1>
        </div>
        <v-row>
            <v-col v-for="product in products" :key="product.idProducts" cols="6">
                <div class="spacer small"></div>
                <div class="card">
                    <div class="img">
                        <div class="p-btn">
                            <v-btn icon color="secondary" class="ml-3" @click="addFavorite(product)">
                                <v-icon>fa-heart-o</v-icon>
                            </v-btn>

                            <v-btn icon color="secondary" :to="`/product/${product.idProduct}`">
                                <v-icon>fa-eye</v-icon>
                            </v-btn>
                        </div>
                        <img :src="`${server}/attachment/${product.image}`">
                    </div>
                    <div class="content">
                        <h1>{{ product.productName.substr(0, 10) + '...' }}</h1>
                        <p><span>$</span><span>{{ product.price }}</span></p>
                    </div>
                    <div class="footer">
                        <v-btn color="primary" block rounded depressed dark :disabled="product.quantity < 1" @click="bay_product(product)">
                            <span v-if="product.quantity > 0">اضافة الى السلة</span>
                            <span v-else>المنتج غير متوفر</span>
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>

        <div v-if="productToShowLoading">
            <Loading :dark="true" :small="true" />
        </div>
        <v-btn v-else color="primary" rounded depressed dark style="margin: 20px auto 10px auto; display: block" id="showMoreBtn" @click="showMoreProduct()">
            <v-icon size="15" class="ml-3">fa-plus</v-icon>
            عرض المزيد
        </v-btn>
    </v-container>
</Page>
</template>

<style lang="scss">
$secondary: #EB9486;
$primary:#272838;
$carousel_shadow_1: darken(white, 11%);
$carousel_shadow_2: darken(white, 8%);
$carousel_shadow_3: darken(white, 5%);
$border-radius: 25px;

.home-container {
    margin-bottom: 85px;
}

.header {
    background: $primary;
    display: block;
    padding: 10px 0px;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;

    .search_wrap {
        border-radius: $border-radius;
    }

    h1 {
        display: block;
        font-size: 35px;
        color: $secondary;
        margin-bottom: 20px;
        font-weight: 900;
    }

    .search_wrap {
        margin-bottom: 10px !important;
    }

    .categories {
        position: relative;
        overflow-x: scroll;
        height: 60px;

        &-list {
            display: inline-flex;
            list-style: none;
            position: absolute;
            right: 0;
            bottom: 0;

            li {
                display: flex;
                align-items: stretch;
                justify-content: center;
                min-width: 170px;
                color: white;

                a {
                    color: rgba($secondary, .50);
                    display: flex;
                    width: 100%;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    padding: 10px;
                    border: 1px solid rgba($secondary, .50);
                    margin-left: 10px;
                    border-radius: $border-radius;

                    span {
                        color: rgba($secondary, .50);
                        ;
                    }

                    svg {
                        fill: rgba($secondary, .50);
                        margin-left: 5px;
                    }

                    &.active {
                        background: $secondary;

                        span {
                            color: $primary;
                        }

                        svg {
                            fill: $primary;
                        }
                    }
                }
            }
        }
    }
}

.custom-carousel {
    max-height: 400px;
    border-radius: $border-radius;
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;

    &::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -10px;
        background: $carousel_shadow_1;
        z-index: -1;
        border-radius: $border-radius;
    }

    &::after {
        content: "";
        position: absolute;
        width: 80%;
        height: 80%;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -20px;
        background: $carousel_shadow_2;
        z-index: -2;
        border-radius: $border-radius;
    }

    .v-carousel {
        max-height: 100% !important;
        height: 400px !important;
        border-radius: $border-radius;
    }
}

.section-title {
    position: relative;
    display: block;

    h1 {
        span {
            color: $primary;
            position: relative;
            display: inline-block;

            &:before {
                z-index: -1;
                background: $secondary;
                display: block;
                content: "";
                position: absolute;
                bottom: 0px;
                left: 0px;
                width: 100%;
                height: 50%;
            }
        }
    }

}

.spacer {
    height: 120px;

    &.small {
        height: 135px !important;
    }
}

.card {
    display: block;
    background: white;
    position: relative;
    padding: 10px;
    border-radius: $border-radius;
    box-shadow: 0 5px 10px 0 rgba($primary, .20);

    &::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -10px;
        background: darken(white, 10%);
        z-index: -1;
        border-radius: 25px;
    }

    &::after {
        content: "";
        position: absolute;
        width: 80%;
        height: 80%;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -20px;
        background: darken(white, 8%);
        z-index: -2;
        border-radius: $border-radius;
    }

    .img {
        display: block;
        position: absolute;
        width: 95%;
        left: 0;
        right: 0;
        height: 150px;
        margin: 0 auto;
        border-radius: $border-radius;
        border: 5px solid white;
        overflow: hidden;
        top: -93px;

        .p-btn {
            position: absolute;
            top: 10px;
            right: 10px;

            .v-btn {
                color: white;
                background: white;
            }
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .content {
        display: block;
        text-align: center;
        color: $primary;
        padding: 5px 0px;
        padding-top: 50px;

        h1 {
            font-size: 14px;
            font-weight: 800;
            display: block;
            margin: 0 auto;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        p {
            font-size: 12px;
            font-weight: 300;
        }
    }

    .footer {
        span {
            color: $secondary;
        }
    }

    &.large {
        .img {
            height: 250px;
            top: -115px;
        }

        .content {
            padding-top: 135px;
        }
    }
}

#showMoreBtn {
    color: $secondary;
}
</style>

<script>
import Loading from '../components/Loading'
import Page from '@/components/Page/Page'
import server from '../plugins/server'
export default {
    components: {
        Page,
        Loading
    },
    data() {
        return {
            search_items: [],
            search_products: [],
            search_model: null,
            search_input: null,
            search_loading: false,
            categories: [],
            products: [],
            newProducts: [],
            carousel: [],
            server: server,
            productToShow: 4,
            productToShowLoading: false
        }
    },

    watch: {
        search_input(val) {
            val && this.searchQuery(val)
        }
    },

    mounted() {
        this.queryAxios('products', 'get')
            .then(data => {
                this.search_products = data.data;
                this.products = data.data.slice(0, this.productToShow);
                this.carousel = data.data;
                this.newProducts = data.data.filter(product => {
                    return product.idStatus === 1
                });
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            });

        this.queryAxios('categories', 'get')
            .then(data => {
                this.categories = data.data
            })
            .catch(err => {
                console.error(err);
            });
    },

    methods: {
        showMoreProduct() {
            this.productToShowLoading = true;
            setTimeout(() => {
                if (this.productToShow > this.products.length) {
                    this.$toast.open({
                        type: 'warning',
                        message: 'لا يوجد اي منتجات اخرى',
                        position: 'top'
                    })
                }
                this.productToShowLoading = false;
                this.productToShow += 4;
                this.queryAxios('products', 'get').then(data => {
                    this.products = data.data.slice(0, this.productToShow)
                }).catch(err => {
                    console.error(err)
                });
            }, 2000);
        },

        searchQuery(v) {
            this.search_loading = true;
            setTimeout(() => {
                this.search_items = this.search_products.filter(e => {
                    return (e.productName || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                });

                this.search_loading = false;
            }, 2500);
        },

        queryAxios(api, method, data = null) {
            let self = this;
            return new Promise((resolve, reject) => {
                switch (method) {
                    case 'post':
                        self.axios.post(api, data)
                            .then(data => {
                                resolve(data)
                            }).catch(err => {
                                reject(err)
                            })
                        break;
                    case 'get':
                        self.axios.get(api)
                            .then(data => {
                                resolve(data)
                            }).catch(err => {
                                reject(err)
                            })
                        break;
                }
            })
        },

        addFavorite(product) {
            this.$toast.clear();
            this.$store.dispatch('favorite_product', product)
                .then(data => {
                    this.$toast.open({
                        type: 'success',
                        message: 'تم اضافة المنتج للمفضلة',
                        position: 'top'
                    });
                })
                .catch(err => {
                    this.$toast.open({
                        type: 'error',
                        message: 'المنتح موجود مسبقا',
                        position: 'top'
                    });
                })
        },

        bay_product(product) {
            let object = {
                product: product,
                qty: 1
            };
            this.$toast.clear();
            this.$store.dispatch('save_product', object)
                .then(data => {
                    this.$toast.open({
                        type: 'success',
                        message: 'تم اضافة المنتج للسلة',
                        position: 'top'
                    });
                })
                .catch(err => {
                    this.$toast.open({
                        type: 'error',
                        message: 'المنتح موجود مسبقا',
                        position: 'top'
                    });
                })
        }
    }
}
</script>
