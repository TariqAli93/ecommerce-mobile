<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="true" :search="true" title="التصنيفات" className="categories">
    <div class="search--box" :class="{'open': $store.state.showSearchBox}">
        <input type="text" v-model="search_input" class="search--box--input" placeholder="بحث في التصنيفات">
    </div>
    <div class="categories--container">
        <div class="categories--container--item" v-for="(category, index) in categories" :key="category.idCategory" @click="goToCategory(category.idCategory, category.categoryName)">
            <i class="im im-cubes"></i>
            <h1>{{ category.categoryName }}</h1>
        </div>
    </div>
</MainLayout>
</template>

<script>
export default {
    data() {
        return {
            colors: [],
            categories: [],
            search_input: ''
        }
    },

    mounted() {
        this.axios.get('categories')
            .then(data => {
                this.generateColors(data.data.length + 1);
                this.categories = data.data;
            })
            .catch(err => {
                console.error(err);
            });
    },

    methods: {
        generateColors(count = 1) {
            for (let i = 1; i < count; i++) {
                let color = Math.floor(Math.random() * 16777215).toString(16);
                this.colors.push(color);
            }
        },

        searchQuery(query) {
            this.categories.filter(category => {
                return category.categoryName === query.toLowerCase()
            })
        },

        goToCategory(id, name) {
            console.log(this.$route)
            this.$router.push({
                path: `/productsCategory/${id}/${name}`
            })
        }
    },

    computed: {
        setBg() {
            return this.colors.map(color => {
                return color
            })
        }
    },

    watch: {
        search_input() {

        }
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.categories--container {
    display: grid;
    grid-row: 1fr;
    grid-row-gap: 10px;
    padding: 10px;
    margin-bottom: 110px;

    &--item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 110px;
        border-radius: 5px;
        color: white;
        position: relative;

        h1 {
            font-size: calc(100% / 2 * 2);
        }

        i {
            font-size: 40px;
            position: absolute;
            top: 50%;
            left: 30px;
            opacity: .2;
            transform: translateY(-50%);
        }

        &:nth-child(even) {
            background: $primary;
            color: $secondary;

            i {
                color: $secondary;
            }
        }

        &:nth-child(odd) {
            background: $secondary;
            color: $primary;

            i {
                color: $primary;
                right: 30px;
            }
        }
    }
}
</style>
