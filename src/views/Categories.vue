<template>
  <MainLayout :toolbar="true" :backbutton="true" :navigation="true" :search="false" title="التصنيفات" className="categories">
      <div class="categories--container">
          <div class="categories--container--item" v-for="(category, index) in categories" :key="category.idCategory">
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
            categories: []
        }
    },

    mounted() {
        this.axios.get('categories')
        .then(data => {
            this.generateColors(data.data.length+1);
            this.categories = data.data;
        })
        .catch(err => {
            console.error(err);
        });
    },

    methods: {
        generateColors(count = 1) {
            for(let i = 1; i < count; i++) {
                let color = Math.floor(Math.random()*16777215).toString(16);
                this.colors.push(color);
            }
        }
    },

    computed: {
        setBg() {
            return this.colors.map(color => {
                return color
            })
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
        border-radius: 0;
        color: white;

        &:nth-child(even) {
            background: $primary;
            color: $secondary;
        }

        &:nth-child(odd) {
            background: $secondary;
            color: $primary;
        }

        h1 {
            font-size: calc(100% / 2 * 2);
        }
    }
}
</style>