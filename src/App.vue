<template>
<main>
    <div class="loading--screen" v-if="isLoading">
        <Loading />
    </div>
    <router-view />
</main>
</template>

<script>
import Loading from '@/components/Loading'
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: true
        }
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 2000);
    },

    watch: {
        '$route'(to, from) {
            this.isLoading = true;

            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        }
    },
};
</script>

<style lang="scss">
@import './variables.scss';

.loading--screen {
    position: fixed;
    z-index: 15000000;
    background: $primary;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>