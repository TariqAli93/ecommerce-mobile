<template>
<main>
    <ServerStatus v-if="!isConnected"/>

    <div class="MainActivity" v-else>
        <div class="loading--screen" v-if="isLoading">
            <Loading />
        </div>
        <router-view v-else />
    </div>
</main>
</template>

<script>
import Loading from '@/components/Loading'
import ServerStatus from '@/components/ServerStatus'
import { Plugins } from '@capacitor/core'
const { Network } = Plugins
export default {
    components: {
        Loading,
        ServerStatus
    },
    data() {
        return {
            isLoading: true,
            isConnected: false
        }
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 2000);

        Network.getStatus().then(data => {
            if(data.connected === true) {
                this.isConnected = true
            } else {
                this.isConnected = false
            }
        });

        Network.addListener('networkStatusChange', (status) => {
            if(status.connected === true) {
                this.isConnected = true
            } else {
                this.isConnected = false
            }
        })
    },

    watch: {
        '$route'(to, from) {
            this.isLoading = true;

            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        }
    },

    computed: {}
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