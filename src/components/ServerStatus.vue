<template>
<div class="server-status">
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <g id="wifi-off" transform="translate(0 -37.821)">
            <path id="Path_1" data-name="Path 1" d="M72.6,143.353c0,7.993-5.584,14.468-12.477,14.468S47.65,151.346,47.65,143.353s5.584-14.467,12.477-14.467S72.6,135.361,72.6,143.353Zm7.12-50.806a44.8,44.8,0,0,0-12.183-3.965l21.2,24.567,6.986-8.1A50.243,50.243,0,0,0,79.724,92.547Zm-41,.914a50.914,50.914,0,0,0-14.8,12.283l15.362,17.225A27.682,27.682,0,0,1,55.665,113.1ZM13.305,63.968A88.616,88.616,0,0,0,0,76.577L15.109,94.1A65.255,65.255,0,0,1,28.841,82Zm79.751-8.612a74.415,74.415,0,0,0-57.228-3.578L53.968,72.813a54.189,54.189,0,0,1,6.158-.341c16.9,0,32.809,7.59,44.818,21.376L120,76.252A85.186,85.186,0,0,0,93.056,55.356ZM7.267,47.905l83.5,96.827,8.7-10.084-83.5-96.827Z" fill="#eb9486" />
        </g>
    </svg>

    <h1>نعتذر عن هذا الخطأ</h1>
    <p>حدث خطأ في الاتصال بالخادم يرجى التحقق من اتصالك بالانترنت و المحاولة مرة اخرى</p>
    <router-link tag="button" to="/">
        <span>العودة الى الرئيسية</span>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
        </svg>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
@import '../variables.scss';
.server-status {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: $primary;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: $secondary;
    text-align: center;

    & > svg {
        display: block;
        width: 100px;
        margin-bottom: 40px;
    }

    h1 {
        display: block;
        font-size: 20px;
        margin-bottom: 20px !important;
    }

    p {
        display: block;
        font-size: 13px;
        margin-bottom: 20px;
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
            color: $secondary;
        }

        svg {
            fill: $secondary;
            width: auto;
            margin-right: 10px;
        }
    }
}
</style>
