<template>
<div class="loader" :class="{'dark' : dark, 'small': small}">Loading...</div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        dark: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss">
@import '../variables.scss';

.loader,
.loader:before,
.loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
}

.loader {
    color: $secondary;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;

    &.dark {
        color: $primary;
    }

    &.small {
        margin: 10px auto;
        margin-bottom: 40px;
    }
}

.loader:before,
.loader:after {
    content: '';
    position: absolute;
    top: 0;
}

.loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
}

.loader:after {
    left: 3.5em;
}

@-webkit-keyframes load7 {

    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }

    40% {
        box-shadow: 0 2.5em 0 0;
    }
}

@keyframes load7 {

    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }

    40% {
        box-shadow: 0 2.5em 0 0;
    }
}
</style>
