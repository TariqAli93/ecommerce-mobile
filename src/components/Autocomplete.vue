<script>
export default {
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
        isAsync: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    data() {
        return {
            isOpen: false,
            results: [],
            search: '',
            isLoading: false,
            arrowCounter: 0,
        };
    },

    methods: {
        onChange() {
            // Let's warn the parent that a change was made
            this.$emit('input', this.search);

            // Is the data given by an outside ajax request?
            if (this.isAsync) {
                this.isLoading = true;
            } else {
                // Let's  our flat array
                this.filterResults();
                this.isOpen = true;
            }
        },

        filterResults() {
            this.results = this.items.filter((item) => {
                return item.productName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        setResult(result, id) {
            this.search = result;
            this.isOpen = false;
            this.$router.push({path: `/product/${id}`})
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        }
    },
    watch: {
        items: function (val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.results = val;
                this.isLoading = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    }
};
</script>

<template>
<div class="autocomplete">
    <div class="autocomplete-inner">
        <input type="text" placeholder="هل تبحث عن منتج" @input="onChange" v-model="search" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" />
        <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li v-else v-for="(result, i) in results" :key="i" :to="`/product/${result.idProduct}`" @click="setResult(result.productName, result.idProduct)" :tabindex="i" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
                {{ result.productName }}
            </li>
        </ul>
    </div>
</div>
</template>

<style lang="scss">
@import '../variables.scss';
.autocomplete {
    position: relative;
    background: transparent;
    height: fit-content;
    display: block;
    width: 100%;
    height: 50px;
    z-index: 200;

    &-inner {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 0;
        height: fit-content;
        background: darken($primary, 10%);
        border-radius: 5px;
        box-shadow: 0 2px 10px 0 rgba(black, .10);
        max-height: 300px;
        overflow-y: scroll;

        input {
            border: none;
            outline: none;
            box-shadow: none;
            display: block;
            width: 100%;
            padding: 17px 10px;
            position: sticky;
            top: 0;
            z-index: 1;
            background: darken($primary, 5%);
            color: $secondary;

            &:focus,
            &:hover,
            &:active {
                background: lighten($primary, 10);
            }
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                display: block;
                padding: 15px 5px;
                background: lighten($primary, 10);
                color: $secondary;

                &:not(:last-child) {
                    border-bottom: 1px solid rgba(white, .10);
                }

                &:first-child {
                    border-top: 1px solid rgba(white, .10);
                }
            }
        }
    }
}
</style>
